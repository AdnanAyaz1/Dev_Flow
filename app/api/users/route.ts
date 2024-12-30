import { NextResponse } from "next/server";

import User from "@/database/user.model";

import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import handleError from "@/lib/handlers/errors";
import { UserSchema } from "@/lib/validation";

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

    const validatedData = UserSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
      // [
      //   {"name":["Name is required"]},
      //   {"username":["Username must be at least 3 characters long."]},
      //   {"email":["Email is required"]},
      //   {"password":["Password must be at least 6 characters long."]}
      // ]
    }

    const { email, username } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username already exists");

    const newUser = await User.create(validatedData.data);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
