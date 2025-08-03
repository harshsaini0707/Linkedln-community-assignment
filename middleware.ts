import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "./lib/db"; 

const protectedRoutes = ["/api/dashboard", "/api/profile", "/api/createPost"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ message: "DB Connection Failed" }, { status: 500 });
  }
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
  matcher: ["/api/feed", "/api/createPost/:path*", "/api/profile"],
};
