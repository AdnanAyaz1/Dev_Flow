import User from "@/database/user.model";
import handleError from "@/lib/handlers/errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    await dbConnect();
    UserSchema.partial().parse({ email });
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
