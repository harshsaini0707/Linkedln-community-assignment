import { connectDB } from "../../../../../lib/db";
import { sendOTPEmail } from "../../../../../utils/mailer";
import { Otp } from "../../../../../models/otp.model";
import { withCORS } from "../../../../../lib/with-cors"; 
import { NextResponse } from "next/server";

async function handler(req: Request) {
  try {
    const { name, email, password, biodata } = await req.json();

    await connectDB();

    const otp = Math.floor(10000 + Math.random() * 90000).toString();

    await Otp.findOneAndUpdate(
      { email },
      {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        userData: { name, email, password, biodata },
      },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email, otp);

    return NextResponse.json({ message: "Verify OTP!!" });
  } catch (error) {
    console.error("Register OTP error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export const POST = withCORS(handler);


export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
