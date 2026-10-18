import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id?: string;
    email?: string;
    username?: string;
}

export const getTokenData = (request: NextRequest): string => {
    try {
        const token =
            request.cookies.get("token")?.value ||
            request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
            "";

        if (!token) {
            throw new Error("Token not provided");
        }

        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            throw new Error("TOKEN_SECRET is not configured");
        }

        const decodedToken = jwt.verify(token, tokenSecret) as DecodedToken;
        const userId = decodedToken.id || decodedToken._id;

        if (!userId) {
            throw new Error("Invalid token: user ID missing");
        }

        return userId;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Failed to extract data from token");
    }
};

export const getDataFromToken = getTokenData;
export default getTokenData;