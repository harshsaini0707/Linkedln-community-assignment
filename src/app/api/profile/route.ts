import { User } from "../../../../models/User.model";
import { getUserFromToken } from "../../../../utils/getUserFromToken";



export async function GET(req:Request){
   try {
     const user = getUserFromToken(req);
    if(!user) return Response.json({
        message:"Unauthorized user!!"
    },{status:401});

    const userProfile = await User.findById({_id : user.userId}).select("-password");

    if(!userProfile) return Response.json({
        message:"No User Found!!!"
    },{status:404})

    return Response.json({
        data : userProfile
    },{status:200})
   } catch (error) {
    return Response.json({message:"Internal Server Error!!"} ,{status:500})
   }
}