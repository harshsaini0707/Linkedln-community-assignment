import { connectDB } from "../../../../lib/db";
import { Post } from "../../../../models/Post.model";

export async function GET() {
  await connectDB();

  const allPosts = await Post.find({})
    .populate("author", "name")
    .sort({ createdAt: -1 });

  return Response.json(allPosts);
}
