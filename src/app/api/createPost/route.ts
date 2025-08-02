import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/db";
import { Post } from "../../../../models/Post.model";
import { getUserFromToken } from "../../../../utils/getUserFromToken";
import { NextResponse } from "next/server";


 
 export async function POST(req:Request){

    const {content} =  await req.json();

   const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if(!content || content.trim().length === 0) return Response.json({
        message:"Post Can't be Empty"
    , status :404})

    await connectDB();

    const newPost = new Post({
        content:content,
        author:user.userId
    })  
    await newPost.save();

    return Response.json({
        message:"Post Created Successfully",
        post: newPost,
    }, { status :  201})
 }