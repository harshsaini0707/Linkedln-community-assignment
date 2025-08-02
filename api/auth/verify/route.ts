import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db";
import { otpStore } from "../../../utils/otpStore";
import { User } from "../../../models/User.model";
import { NextResponse } from "next/server";



export async function POST(req:Request){

    const {email ,  otp } = await req.json();
    const record  =  otpStore.get(email);

    if(!record) return new NextResponse("OTP not found" , {status:400});
    if (Date.now() > record.expires) return new NextResponse("OTP expired", { status: 400 });
    if(record?.otp != otp) return new NextResponse("Invalid OTP" , {status:401});

    await connectDB();

    const hashedPassword = await bcrypt.hash(record.userData.password,10);

    const emailExists = await User.findOne({email});

    if(emailExists) return new NextResponse("User Already Exists!!",{status:400});

    const newUser = new User({
        name: record.userData.name,
        password: hashedPassword,
        biodata :  record.userData.biodata || "",
        email: email,
        isVerified : true

    })

    await newUser.save();
    otpStore.delete(email)
    return  NextResponse.json({
        message :"User registered Successfully!!" , status : 201
    })

}