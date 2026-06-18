import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@backend/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let userId = session?.user ? (session.user as any).id : null;

    if (!userId) {
      const demoUser = await prisma.user.upsert({
        where: { email: "demo@company.com" },
        update: {},
        create: { email: "demo@company.com", name: "Demo Executive" }
      });
      userId = demoUser.id;
    }

    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("GET /api/reports error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let userId = session?.user ? (session.user as any).id : null;

    if (!userId) {
      const demoUser = await prisma.user.upsert({
        where: { email: "demo@company.com" },
        update: {},
        create: { email: "demo@company.com", name: "Demo Executive" }
      });
      userId = demoUser.id;
    }

    const body = await req.json();
    const { title, summary, pdfUrl, csvUrl } = body;

    if (!title || !summary) {
      return NextResponse.json({ error: "Title and summary are required" }, { status: 400 });
    }

    const newReport = await prisma.report.create({
      data: {
        userId,
        title,
        summary,
        pdfUrl,
        csvUrl,
      }
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("POST /api/reports error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
