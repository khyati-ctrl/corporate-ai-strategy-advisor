import type { Metadata } from "next";
import ChatBot from "@frontend/components/ChatBot";
import { Providers } from "@frontend/components/Providers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@frontend/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Corporate AI Strategy Advisor | Predict AI ROI & Adoption Strategy",
  description:
    "Data-driven AI strategy insights for modern enterprises. Predict ROI, assess AI readiness, and receive tailored adoption recommendations powered by machine learning.",
  keywords: "AI strategy, ROI prediction, AI readiness assessment, corporate AI, machine learning, business intelligence",
  openGraph: {
    title: "Corporate AI Strategy Advisor",
    description: "Predict your AI investment ROI before you commit. ML-powered insights for enterprise AI adoption.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Barlow:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
