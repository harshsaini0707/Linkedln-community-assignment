import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import { User } from "../../../../../models/User.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    return  Response.json({message:"User not found!!" , status :  404});
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return Response.json(
    { message: "Invalid Credentials", status: 401 }
    );
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({message : "Login Successful" ,  status : 200})

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

