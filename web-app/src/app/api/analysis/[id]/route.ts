import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@backend/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const analysis = await prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    if (analysis.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("GET /api/analysis/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const analysis = await prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    if (analysis.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.analysis.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/analysis/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
