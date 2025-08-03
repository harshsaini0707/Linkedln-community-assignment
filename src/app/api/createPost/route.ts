import { connectDB } from "../../../../lib/db";
import { Post } from "../../../../models/Post.model";
import { getUserFromToken } from "../../../../utils/getUserFromToken";
import { NextResponse } from "next/server";
import { withCORS } from "../../../../lib/with-cors";

async function handler(req: Request) {
  try {
    const { content } = await req.json();

    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!content || content.trim().length === 0)
      return NextResponse.json({ message: "Post can't be empty" }, { status: 400 });

    await connectDB();

    const newPost = new Post({
      content,
      author: user.userId,
    });

    await newPost.save();

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export const POST = withCORS(handler);


export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
