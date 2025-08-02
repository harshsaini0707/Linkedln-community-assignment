import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

const protectedRoute = ["/dashboard" , "/profile"]

export function middleware(request : NextRequest){

    const {pathname } = request.nextUrl;

    if(protectedRoute.some((route)=> pathname.startsWith(route))){
  
         const token = request.cookies.get("token")?.value;

      if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
     }
      
    try {
      
        jwt.verify(token , process.env.JWT_SECRET!);
        return NextResponse.next();
    } catch (error) {
       return NextResponse.redirect(new URL("/login" , request.url)) 
    }
       
    }
    return NextResponse.next()

}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
