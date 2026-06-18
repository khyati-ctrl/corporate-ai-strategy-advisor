import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@backend/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : null;

    if (!userId) {
      return NextResponse.json([]);
    }

    const history = await prisma.chatHistory.createMany({
       data: []
    }).catch(() => {}); // Dummy to make typescript happy or we can just query

    const messages = await prisma.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /api/llm-chat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : null;

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || !lastMessage.content) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // Persist user message if authenticated
    if (userId) {
      await prisma.chatHistory.create({
        data: {
          userId,
          role: 'user',
          content: lastMessage.content
        }
      });
    }

    // Mock Business Strategy Response
    let aiResponse = "";
    if (!session) {
      aiResponse = "Welcome to the **Corporate AI Strategy Advisor**!\n\nSign in to access our full Enterprise AI Consultant with ROI analysis, forecasting, and strategy generation.";
    } else {
      aiResponse = "As your **Enterprise AI Consultant**, I recommend prioritizing high ROI use-cases like Automated Customer Support and Predictive Maintenance. Let me know if you want a detailed forecast for a specific sector.";
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Persist AI message if authenticated
    if (userId) {
      await prisma.chatHistory.create({
        data: {
          userId,
          role: 'assistant',
          content: aiResponse
        }
      });
    }

    // Return in OpenAI-like format so Vercel AI SDK or similar frontend can easily process if needed
    // or just return plain text/json
    return NextResponse.json({
      role: 'assistant',
      content: aiResponse
    });

  } catch (error) {
    console.error("POST /api/llm-chat error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
