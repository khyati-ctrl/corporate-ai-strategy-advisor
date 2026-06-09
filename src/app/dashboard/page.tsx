"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  BarChart3, TrendingUp, Gauge, FileText, Plus, ArrowUpRight,
  Clock, CheckCircle2, Activity
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
  { dimension: "Data", score: 75 },
  { dimension: "Talent", score: 60 },
  { dimension: "Leadership", score: 80 },
  { dimension: "Tech Stack", score: 70 },
  { dimension: "Change Mgmt", score: 55 },
  { dimension: "Data Quality", score: 70 },
];

const recentAnalyses = [
  { id: "demo-001", date: "Jun 7, 2026", industry: "Healthcare", useCase: "Predictive Analytics", roi: 142.5, readiness: 68.3 },
  { id: "demo-002", date: "May 20, 2026", industry: "Financial Services", useCase: "Fraud Detection", roi: 198.3, readiness: 79.1 },
  { id: "demo-003", date: "Apr 15, 2026", industry: "Retail & E-Commerce", useCase: "Demand Forecasting", roi: 89.7, readiness: 55.4 },
];

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, change, accent }: {
  icon: any; label: string; value: string; change?: string; accent: string;
}) {
  return (
    <div style={{
      background: "#ffffff", border: "1px solid #e5e7eb",
      padding: "2rem", borderTop: `3px solid ${accent}`,
      transition: "box-shadow 0.25s",
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.625rem" }}>{label}</p>
          <h3 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#111827", fontFamily: "var(--font-display)", lineHeight: 1 }}>{value}</h3>
          {change && (
            <div style={{ marginTop: "0.625rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#10B981" }}>↑ {change}</span>
              <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>vs last month</span>
            </div>
          )}
        </div>
        <div style={{
          width: "48px", height: "48px",
          background: `${accent}14`, border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={22} color={accent} />
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const card = { background: "#ffffff", border: "1px solid #e5e7eb", padding: "2rem" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar
          title="Dashboard"
          subtitle="Welcome back, Jane — here is your AI strategy overview"
          actions={
            <Link href="/analysis/new"
              className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(26,58,92,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(26,58,92,0.4)] hover:-translate-y-0.5"
              style={{ textDecoration: "none" }}>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <div className="relative z-10 flex items-center justify-center bg-[#c8a96e] rounded-full w-5 h-5 sm:w-6 sm:h-6 shadow-sm transition-transform duration-300 group-hover:rotate-90">
                <Plus size={14} className="text-white" strokeWidth={3} />
              </div>
              <span className="relative z-10 text-[0.75rem] sm:text-[0.8rem] tracking-[0.1em] uppercase">New Analysis</span>
            </Link>
          }
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto w-full max-w-[100vw]">

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 w-full">
            <StatCard icon={BarChart3} label="Total Analyses" value="12" change="25%" accent="#1a3a5c" />
            <StatCard icon={TrendingUp} label="Avg Predicted ROI" value="142.5%" change="18%" accent="#10B981" />
            <StatCard icon={Gauge} label="Last Readiness" value="68.3" accent="#c8a96e" />
            <StatCard icon={FileText} label="Reports Exported" value="5" change="12%" accent="#f59e0b" />
          </div>

          {/* Charts Row */}
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
                        <stop offset="5%" stopColor="#1a3a5c" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "2px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px" }}
                      labelStyle={{ color: "#111827", fontWeight: 700 }}
                      itemStyle={{ color: "#1a3a5c", fontWeight: 600 }}
                    />
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
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "2px", fontSize: "12px" }}
                      itemStyle={{ color: "#1a3a5c", fontWeight: 600 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Analyses Table */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>Recent Strategic Analyses</h2>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>Monitor and access recent corporate model evaluations</p>
              </div>
              <Link href="/history"
                style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a3a5c", display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Browse History <ArrowUpRight size={14} />
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
                      <td style={{ padding: "1.1rem 1.25rem", fontSize: "1.05rem", fontWeight: 900, color: "#10B981", fontFamily: "var(--font-display)" }}>{a.roi}%</td>
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
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                            padding: "0.6rem 1.1rem",
                            background: "#f9fafb", border: "1px solid #e5e7eb",
                            fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                            color: "#1a3a5c", textDecoration: "none", transition: "all 0.2s",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "#1a3a5c";
                            (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a3a5c";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "#f9fafb";
                            (e.currentTarget as HTMLAnchorElement).style.color = "#1a3a5c";
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e5e7eb";
                          }}
                        >
                          Inspect <ArrowUpRight size={14} />
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
    </div>
  );
}
