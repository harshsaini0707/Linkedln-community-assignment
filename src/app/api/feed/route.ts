import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Post } from "../../../../models/Post.model";
import { getUserFromToken } from "../../../../utils/getUserFromToken";
import { withCORS } from "../../../../lib/with-cors";


async function handler(req: Request) {
  try {
    const user = getUserFromToken(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const allPosts = await Post.find({})
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ allPosts }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the feed." },
      { status: 500 }
    );
  }
}

export const GET = withCORS(handler);
export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
