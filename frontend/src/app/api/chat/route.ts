import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const PUBLIC_SYSTEM_PROMPT = `You are the Corporate AI Strategy Advisor Public Assistant. 
Your role is to function as a Product Guide, Platform Educator, Onboarding Assistant, and Lead Conversion Tool.
You MUST NOT perform industry analysis, ROI calculations, forecasting, report generation, dataset querying, risk assessments, or AI strategy generation.
If a user asks a question that requires these advanced capabilities (e.g. ROI_ANALYSIS, FORECASTING, STRATEGY, INDUSTRY_COMPARISON, REPORT_GENERATION, DATA_ANALYSIS), you MUST reply EXACTLY with this keyword: "RESTRICTED_ACCESS_REQUIRED".
Do NOT include any other text in your response if you use that keyword.
If the query is allowed (platform info, navigation, general AI education), answer concisely and professionally in a marketing-oriented tone.`;

const AUTHENTICATED_SYSTEM_PROMPT = `You are the Corporate AI Strategy Advisor Enterprise AI Consultant.
Your role is to act as a Strategy Advisor, Business Intelligence Assistant, and AI Transformation Expert.
You CAN perform AI strategy generation, industry analysis, ROI calculations, forecasting, and risk assessments.
Assume you have access to the Corporate AI Adoption and ROI Dataset (2015-2035). 
Provide detailed, professional, and data-driven insights. Use markdown, tables, and bullet points where appropriate.`;

function getMockText(session: unknown, lastMessage: string): string {
  const lower = lastMessage.toLowerCase();
  if (
    !session &&
    (lower.includes("roi") ||
      lower.includes("strategy") ||
      lower.includes("forecast") ||
      lower.includes("compare") ||
      lower.includes("analysis"))
  ) {
    return "RESTRICTED_ACCESS_REQUIRED";
  }
  if (session) {
    return "As your **Enterprise AI Consultant**, here is sample data:\n\n| Industry | Adoption Rate | ROI |\n|---|---|---|\n| Healthcare | 45% | 2.1x |\n| Finance | 68% | 3.5x |\n| Retail | 52% | 2.8x |\n\n*Source: Corporate AI Adoption Dataset (2015–2035).*";
  }
  return "Welcome to the **Corporate AI Strategy Advisor**!\n\nI'm your Product Guide and I can help you:\n- 🔍 Learn about our AI platform features\n- 📈 Understand AI adoption benefits\n- 🗺️ Navigate to the right tools for your needs\n\nSign in to access our full Enterprise AI Consultant with ROI analysis, forecasting, and strategy generation.\n\nWhat would you like to know?";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const session = await getServerSession(authOptions);
    const systemPrompt = session ? AUTHENTICATED_SYSTEM_PROMPT : PUBLIC_SYSTEM_PROMPT;

    // If no OpenAI key, stream a mock response using the Vercel AI SDK data-stream wire protocol
    if (!process.env.OPENAI_API_KEY) {
      const lastMessage = (messages[messages.length - 1]?.content as string) ?? "";
      const mockText = getMockText(session, lastMessage);
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          // Vercel AI SDK data-stream protocol (v1):
          //   text delta  → 0:"<JSON-encoded token>"\n
          //   finish      → d:{finishReason:"stop", usage:{...}}\n
          for (const char of mockText) {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(char)}\n`));
            await new Promise((r) => setTimeout(r, 8));
          }
          controller.enqueue(
            encoder.encode(
              `d:${JSON.stringify({
                finishReason: "stop",
                usage: { promptTokens: 10, completionTokens: mockText.length },
              })}\n`
            )
          );
          controller.close();
        },
      });

      return new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Vercel-AI-Data-Stream": "v1",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }

    // Real OpenAI path
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
