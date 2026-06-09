"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  TrendingUp, Clock, Gauge, Award, Plus, Download,
  BarChart3, FileText, Sparkles, AlertTriangle, Lightbulb,
  CheckCircle2, Layers, ArrowRight, ChevronDown
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockResult = {
  analysis_id: "demo-001",
  industry: "Healthcare",
  company_size: "Enterprise",
  country: "United States",
  use_case: "Predictive Analytics",
  readiness_score_total: 68.3,
  readiness_tier: "Developing",
  roi_prediction: {
    roi_predicted_pct: 142.5,
    confidence_pct: 78.2,
    roi_min: 96.9,
    roi_max: 186.7,
    payback_period_months: 14,
    success_probability: 0.73,
  },
  scenarios: { conservative: 96.9, moderate: 142.5, aggressive: 186.7 },
  shap_features: [
    { feature: "Data Infrastructure", importance: 31 },
    { feature: "Industry Sector", importance: 24 },
    { feature: "Investment Budget", importance: 18 },
    { feature: "Talent Readiness", importance: 14 },
    { feature: "Timeline Length", importance: 8 },
    { feature: "Leadership Alignment", importance: 5 },
  ],
  readiness_breakdown: [
    { dimension: "Data Integration", score: 7.5 },
    { dimension: "Talent Depth", score: 6.0 },
    { dimension: "Leadership Buy-In", score: 8.0 },
    { dimension: "Tech Stack Maturity", score: 7.0 },
    { dimension: "Change Management", score: 5.5 },
    { dimension: "Data Quality Focus", score: 7.0 },
  ],
  recommendations: [
    { rank: 1, title: "Strengthen Data Pipelines", rationale: "Structured ETL pipelines represent the highest-impact factor for long-term ROI success.", difficulty: "Medium", timeline: "3-6 months", resources: ["Data Engineer (1-2)", "Cloud Budget ~$50K"] },
    { rank: 2, title: "Upskill Core AI/ML Teams", rationale: "Closing internal training gaps reduces deployment friction by ~34% in healthcare.", difficulty: "High", timeline: "6-12 months", resources: ["ML Engineer hire (2)", "Training budget ~$30K"] },
    { rank: 3, title: "Deploy Small Pilot Trial", rationale: "Phased deployment establishes team familiarity and builds executive alignment.", difficulty: "Low", timeline: "2-3 months", resources: ["1 Data Scientist", "$20K pilot budget"] },
    { rank: 4, title: "Outline Formal AI Governance", rationale: "Establishes standard security protocols and ensures HIPAA regulatory compliance.", difficulty: "Medium", timeline: "3-4 months", resources: ["Compliance Officer", "Policy Templates"] },
    { rank: 5, title: "Adopt Modern MLOps Tooling", rationale: "Reduces model drift management and continuous calibration costs in production.", difficulty: "High", timeline: "4-6 months", resources: ["MLOps Architect", "$15K platform cost"] },
  ],
  insights: {
    executive_summary: "Based on your Healthcare Enterprise profile with a readiness score of 68.3/100, your organization is well-positioned to achieve an estimated 142.5% ROI from AI adoption over the next 14 months. Your strongest assets are leadership alignment and technology infrastructure, while data integration and change management represent the primary acceleration opportunities.",
    key_findings: [
      "Your AI readiness score of 68.3/100 places you in the Developing tier — approaching readiness for scaled AI adoption.",
      "The predicted 142.5% ROI is above the industry benchmark of ~120% for comparable healthcare organizations.",
      "Data infrastructure investment will have the single highest impact on actual ROI realization.",
      "A phased adoption approach (Pilot → Scale → Optimize) is recommended given current readiness levels.",
    ],
    risk_factors: [
      "Data quality gaps may extend the breakeven timeline by 2-4 months if not addressed early.",
      "Talent scarcity in AI/ML roles requires proactive hiring in healthcare.",
      "Regulatory considerations (HIPAA, FDA AI guidance) may require additional compliance investment.",
    ],
    opportunities: [
      "Quick-win automation opportunities in clinical workflows could deliver ROI within 60 days.",
      "Industry peers are at a similar adoption stage — first-mover advantage available in next 18 months.",
      "Cloud AI services can reduce infrastructure costs by 40-60% vs. on-premises deployment.",
    ],
  },
};

