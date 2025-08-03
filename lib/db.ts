import mongoose from "mongoose";

let isConnected: boolean = false; 

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "");
    isConnected = true;
    
  } catch (error) {
    throw error;
  }
};
