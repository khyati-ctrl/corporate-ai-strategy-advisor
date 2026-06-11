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
    "Your current AI Readiness Score is 68.3 / 100. Strongest dimension: Strategic Alignment (80%). Weakest: Data Infrastructure (58%). Improving data pipelines alone could push your score above 74 within one quarter.",
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
    {
      role: "bot",
      text: "Hi — I'm your AI Strategy Assistant. Ask anything or pick a quick action below.",
    },
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
      setMessages((p) => [
        ...p,
        { role: "bot", text: BOT_RESPONSES[msg] ?? DEFAULT_REPLY },
      ]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {open && (
        <div
          style={{
            width: 368,
            background: "#080f1e",
            border: "1px solid #1e3a5f",
            borderRadius: 18,
            boxShadow: "0 12px 48px rgba(29,78,216,0.22)",
            display: "flex",
            flexDirection: "column",
            marginBottom: 14,
            animation: "chatUp 0.2s ease",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg,#1d4ed8 0%,#7c3aed 100%)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🤖
              </div>
              <div>
                <div
                  style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}
                >
                  AI Strategy Assistant
                </div>
                <div style={{ color: "#a5f3fc", fontSize: 11 }}>● Online</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "none",
                color: "#fff",
                width: 28,
                height: 28,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: 290,
              minHeight: 160,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "84%",
                    padding: "9px 13px",
                    borderRadius:
                      m.role === "user"
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg,#1d4ed8,#7c3aed)"
                        : "#111c30",
                    color: "#e2e8f0",
                    fontSize: 13,
                    lineHeight: 1.55,
                    border:
                      m.role === "bot" ? "1px solid #1e3a5f" : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "#111c30",
                    border: "1px solid #1e3a5f",
                    padding: "9px 13px",
                    borderRadius: "14px 14px 14px 4px",
                    color: "#64748b",
                    fontSize: 13,
                  }}
                >
                  <span style={{ animation: "blink 1.2s infinite" }}>●</span>{" "}
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick actions */}
          <div
            style={{
              padding: "8px 14px",
              borderTop: "1px solid #111c30",
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a}
                onClick={() => send(a)}
                style={{
                  background: "#111c30",
                  border: "1px solid #1e3a5f",
                  borderRadius: 20,
                  color: "#93c5fd",
                  fontSize: 11,
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px 14px 16px",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask your AI advisor…"
              style={{
                flex: 1,
                background: "#111c30",
                border: "1px solid #1e3a5f",
                borderRadius: 10,
                color: "#f1f5f9",
                padding: "9px 12px",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              onClick={() => send(input)}
              style={{
                background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                padding: "9px 16px",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
          border: "none",
          boxShadow: "0 4px 24px rgba(99,102,241,0.55)",
          cursor: "pointer",
          fontSize: open ? 22 : 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.18s",
          color: "#fff",
          fontWeight: 700,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
        }
      >
        {open ? "✕" : "🤖"}
      </button>

      <style>{`
        @keyframes chatUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.2; }
        }
      `}</style>
    </div>
  );
}
