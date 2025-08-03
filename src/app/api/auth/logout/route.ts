import { NextResponse } from "next/server";
import { withCORS } from "../../../../../lib/with-cors";

async function handler() {
  const response = NextResponse.json({ message: "Logout Successful" });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}


export const POST = withCORS(handler);

export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
