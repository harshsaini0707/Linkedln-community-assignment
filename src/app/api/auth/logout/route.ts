import { NextResponse } from "next/server";
import { withCORS } from "../../../../../lib/with-cors";

export const POST = withCORS(async function POST() {
  const response = NextResponse.json({ message: "Logout Successful" });
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
});
