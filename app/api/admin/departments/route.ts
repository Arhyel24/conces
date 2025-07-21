import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const departments: string[] = await Member.distinct("department");

    return NextResponse.json(departments);
  } catch (err) {
    console.error("Failed to fetch departments:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
