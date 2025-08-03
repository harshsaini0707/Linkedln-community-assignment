import { NextResponse } from "next/server";

const allowedOrigins = [
  "https://linkedln-community-assignment.vercel.app",
  "https://linkedln-community-assignment-1r80cg9zl-harsh-sainis-projects.vercel.app"
];

export function withCORS(handler: (req: Request) => Promise<NextResponse>) {
  return async (req: Request) => {
    const origin = req.headers.get("origin") || "";

    if (req.method === "OPTIONS") {
      const res = new NextResponse(null, { status: 204 });
      applyCORSHeaders(res, origin);
      return res;
    }

    const response = await handler(req);
    applyCORSHeaders(response, origin);
    return response;
  };
}

function applyCORSHeaders(res: NextResponse, origin: string) {
  if (allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Vary", "Origin");
}
