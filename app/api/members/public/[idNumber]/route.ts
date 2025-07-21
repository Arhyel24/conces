import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { Member as IMember } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ idNumber: string }> }
) {
  await connectDB();

  const { idNumber } = await context.params;

  const member = await Member.findOne({ idNumber }).lean<IMember>();

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const date = new Date(member.dateOfBirth);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const dayMonth = date.toLocaleDateString("en-US", options);

  const publicMember = {
    idNumber: member.idNumber,
    fullName: member.fullName,
    department: member.department,
    interests: member.interests,
    hobbies: member.hobbies,
    stateOfOrigin: member.stateOfOrigin,
    bestEngineeringQuote: member.bestEngineeringQuote,
    dayMonth,
  };

  return NextResponse.json(publicMember);
}
