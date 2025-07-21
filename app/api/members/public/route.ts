import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";

    const query: any = {};
    if (search) query.fullName = { $regex: search, $options: "i" };
    if (department) query.department = department;

    const total = await Member.countDocuments(query);

    const members = await Member.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const publicMembers = members.map((member) => {
      const date = new Date(member.dateOfBirth);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      };
      const dayMonth = date.toLocaleDateString("en-US", options);

      return {
        idNumber: member.idNumber,
        fullName: member.fullName,
        department: member.department,
        interests: member.interests,
        hobbies: member.hobbies,
        bestEngineeringQuote: member.bestEngineeringQuote,
        dayMonth,
      };
    });

    const pages = Math.ceil(total / limit);
    const pagination = {
      page,
      limit,
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
    };

    return NextResponse.json({ members: publicMembers, pagination });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
