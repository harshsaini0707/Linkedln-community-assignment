import { User } from "../../../../models/User.model";
import { getUserFromToken } from "../../../../utils/getUserFromToken";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = getUserFromToken(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized user!!" }, { status: 401 });
    }

    const userProfile = await User.findById({ _id: user.userId }).select("-password");

    if (!userProfile) {
      return NextResponse.json({ message: "No User Found!!!" }, { status: 404 });
    }

    return NextResponse.json({ data: userProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error!!" }, { status: 500 });
  }
}

