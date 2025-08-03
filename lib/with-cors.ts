import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://linkedln-community-assignment-1r80cg9zl-harsh-sainis-projects.vercel.app",
  "https://linkedln-community-assignment.vercel.app",
];

export function withCORS(handler: (req: Request) => Promise<NextResponse>) {
  return async (req: Request) => {
    const origin = req.headers.get("origin") || "";

    if (req.method === "OPTIONS") {
      const res = new NextResponse(null, { status: 204 });
      addCORSHeaders(res, origin); 
      return res;
    }

 
    const response = await handler(req);
    addCORSHeaders(response, origin);
    return response;
  };
}

function addCORSHeaders(response: NextResponse, origin: string) {
  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
