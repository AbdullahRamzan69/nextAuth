import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id?: string;
    _id?: string;
    email?: string;
    username?: string;
}

function cleanTokenString(raw: string | null | undefined): string {
    if (!raw) return "";
    let str = raw.trim();
    // Remove Bearer prefix if present
    str = str.replace(/^Bearer\s+/i, "").trim();
    // Remove surrounding single or double quotes
    str = str.replace(/^["']|["']$/g, "").trim();
    return str;
}

export const getTokenData = (request: NextRequest): string => {
    try {
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            throw new Error("TOKEN_SECRET is not configured");
        }

        // Collect candidate tokens in order of priority:
        // 1. Explicit Authorization header (e.g. Bearer token from Postman)
        // 2. Custom token header
        // 3. Custom x-auth-token header
        // 4. NextRequest cookies
        // 5. Raw cookie header
        const rawCandidates = [
            request.headers.get("authorization"),
            request.headers.get("token"),
            request.headers.get("x-auth-token"),
            request.cookies.get("token")?.value,
        ];

        const rawCookie = request.headers.get("cookie");
        if (rawCookie) {
            const match = rawCookie.match(/(?:^|;\s*)token=([^;]+)/);
            if (match) {
                try {
                    rawCandidates.push(decodeURIComponent(match[1]));
                } catch {
                    rawCandidates.push(match[1]);
                }
            }
        }

        const candidates = rawCandidates
            .map(cleanTokenString)
            .filter((c): c is string => Boolean(c));

        if (candidates.length === 0) {
            throw new Error("Token not provided. Please log in or provide an Authorization Bearer token.");
        }

        // Check if any candidate is an unresolved Postman variable or placeholder
        const hasUnresolvedVar = candidates.some(
            (c) => c.startsWith("{{") && c.endsWith("}}")
        );
        const hasUndefinedString = candidates.some(
            (c) => c === "undefined" || c === "null"
        );

        let lastError: Error | null = null;

        for (const token of candidates) {
            if (token.startsWith("{{") || token === "undefined" || token === "null") {
                continue;
            }
            try {
                const decodedToken = jwt.verify(token, tokenSecret) as DecodedToken;
                const userId = decodedToken.id || decodedToken._id;
                if (!userId) {
                    throw new Error("Invalid token: user ID missing");
                }
                return userId;
            } catch (err) {
                if (err instanceof Error) {
                    lastError = err;
                }
            }
        }

        // If we reach here, none of the candidates verified
        if (hasUnresolvedVar) {
            throw new Error("Unresolved Postman variable: {{token}} has no value. Please log in first or paste the actual JWT token string.");
        }
        if (hasUndefinedString) {
            throw new Error("Token received was 'undefined'. Make sure you copy the token value from the login response.");
        }
        if (lastError) {
            if (lastError.message === "jwt malformed") {
                throw new Error("JWT token is malformed. Make sure you copy the entire token (3 dot-separated parts) without quotes or extra characters.");
            }
            throw lastError;
        }

        throw new Error("Invalid or unverified token.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Failed to extract data from token");
    }
};

export const getDataFromToken = getTokenData;
export default getTokenData;