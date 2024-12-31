import User from "@/database/user.model";
import handleError from "@/lib/handlers/errors";
import { UserSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  try {
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
