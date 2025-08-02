import { otpStore } from "../../../utils/otpStore";
import { sendOTPEmail } from "../../../utils/mailer";

export async function POST(req :  Request) {
    const {name , email , password , biodata} = await req.json();

    const otp = Math.floor(10000 + Math.random() * 90000).toString();

     otpStore.set(email, {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
    userData: { name, email, password, biodata },
  });

   await sendOTPEmail(email, otp);

   return Response.json({ message: "Verify Otp!!" });

}