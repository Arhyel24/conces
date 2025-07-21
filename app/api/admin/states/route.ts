import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const states: string[] = await Member.distinct("stateOfOrigin");

    return NextResponse.json(states);
  } catch (err) {
    console.error("Failed to fetch states of origin:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
