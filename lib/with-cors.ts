import { NextResponse } from "next/server";

export function withCORS(handler: (req: Request) => Promise<NextResponse>) {
  return async (req: Request) => {
    if (req.method === "OPTIONS") {
      const res = new NextResponse(null, { status: 204 });
      addCORSHeaders(res);
      return res;
    }

    const response = await handler(req);
    addCORSHeaders(response);
    return response;
  };
}

function addCORSHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "https://linkedln-community-assignment.vercel.app");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
}