// ─── ROI Gauge ─────────────────────────────────────────────────────────────────
function ROIGauge({ value, min, max, confidence }: { value: number; min: number; max: number; confidence: number }) {
  const angle = Math.min((value / 300) * 180, 180);
  const needleX = 100 + 70 * Math.cos((Math.PI * (180 - angle)) / 180);
  const needleY = 80 - 70 * Math.sin((Math.PI * (180 - angle)) / 180);

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" }}>
      <div style={{ position: "relative", width: "280px", height: "155px" }}>
        <svg viewBox="0 0 200 110" style={{ width: "100%", height: "100%" }}>
          <path d="M 20 80 A 80 80 0 0 1 180 80" fill="none" stroke="#f3f4f6" strokeWidth={14} strokeLinecap="round" />
          <path d="M 120 28 A 80 80 0 0 1 180 80" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth={14} strokeLinecap="round" />
          <path d={`M 20 80 A 80 80 0 0 1 ${needleX} ${needleY}`} fill="none" stroke="url(#gaugeGradCorp)" strokeWidth={14} strokeLinecap="round" />
          <defs>
            <linearGradient id="gaugeGradCorp" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a3a5c" />
              <stop offset="60%" stopColor="#2d5a8a" />
              <stop offset="100%" stopColor="#c8a96e" />
            </linearGradient>
          </defs>
          <line x1="100" y1="80" x2={needleX} y2={needleY} stroke="#1a3a5c" strokeWidth={3} strokeLinecap="round" />
          <circle cx="100" cy="80" r="6" fill="#1a3a5c" />
          <circle cx="100" cy="80" r="3" fill="#ffffff" />
          <text x="100" y="70" textAnchor="middle" fill="#111827" fontSize="26" fontWeight="900">{value}%</text>
          <text x="100" y="90" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="700" letterSpacing="0.1em">PREDICTED ROI</text>
        </svg>
      </div>
      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#6b7280", marginTop: "0.5rem" }}>
        Confidence: <span style={{ color: "#1a3a5c", fontWeight: 800 }}>{confidence}%</span>&nbsp;•&nbsp;
        Range: <span style={{ color: "#111827", fontWeight: 800 }}>{min}% – {max}%</span>
      </div>
    </div>
  );
}

