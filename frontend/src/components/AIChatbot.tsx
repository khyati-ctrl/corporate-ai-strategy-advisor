"use client";
import { useState, useRef, useEffect } from "react";

const QUICK_ACTIONS = [
  "My AI readiness score?",
  "Show funding insights",
  "Top AI trends Q2 2026",
  "How to improve my ROI?",
];

const BOT_RESPONSES: Record<string, string> = {
  "My AI readiness score?":
    "Your current AI Readiness Score is 68.3 / 100. Strongest dimension: Leadership (80%). Weakest: Change Management (55%). Improving change management alone could push your score above 74 within one quarter.",
  "Show funding insights":
    "Global AI funding hit $42B in Q1 2026 — up 38% YoY. Top verticals: Healthcare AI ($9.2B), Enterprise SaaS ($7.8B), Autonomous Systems ($6.1B). Your sector (Healthcare) is in a peak funding cycle right now.",
  "Top AI trends Q2 2026":
    "Leading trends this quarter: (1) Agentic AI deployments +210% adoption, (2) On-device inference at enterprise scale, (3) AI-driven supply-chain optimisation, (4) Multimodal models in customer service. Want a deep-dive on any of these?",
  "How to improve my ROI?":
    "To lift your predicted ROI from 142.5% toward 185%+: automate 3 high-volume workflows (+18% ROI est.), upskill 40% of your data team, and integrate AI into your CRM pipeline. I can generate a prioritised roadmap if you'd like.",
};

const DEFAULT_REPLY =
  "Great question! Based on your corporate profile I'd recommend focusing on data readiness and phased AI adoption. Want me to draft a detailed action plan?";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi — I'm your AI Strategy Assistant. Ask anything or pick a quick action below." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const msg = text.trim();
    if (!msg) return;
    setMessages((p) => [...p, { role: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((p) => [...p, { role: "bot", text: BOT_RESPONSES[msg] ?? DEFAULT_REPLY }]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      {open && (
        <div style={{
          width: 368,
          background: "#fff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 12px 48px rgba(26,58,92,0.18)",
          display: "flex",
          flexDirection: "column",
          marginBottom: 14,
          animation: "chatUp 0.2s ease",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #1a3a5c, #2d5a8a)",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36,
                background: "rgba(200,169,110,0.25)",
                border: "1px solid rgba(200,169,110,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>
                🤖
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase" }}>AI Strategy Assistant</div>
                <div style={{ color: "#c8a96e", fontSize: 11, fontWeight: 600 }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
              width: 28, height: 28, cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            overflowY: "auto", padding: "14px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            maxHeight: 280, minHeight: 140,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "84%",
                  padding: "9px 13px",
                  background: m.role === "user" ? "linear-gradient(135deg,#1a3a5c,#2d5a8a)" : "#f9fafb",
                  color: m.role === "user" ? "#fff" : "#374151",
                  fontSize: 13,
                  lineHeight: 1.55,
                  border: m.role === "bot" ? "1px solid #e5e7eb" : "none",
                  fontWeight: m.role === "user" ? 600 : 400,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", padding: "9px 13px", color: "#9ca3af", fontSize: 13 }}>
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick actions */}
          <div style={{ padding: "8px 14px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {QUICK_ACTIONS.map((a) => (
              <button key={a} onClick={() => send(a)} style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                color: "#1a3a5c",
                fontSize: 11, fontWeight: 700,
                padding: "4px 10px",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}>{a}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "10px 14px 16px", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask your AI advisor…"
              style={{
                flex: 1, background: "#f9fafb",
                border: "1px solid #e5e7eb",
                color: "#111827", padding: "9px 12px",
                fontSize: 13, outline: "none",
              }}
            />
            <button onClick={() => send(input)} style={{
              background: "linear-gradient(135deg,#1a3a5c,#2d5a8a)",
              border: "none", color: "#fff",
              padding: "9px 16px", cursor: "pointer",
              fontSize: 15, fontWeight: 700,
            }}>➤</button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 56, height: 56,
          background: "linear-gradient(135deg,#1a3a5c,#2d5a8a)",
          border: "2px solid #c8a96e",
          boxShadow: "0 4px 20px rgba(26,58,92,0.35)",
          cursor: "pointer",
          fontSize: open ? 20 : 24,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700,
          transition: "transform 0.18s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
      >
        {open ? "✕" : "🤖"}
      </button>

      <style>{`
        @keyframes chatUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
