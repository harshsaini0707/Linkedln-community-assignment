import { NextResponse } from "next/server";


async function POST() {
  const response = NextResponse.json({ message: "Logout Successful" });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}

