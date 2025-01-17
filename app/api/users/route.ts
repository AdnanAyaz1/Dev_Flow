import { NextResponse } from "next/server";

import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import handleError from "@/lib/handlers/errors";
import { UserSchema } from "@/lib/validation";
import User from "@/database/user.model";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create User
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = UserSchema.parse(body);

    const { email, username } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ForbiddenError("User already exists");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new ForbiddenError("Username already exists");

    const newUser = await User.create(validatedData);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
