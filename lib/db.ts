import mongoose  from "mongoose";

let isConnected = false;
export  const connectDB = async() =>{
     if (isConnected) return;
try {
     const db = await  mongoose.connect(process.env.MONGO_URL || " ");
} catch (error) {
    console.log('DataBAse Conenction Error!!');
    
    throw  error;
     
}
}