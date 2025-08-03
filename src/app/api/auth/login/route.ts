import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import { User } from "../../../../../models/User.model";
import jwt from "jsonwebtoken";
import { withCORS } from "../../../../../lib/with-cors";
import { NextResponse } from "next/server";

export async function handler(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    return new NextResponse(
      JSON.stringify({ message: "User not Found!!", status: 404 }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid Credentials", status: 401 }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  const response = new NextResponse(
    JSON.stringify({ message: "Login successful", status: 200 }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export const POST = withCORS(handler);
export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
