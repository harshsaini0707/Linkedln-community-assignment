import { getUserFromToken } from "../../../../utils/getUserFromToken";
import { NextResponse } from "next/server";
import { Post } from "../../../../models/Post.model";
import { connectDB } from "../../../../lib/db";
import { withCORS } from "../../../../lib/with-cors";

async function handler(req: Request) {
  try {
    const user = getUserFromToken(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized User!!" }, { status: 401 });
    }

    await connectDB();

    const userFeed = await Post.find({ author: user.userId }).sort({ createdAt: -1 });

    if (userFeed.length === 0) {
      return NextResponse.json({ message: "No posts yet." }, { status: 404 });
    }

    return NextResponse.json({ userPost: userFeed }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error!!" }, { status: 500 });
  }
}

export const GET = withCORS(handler);
export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