// ─── Difficulty Badge ──────────────────────────────────────────────────────────
function DifficultyBadge({ level }: { level: string }) {
  const styles: Record<string, { color: string; bg: string; border: string }> = {
    Low: { color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
    Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
    High: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
  };
  const s = styles[level] || styles.Medium;
  return (
    <span style={{
      padding: "0.35rem 0.8rem", fontSize: "0.72rem", fontWeight: 800,
      textTransform: "uppercase", letterSpacing: "0.08em",
      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
    }}>
      {level}
    </span>
  );
}

// ─── Results Page ──────────────────────────────────────────────────────────────
export default function ResultsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"roi" | "recommendations" | "insights">("roi");
  const r = mockResult;

  const card = {
    background: "#ffffff", border: "1px solid #e5e7eb", padding: "2rem",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar
          title="Analysis Report"
          subtitle={`${r.industry} · ${r.company_size} · ${r.use_case} · ID: ${r.analysis_id}`}
          actions={
            <div style={{ display: "flex", gap: "0.625rem" }}>
              <Link href="/analysis/new"
                className="btn-premium-secondary"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                <Plus size={16} /> New Run
              </Link>
              <button
                className="btn-premium-primary"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <Download size={16} /> Export Brief
              </button>
            </div>
          }
        />

        <div style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>

          {/* ── KPI Summary Row ─── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
            {[
              { label: "Predicted ROI", value: `${r.roi_prediction.roi_predicted_pct}%`, icon: TrendingUp, accent: "#10B981" },
              { label: "Payback Period", value: `${r.roi_prediction.payback_period_months} months`, icon: Clock, accent: "#c8a96e" },
              { label: "Readiness Index", value: `${r.readiness_score_total}/100`, icon: Gauge, accent: "#1a3a5c" },
              { label: "Success Odds", value: `${(r.roi_prediction.success_probability * 100).toFixed(0)}%`, icon: Award, accent: "#f59e0b" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{
                  ...card, display: "flex", flexDirection: "column" as const,
                  justifyContent: "space-between", height: "130px",
                  borderTop: `3px solid ${item.accent}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</span>
                    <div style={{
                      width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${item.accent}14`, border: `1px solid ${item.accent}30`,
                    }}>
                      <Icon size={16} color={item.accent} />
                    </div>
                  </div>
                  <span style={{ fontSize: "2.25rem", fontWeight: 900, color: item.accent, fontFamily: "var(--font-display)" }}>{item.value}</span>
                </div>
              );
            })}
          </div>

          {/* ── Tab Navigation ─── */}
          <div style={{ borderBottom: "2px solid #e5e7eb", display: "flex", gap: "0", marginBottom: "2rem", background: "#ffffff" }}>
            {[
              { id: "roi", label: "ROI Projections", icon: TrendingUp },
              { id: "recommendations", label: "Strategic Roadmap", icon: Layers },
              { id: "insights", label: "Boardroom Insights", icon: Sparkles },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.625rem",
                    padding: "1.25rem 2rem", cursor: "pointer",
                    background: "none", border: "none",
                    borderBottom: `3px solid ${isActive ? "#c8a96e" : "transparent"}`,
                    marginBottom: "-2px",
                    fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                    color: isActive ? "#1a3a5c" : "#9ca3af",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── ROI Tab ─── */}
          {activeTab === "roi" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem" }}>
              {/* Gauge */}
              <div style={{ ...card, display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", alignSelf: "flex-start", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <TrendingUp size={16} color="#1a3a5c" /> ROI Prediction Analysis
                </h3>
                <ROIGauge value={r.roi_prediction.roi_predicted_pct} min={r.roi_prediction.roi_min} max={r.roi_prediction.roi_max} confidence={r.roi_prediction.confidence_pct} />
                <div style={{ width: "100%", marginTop: "2.5rem" }}>
                  <h4 style={{ fontSize: "0.75rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Scenario Projections</h4>
                  {[
                    { label: "Conservative (Bottom 10%)", value: r.scenarios.conservative, color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.15)" },
                    { label: "Moderate (Expected Case)", value: r.scenarios.moderate, color: "#c8a96e", bg: "rgba(200,169,110,0.06)", border: "rgba(200,169,110,0.2)" },
                    { label: "Aggressive (Optimistic Case)", value: r.scenarios.aggressive, color: "#10B981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.15)" },
                  ].map(s => (
                    <div key={s.label} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "1rem 1.25rem", marginBottom: "0.625rem",
                      background: s.bg, border: `1px solid ${s.border}`,
                      fontSize: "0.9rem", fontWeight: 700, color: s.color,
                    }}>
                      <span>{s.label}</span>
                      <span>{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SHAP Chart */}
              <div style={card}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <BarChart3 size={16} color="#c8a96e" /> Feature Attributions (SHAP)
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "2rem" }}>Attribution weight of operational metrics toward expected ROI</p>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={r.shap_features} layout="vertical" margin={{ left: 20, right: 10, top: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} unit="%" />
                      <YAxis dataKey="feature" type="category" tick={{ fill: "#374151", fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} width={120} />
                      <Tooltip
                        contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "2px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                        itemStyle={{ color: "#1a3a5c", fontWeight: 700, fontSize: 12 }}
                        formatter={(v: any) => [`${v}%`, "Contribution"]}
                      />
                      <Bar dataKey="importance" radius={[0, 2, 2, 0]}>
                        {r.shap_features.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`url(#barGradCorp-${index})`} />
                        ))}
                      </Bar>
                      <defs>
                        {r.shap_features.map((_, index) => (
                          <linearGradient key={`grad-${index}`} id={`barGradCorp-${index}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#1a3a5c" stopOpacity={1 - index * 0.1} />
                            <stop offset="100%" stopColor="#c8a96e" stopOpacity={1 - index * 0.1} />
                          </linearGradient>
                        ))}
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Readiness Breakdown */}
              <div style={{ ...card, gridColumn: "span 2" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <Gauge size={16} color="#1a3a5c" /> Dimensions Readiness Index
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "2rem" }}>Maturity scores measured on step sliders</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                  {r.readiness_breakdown.map(dim => {
                    const isHigh = dim.score >= 7.0;
                    const isMid = dim.score >= 5.0 && dim.score < 7.0;
                    const barColor = isHigh ? "#10B981" : isMid ? "#f59e0b" : "#ef4444";
                    const scoreColor = isHigh ? "#10B981" : isMid ? "#f59e0b" : "#ef4444";
                    return (
                      <div key={dim.dimension} style={{ padding: "1.5rem", background: "#f9fafb", border: "1px solid #f3f4f6" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#374151" }}>{dim.dimension}</span>
                          <span style={{ fontSize: "1.1rem", fontWeight: 900, color: scoreColor }}>{dim.score.toFixed(1)}</span>
                        </div>
                        <div style={{ width: "100%", height: "4px", background: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: `${dim.score * 10}%`, height: "100%", background: barColor, borderRadius: "2px", transition: "width 0.5s ease" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Recommendations Tab ─── */}
          {activeTab === "recommendations" && (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem" }}>
              {r.recommendations.map(rec => (
                <div key={rec.rank} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.25rem", flexWrap: "wrap" as const }}>
                    <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                      <div style={{
                        width: "44px", height: "44px", background: "#1a3a5c",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1rem", fontWeight: 900, color: "#ffffff", flexShrink: 0,
                      }}>
                        {rec.rank}
                      </div>
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111827" }}>{rec.title}</h4>
                        <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "0.3rem", lineHeight: 1.6 }}>{rec.rationale}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.625rem", flexShrink: 0 }}>
                      <DifficultyBadge level={rec.difficulty} />
                      <span style={{
                        padding: "0.35rem 0.8rem", fontSize: "0.72rem", fontWeight: 800,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color: "#6b7280", background: "#f3f4f6", border: "1px solid #e5e7eb",
                      }}>
                        ⏱ {rec.timeline}
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.625rem" }}>
                      Required Resources
                    </span>
                    <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" as const }}>
                      {rec.resources.map(res => (
                        <span key={res} style={{
                          padding: "0.45rem 1rem", background: "#f9fafb",
                          border: "1px solid #e5e7eb", fontSize: "0.85rem",
                          color: "#374151", fontWeight: 600,
                        }}>
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Insights Tab ─── */}
          {activeTab === "insights" && (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem" }}>
              {/* Executive Summary */}
              <div style={{ ...card, borderLeft: "4px solid #1a3a5c" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <FileText size={16} color="#1a3a5c" /> Executive Assessment Summary
                </h3>
                <p style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.8 }}>{r.insights.executive_summary}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {/* Key Findings */}
                <div style={{ ...card, borderTop: "3px solid #10B981" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    <CheckCircle2 size={16} color="#10B981" /> Key Findings
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                    {r.insights.key_findings.map((f, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", flexShrink: 0, marginTop: "8px" }} />
                        <span style={{ fontSize: "0.92rem", color: "#374151", lineHeight: 1.7 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Factors */}
                <div style={{ ...card, borderTop: "3px solid #ef4444" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    <AlertTriangle size={16} color="#ef4444" /> Risk Profiles
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                    {r.insights.risk_factors.map((f, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", flexShrink: 0, marginTop: "8px" }} />
                        <span style={{ fontSize: "0.92rem", color: "#374151", lineHeight: 1.7 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Opportunities */}
              <div style={card}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.625rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  <Lightbulb size={16} color="#c8a96e" /> Strategic Capital Opportunities
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                  {r.insights.opportunities.map((o, i) => (
                    <div key={i} style={{
                      padding: "1.75rem", background: "rgba(16,185,129,0.04)",
                      border: "1px solid rgba(16,185,129,0.12)",
                    }}>
                      <div style={{ width: "28px", height: "28px", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                        <ArrowRight size={14} color="#10B981" />
                      </div>
                      <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.7 }}>{o}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
