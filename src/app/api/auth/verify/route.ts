// app/api/auth/verify/route.ts

import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import { User } from "../../../../../models/User.model";
import { Otp } from "../../../../../models/otp.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { withCORS } from "../../../../../lib/with-cors";
async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    await connectDB();

    const otpEntry = await Otp.findOne({ email });

    if (!otpEntry) return NextResponse.json({ message: "OTP not found" }, { status: 400 });
    if (otpEntry.otp !== otp) return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });

    if (new Date() > otpEntry.expiresAt) {
      await Otp.deleteOne({ email });
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) return NextResponse.json({ message: "User Already Exists!" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(otpEntry.userData.password, 10);

    const newUser = new User({
      name: otpEntry.userData.name,
      email,
      password: hashedPassword,
      biodata: otpEntry.userData.biodata || "",
      isVerified: true,
    });

    await newUser.save();
    await Otp.deleteOne({ email });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    const response = NextResponse.json({
      message: "User registered successfully!",
      status: 201,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 2 * 24 * 60 * 60, 
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export default withCORS(POST);
