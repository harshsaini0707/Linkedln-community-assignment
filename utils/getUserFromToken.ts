import jwt from "jsonwebtoken";
import { parse } from "cookie";

export function getUserFromToken(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const parsed = parse(cookieHeader);
  const token = parsed.token;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: string };
  } catch (err) {
    return null;
  }
}
