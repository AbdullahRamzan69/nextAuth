import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  // If user is already authenticated and visits login or signup, redirect to profile
  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // If user is unauthenticated and visits protected profile routes, redirect to login
  if (path.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};
