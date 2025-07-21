import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const members = await Member.find().lean();

    const data = members.map((member, index) => ({
      "S/N": index + 1,
      IDNumber: member.idNumber,
      FullName: member.fullName,
      PhoneNumber: member.phoneNumber,
      Email: member.email,
      Department: member.department,
      DateOfBirth: member.dateOfBirth,
      StateOfOrigin: member.stateOfOrigin,
      Interests: member.interests,
      Hobbies: member.hobbies,
      BestEngineeringQuote: member.bestEngineeringQuote,
      SubmittedAt: member.submittedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const range = XLSX.utils.decode_range(worksheet["!ref"]!);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[cellAddress]) continue;

      worksheet[cellAddress].s = {
        font: { bold: true },
      };
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const fileName = `concess members list - ${formattedDate}.xlsx`;

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
      cellStyles: true,
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (err) {
    console.error("Error exporting members:", err);
    return NextResponse.json(
      { error: "Failed to export members" },
      { status: 500 }
    );
  }
}
