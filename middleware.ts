// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const protectedRoutes = [
  "/api/dashboard",
  "/api/profile",
  "/api/createPost",
  "/api/editProfile",
  "/api/feed",
  "/api/userPost",

];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/dashboard",
    "/api/profile",
    "/api/createPost/:path*",
    "/api/editProfile",
    "/api/feed",
    "/api/userPost",
  ],
};
