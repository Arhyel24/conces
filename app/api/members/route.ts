import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const requiredFields = [
      "idNumber",
      "fullName",
      "phoneNumber",
      "email",
      "department",
      "dateOfBirth",
      "stateOfOrigin",
      "interests",
      "hobbies",
      "bestEngineeringQuote",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const member = await Member.create({ ...data, submittedAt: new Date() });

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (err) {
    console.error("Error creating member:", err);
    return NextResponse.json(
      { error: "Failed to create member", details: err },
      { status: 500 }
    );
  }
}
