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

    // History returns all analyses and possibly reports in the future
    const analyses = await prisma.analysis.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        companyName: true,
        industry: true,
        companySize: true,
        readinessScore: true,
        roiForecast: true,
        costReduction: true,
        maturityLevel: true,
        predictedBenefit: true,
        boardroomReport: true,
        createdAt: true,
      }
    });

    return NextResponse.json(analyses);
  } catch (error) {
    console.error("GET /api/history error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
