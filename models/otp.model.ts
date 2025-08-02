import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  userData: {
    name: String,
    email: String,
    password: String,
    biodata: String,
  },
});

export const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);
