import { RequestError } from "@/lib/http-errors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    throw new RequestError(400, "Invalid input", {
      email: ["Email is required"],
    });
  } catch (error) {
    return NextResponse.json({ msg: "api failed", error: error });
  }
}
