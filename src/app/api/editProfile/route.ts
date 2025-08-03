import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User.model";
import { getUserFromToken } from "../../../../utils/getUserFromToken";
import { withCORS } from "../../../../lib/with-cors";


async function handler(req: Request) {
  try {
    const user = getUserFromToken(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized user!" }, { status: 401 });
    }

    const { name, biodata } = await req.json();

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      { name, biodata },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export const PUT = withCORS(handler);
export const OPTIONS = withCORS(async () => new NextResponse(null, { status: 204 }));
