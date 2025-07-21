import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const state = searchParams.get("state") || "";

    const query: any = {};
    if (search) query.fullName = { $regex: search, $options: "i" };
    if (department) query.department = department;
    if (state) query.stateOfOrigin = state;

    const total = await Member.countDocuments(query);

    const members = await Member.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const pages = Math.ceil(total / limit);
    const pagination = {
      page,
      limit,
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
    };

    return NextResponse.json({ members, pagination });
  } catch (err) {
    console.error("Failed to fetch members:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
