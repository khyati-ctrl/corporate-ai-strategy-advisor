"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import KPICard from "@/components/KPICard";
import TrendSection from "@/components/TrendSection";
import AIChatbot from "@/components/AIChatbot";
import {
  LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  BarChart3, TrendingUp, Gauge, FileText, Plus, ArrowUpRight,
  Clock, CheckCircle2, Globe, Zap, ShieldCheck,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const roiTrendData = [
  { month: "Jan", roi: 98 },
  { month: "Feb", roi: 115 },
  { month: "Mar", roi: 89 },
  { month: "Apr", roi: 142 },
  { month: "May", roi: 198 },
  { month: "Jun", roi: 142 },
];

const radarData = [
  { dimension: "Data",        score: 75 },
  { dimension: "Talent",      score: 60 },
  { dimension: "Leadership",  score: 80 },
  { dimension: "Tech Stack",  score: 70 },
  { dimension: "Change Mgmt", score: 55 },
  { dimension: "Data Quality",score: 70 },
];

const recentAnalyses = [
  { id: "demo-001", date: "Jun 7, 2026",  industry: "Healthcare",          useCase: "Predictive Analytics", roi: 142.5, readiness: 68.3 },
  { id: "demo-002", date: "May 20, 2026", industry: "Financial Services",  useCase: "Fraud Detection",       roi: 198.3, readiness: 79.1 },
  { id: "demo-003", date: "Apr 15, 2026", industry: "Retail & E-Commerce", useCase: "Demand Forecasting",    roi: 89.7,  readiness: 55.4 },
];

const card = { background: "#ffffff", border: "1px solid #e5e7eb", padding: "2rem" };

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar
          title="Dashboard"
          subtitle="Welcome back, Jane — here is your AI strategy overview"
          actions={
            <Link
              href="/analysis/new"
              className="group relative flex items-center justify-center sm:gap-2.5 w-10 h-10 sm:w-auto sm:h-auto overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] sm:px-8 sm:py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(26,58,92,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(26,58,92,0.4)] hover:-translate-y-0.5"
              style={{ textDecoration: "none" }}
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <div className="relative z-10 flex items-center justify-center sm:bg-[#c8a96e] rounded-full w-full h-full sm:w-6 sm:h-6 sm:shadow-sm transition-transform duration-300 group-hover:rotate-90">
                <Plus size={20} className="text-white sm:w-[14px] sm:h-[14px]" strokeWidth={2.5} />
              </div>
              <span className="relative z-10 hidden sm:inline text-[0.8rem] tracking-[0.1em] uppercase">New Analysis</span>
            </Link>
          }
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto w-full max-w-[100vw]">

          {/* ── KPI Cards (5 cards) ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-8 w-full">
            <KPICard icon="📊" label="Total Analyses"    value="12"     change="25%"  accent="#1a3a5c" sub="vs last month" />
            <KPICard icon="📈" label="Avg Predicted ROI" value="142.5%" change="18%"  accent="#10B981" sub="vs last month" />
            <KPICard icon="🧠" label="Last Readiness"    value="68.3"   change="4.2 pts" accent="#c8a96e" sub="vs last quarter" />
            <KPICard icon="🌐" label="Market Opportunity" value="$2.4B" change="12%"  accent="#2d5a8a" sub="addressable" />
            <KPICard icon="🛡️" label="Risk Score"        value="Low"    change="2 pts" changePositive={false} accent="#f59e0b" sub="adoption risk" />
          </div>

          {/* ── Charts Row ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 mb-8 w-full">
            {/* ROI Trend */}
            <div style={card}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>ROI Prediction Trend</h2>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>Average calculated return percentage over recent cycles</p>
              </div>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roiTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="roiGradCorp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#1a3a5c" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0.0}  />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "2px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px" }}
                      labelStyle={{ color: "#111827", fontWeight: 700 }}
                      itemStyle={{ color: "#1a3a5c", fontWeight: 600 }} />
                    <Area type="monotone" dataKey="roi" stroke="#1a3a5c" strokeWidth={2.5} fill="url(#roiGradCorp)"
                      dot={{ fill: "#1a3a5c", r: 4, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 5, strokeWidth: 0, fill: "#c8a96e" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar */}
            <div style={card}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>AI Readiness Radar</h2>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>Assessment ratings across 6 operational vectors</p>
              </div>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="rgba(0,0,0,0.06)" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "#374151", fontSize: 11, fontWeight: 700 }} />
                    <Radar name="Readiness" dataKey="score" stroke="#1a3a5c" fill="#c8a96e" fillOpacity={0.1} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "2px", fontSize: "12px" }}
                      itemStyle={{ color: "#1a3a5c", fontWeight: 600 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── Industry Trend Analysis ───────────────────────────────────── */}
          <TrendSection />

          {/* ── Recent Analyses ───────────────────────────────────────────── */}
          <div style={{ ...card, marginTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>Recent Strategic Analyses</h2>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>Monitor and access recent corporate model evaluations</p>
              </div>
              <Link href="/history"
                className="group relative flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-white border border-gray-200 px-4 py-2 font-bold text-[#1a3a5c] shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 text-xs uppercase tracking-wider"
                style={{ textDecoration: "none" }}>
                Browse History <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {["Date", "Industry Sector", "AI Use Case", "Predicted ROI", "Readiness", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "1rem 1.25rem", fontSize: "0.75rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentAnalyses.map((a, i) => (
                    <tr key={a.id}
                      style={{ borderBottom: i < recentAnalyses.length - 1 ? "1px solid #f9fafb" : "none" }}
                      onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "#fafafa"}
                      onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = "transparent"}
                    >
                      <td style={{ padding: "1.1rem 1.25rem", fontSize: "0.85rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Clock size={14} /> {a.date}
                      </td>
                      <td style={{ padding: "1.1rem 1.25rem", fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>{a.industry}</td>
                      <td style={{ padding: "1.1rem 1.25rem", fontSize: "0.88rem", color: "#374151" }}>{a.useCase}</td>
                      <td style={{ padding: "1.1rem 1.25rem", fontSize: "1.05rem", fontWeight: 900, color: "#10B981" }}>{a.roi}%</td>
                      <td style={{ padding: "1.1rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ width: "80px", height: "5px", background: "#f3f4f6", overflow: "hidden" }}>
                            <div style={{ width: `${a.readiness}%`, height: "100%", background: "linear-gradient(90deg, #1a3a5c, #c8a96e)" }} />
                          </div>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>{a.readiness}</span>
                        </div>
                      </td>
                      <td style={{ padding: "1.1rem 1.25rem" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "0.4rem",
                          padding: "0.35rem 0.8rem",
                          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                          fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                          color: "#10B981",
                        }}>
                          <CheckCircle2 size={12} /> Ready
                        </span>
                      </td>
                      <td style={{ padding: "1.1rem 1.25rem" }}>
                        <Link href={`/analysis/${a.id}`}
                          className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-4 py-2 font-bold text-white shadow-[0_2px_8px_rgba(26,58,92,0.2)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(26,58,92,0.3)] hover:-translate-y-0.5 text-[0.7rem] uppercase tracking-wider"
                          style={{ textDecoration: "none" }}>
                          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                            <div className="relative h-full w-4 bg-white/20" />
                          </div>
                          <span className="relative z-10">Inspect</span>
                          <ArrowUpRight size={12} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* Floating chatbot */}
      <AIChatbot />
    </div>
  );
}
