import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `"MiniLinkedIn" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
  });
};
