import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== "iamanadmin") {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "1d" });

  return NextResponse.json({ token, user: { role: "admin" } });
}
