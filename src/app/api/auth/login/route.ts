import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../lib/db";
import { User } from "../../../../../models/User.model";
import jwt from "jsonwebtoken";
import { withCORS } from "../../../../../lib/with-cors";
import { NextResponse } from "next/server";

export async function handler(req: Request) {
  const {email , password } = await req.json();
  
  await connectDB();

  const user = await User.findOne({email});

  if(!user || !user.isVerified) return NextResponse.json({message:"User not Found!!" , status : 404});

  const matchPassword = await bcrypt.compare(password,user.password);
  if(!matchPassword) return NextResponse.json({
    message:"Invalid Credentials",
    status :  401
  })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

 if (!token) {
    return NextResponse.json(
      { message: "Failed to create token" },
      { status: 500 }
    );
  }

const response = NextResponse.json(
  { message: "Login successful", status: 200 }, 
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