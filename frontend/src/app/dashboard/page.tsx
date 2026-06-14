"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, Gauge, FileText, Plus, ArrowUpRight,
  Brain, Zap, CheckCircle2, AlertTriangle, Info, BarChart3,
  Clock, ChevronRight, Target, Activity,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const roiTrend = [
  { month: "Jan", roi: 98,  prev: 72  },
  { month: "Feb", roi: 115, prev: 88  },
  { month: "Mar", roi: 89,  prev: 95  },
  { month: "Apr", roi: 142, prev: 110 },
  { month: "May", roi: 198, prev: 130 },
  { month: "Jun", roi: 166, prev: 142 },
];

const radarData = [
  { dimension: "Data Quality",  score: 75 },
  { dimension: "Talent",        score: 60 },
  { dimension: "Leadership",    score: 80 },
  { dimension: "Tech Stack",    score: 70 },
  { dimension: "Change Mgmt",   score: 55 },
  { dimension: "Process",       score: 68 },
];

const industryPie = [
  { name: "Healthcare",    value: 33, color: "#1a3a5c" },
  { name: "Finance",       value: 25, color: "#c8a96e" },
  { name: "Retail",        value: 20, color: "#2d5a8a" },
  { name: "Technology",    value: 15, color: "#10B981" },
  { name: "Other",         value: 7,  color: "#e5e7eb" },
];

const recentActivity = [
  { initials: "JD", name: "Jane Doe",    action: "Completed Healthcare AI Assessment",  time: "2m ago",  type: "success" },
  { initials: "AK", name: "Alex Kim",    action: "Generated ROI Forecast Report",       time: "1h ago",  type: "info"    },
  { initials: "SP", name: "Sam Patel",   action: "Started Retail Readiness Analysis",   time: "3h ago",  type: "pending" },
  { initials: "CW", name: "Chen Wei",    action: "Exported Strategy Roadmap PDF",       time: "5h ago",  type: "success" },
];

const typeColor: Record<string, string> = {
  success: "#10B981",
  info:    "#1a3a5c",
  pending: "#c8a96e",
};

// ─── Shared styles ─────────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "1.6rem",
};

// ─── Insight Box ───────────────────────────────────────────────────────────────
function InsightBox({ title, icon: Icon, color, children }: {
  title: string; icon: React.ElementType; color: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#f9fafb", border: `1px solid #e5e7eb`, borderLeft: `3px solid ${color}`, padding: "1.1rem 1.2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <Icon size={13} color={color} />
        <span style={{ fontSize: "0.68rem", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.12em" }}>{title}</span>
      </div>
      <div style={{ fontSize: "0.8rem", color: "#374151", lineHeight: 1.65, fontWeight: 500 }}>{children}</div>
    </div>
  );
}

// ─── Metric Pill ───────────────────────────────────────────────────────────────
function MetricPill({ icon: Icon, label, value, change, up, accent }: {
  icon: React.ElementType; label: string; value: string; change: string; up: boolean; accent: string;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderTop: `2px solid ${accent}`, padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.85rem", transition: "box-shadow 0.2s" }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 14px rgba(0,0,0,0.06)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
    >
      <div style={{ width: "34px", height: "34px", background: `${accent}12`, border: `1px solid ${accent}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "0.6rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.15rem" }}>{label}</p>
        <p style={{ fontSize: "1.3rem", fontWeight: 900, color: "#111827", fontFamily: "var(--font-display)", lineHeight: 1 }}>{value}</p>
      </div>
      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: up ? "#10B981" : "#ef4444", background: up ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", padding: "0.2rem 0.55rem", whiteSpace: "nowrap" }}>
        {up ? "↑" : "↓"} {change}
      </span>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar
          title="Overview"
          subtitle="Welcome back, Jane — here is your AI strategy overview"
          actions={
            <Link href="/analysis/new"
              className="group relative flex items-center justify-center sm:gap-2 w-10 h-10 sm:w-auto sm:h-auto overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] sm:px-6 sm:py-2.5 font-bold text-white shadow-[0_4px_12px_rgba(26,58,92,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(26,58,92,0.4)] hover:-translate-y-0.5"
              style={{ textDecoration: "none" }}>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-6 bg-white/20" />
              </div>
              <div className="relative z-10 flex items-center justify-center sm:bg-[#c8a96e] rounded-full w-full h-full sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90">
                <Plus size={16} className="text-white sm:w-3 sm:h-3" strokeWidth={2.5} />
              </div>
              <span className="relative z-10 hidden sm:inline text-[0.73rem] tracking-[0.1em] uppercase">New Analysis</span>
            </Link>
          }
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5">

          {/* ── Row 1: Metric Pills ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricPill icon={BarChart3}  label="Total Analyses"     value="12"     change="25%"  up={true}  accent="#1a3a5c" />
            <MetricPill icon={TrendingUp} label="Avg Predicted ROI"  value="142.5%" change="18%"  up={true}  accent="#10B981" />
            <MetricPill icon={Gauge}      label="AI Readiness Score" value="68.3"   change="4.6%" up={false} accent="#c8a96e" />
            <MetricPill icon={FileText}   label="Reports Exported"   value="5"      change="12%"  up={true}  accent="#f59e0b" />
          </div>

          {/* ── Row 2: ROI Trend + Written Summary ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Chart (2/3) */}
            <div style={{ ...card, gridColumn: "span 2", display: "flex", flexDirection: "column" }} className="lg:col-span-2">
              <div style={{ marginBottom: "1.25rem", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>Performance Trend</p>
                    <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>ROI Prediction Overview</h2>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.68rem", fontWeight: 600, color: "#9ca3af", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><span style={{ width: "14px", height: "2px", background: "#1a3a5c", display: "inline-block" }} />This Cycle</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><span style={{ width: "14px", height: "2px", background: "#d1d5db", display: "inline-block", borderTop: "2px dashed #d1d5db" }} />Last Cycle</span>
                  </div>
                </div>
                <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem" }} />
              </div>
              <div style={{ flex: 1, minHeight: "160px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roiTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#1a3a5c" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "11px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                      formatter={(v: number, n: string) => [`${v}%`, n === "roi" ? "This Cycle" : "Last Cycle"]}
                    />
                    <Area type="monotone" dataKey="prev" stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="5 3" fill="transparent" dot={false} />
                    <Area type="monotone" dataKey="roi"  stroke="#1a3a5c" strokeWidth={2.5} fill="url(#g1)"
                      dot={{ fill: "#1a3a5c", r: 3, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 5, strokeWidth: 0, fill: "#c8a96e" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Written Summary (1/3) */}
            <div style={{ ...card, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>Chart Analysis</p>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>What This Means</h2>
                <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem", marginBottom: "0.85rem" }} />
                <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.7 }}>
                  ROI predictions have grown <strong style={{ color: "#111827" }}>70% over 6 months</strong>, recovering sharply after a March dip. May recorded the highest projected return at <strong style={{ color: "#10B981" }}>198%</strong>.
                </p>
              </div>
              <InsightBox title="Key Takeaway" icon={TrendingUp} color="#10B981">
                Your organization is on a strong upward ROI trajectory. The gap vs last cycle is widening, suggesting improving AI adoption maturity.
              </InsightBox>
              <InsightBox title="Watch Out" icon={AlertTriangle} color="#f59e0b">
                March saw a dip to <strong>89%</strong> — linked to the Retail sector's lower readiness score. Prioritize data quality improvements there.
              </InsightBox>
              <InsightBox title="Recommended Action" icon={Target} color="#1a3a5c">
                Expand the Healthcare and Finance pilots. Both sectors are consistently above 140% ROI with improving trend momentum.
              </InsightBox>
            </div>
          </div>

          {/* ── Row 3: Radar + Written Breakdown ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Written breakdown (1/3) */}
            <div style={{ ...card, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>Readiness Breakdown</p>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>AI Maturity Assessment</h2>
                <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem", marginBottom: "0.85rem" }} />
                <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.7 }}>
                  Your organization scores an average of <strong style={{ color: "#111827" }}>68.3 / 100</strong> across 6 AI readiness dimensions. Leadership and Data are your strongest pillars.
                </p>
              </div>
              {[
                { label: "Leadership",    score: 80, color: "#10B981", note: "Excellent executive buy-in" },
                { label: "Data Quality",  score: 75, color: "#10B981", note: "Strong data governance" },
                { label: "Tech Stack",    score: 70, color: "#c8a96e", note: "Moderate — plan upgrades" },
                { label: "Talent",        score: 60, color: "#f59e0b", note: "Upskilling needed" },
                { label: "Change Mgmt",   score: 55, color: "#ef4444", note: "Highest risk area" },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151" }}>{r.label}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: r.color }}>{r.score}</span>
                  </div>
                  <div style={{ height: "4px", background: "#f3f4f6", overflow: "hidden", marginBottom: "0.15rem" }}>
                    <div style={{ width: `${r.score}%`, height: "100%", background: r.color, transition: "width 0.5s" }} />
                  </div>
                  <p style={{ fontSize: "0.66rem", color: "#9ca3af" }}>{r.note}</p>
                </div>
              ))}
            </div>

            {/* Radar Chart (2/3) */}
            <div style={{ ...card, display: "flex", flexDirection: "column" }} className="lg:col-span-2">
              <div style={{ marginBottom: "1rem", flexShrink: 0 }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>Operational Vectors</p>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>AI Readiness Radar</h2>
                <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem" }} />
              </div>
              <div style={{ flex: 1, minHeight: "190px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                    <PolarGrid stroke="rgba(0,0,0,0.06)" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "#374151", fontSize: 11, fontWeight: 700 }} />
                    <Radar dataKey="score" stroke="#1a3a5c" fill="#c8a96e" fillOpacity={0.12} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "11px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Callout row */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {[
                  { label: "Strongest",  value: "Leadership · 80",   color: "#10B981", icon: CheckCircle2  },
                  { label: "Weakest",    value: "Change Mgmt · 55",  color: "#ef4444", icon: AlertTriangle },
                  { label: "Overall",    value: "68.3 / 100",         color: "#1a3a5c", icon: Activity      },
                ].map(c => (
                  <div key={c.label} style={{ flex: "1 1 120px", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "0.65rem 0.85rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <c.icon size={13} color={c.color} />
                    <div>
                      <p style={{ fontSize: "0.6rem", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</p>
                      <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#111827" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 4: Industry Donut + Activity + CTA ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Industry Donut + explanation */}
            <div style={card}>
              <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>Sector Mix</p>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>Industry Distribution</h2>
              <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem", marginBottom: "0.85rem" }} />
              <div style={{ height: "130px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={industryPie} cx="50%" cy="50%" innerRadius={36} outerRadius={58} dataKey="value" strokeWidth={0}>
                      {industryPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: "0.75rem" }}>
                {industryPie.map(d => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.3rem 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.color, flexShrink: 0 }} />{d.name}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#111827" }}>{d.value}%</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "0.85rem", padding: "0.65rem 0.85rem", background: "#f0f9ff", border: "1px solid #bae6fd", fontSize: "0.75rem", color: "#0369a1", lineHeight: 1.5 }}>
                <Info size={12} style={{ display: "inline", marginRight: "0.35rem" }} />
                Healthcare leads with 33% of all analyses. Consider expanding into Energy and Logistics for diversified insights.
              </div>
            </div>

            {/* Activity feed + written context */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>Team Updates</p>
                  <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>Recent Activity</h2>
                  <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem" }} />
                </div>
                <Link href="/history" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.7rem", fontWeight: 700, color: "#1a3a5c" }}>
                  View All <ChevronRight size={11} />
                </Link>
              </div>
              <div style={{ marginTop: "0.85rem", marginBottom: "0.85rem" }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.65rem", padding: "0.6rem 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "flex-start" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#1e3a8a,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                      {a.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#111827" }}>{a.name}</p>
                      <p style={{ fontSize: "0.72rem", color: "#6b7280", lineHeight: 1.4 }}>{a.action}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.62rem", color: "#9ca3af", fontWeight: 600 }}>{a.time}</span>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: typeColor[a.type] }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0.65rem 0.85rem", background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.55 }}>
                <strong style={{ color: "#111827" }}>Team Summary:</strong> 4 actions in the last 24 hours. Analysis completion rate is at 67%. The team is ahead of last month's pace by 2 assessments.
              </div>
            </div>

            {/* Quick Stats + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {/* Progress summary */}
              <div style={card}>
                <p style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>This Cycle</p>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827" }}>Assessment Status</h2>
                <div style={{ width: "24px", height: "2px", background: "#c8a96e", marginTop: "0.5rem", marginBottom: "1rem" }} />
                {[
                  { label: "Completed",   count: 8, total: 12, color: "#10B981" },
                  { label: "In Progress", count: 3, total: 12, color: "#c8a96e" },
                  { label: "Pending",     count: 1, total: 12, color: "#e5e7eb" },
                ].map(s => (
                  <div key={s.label} style={{ marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151" }}>{s.label}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#111827" }}>{s.count} <span style={{ color: "#9ca3af", fontWeight: 500 }}>/ {s.total}</span></span>
                    </div>
                    <div style={{ height: "5px", background: "#f3f4f6", overflow: "hidden" }}>
                      <div style={{ width: `${(s.count / s.total) * 100}%`, height: "100%", background: s.color }} />
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: "0.74rem", color: "#6b7280", lineHeight: 1.5, marginTop: "0.25rem" }}>
                  <strong style={{ color: "#10B981" }}>8 of 12</strong> assessments complete this cycle. On track to finish the remaining <strong style={{ color: "#111827" }}>4</strong> within the next week.
                </p>
              </div>

              {/* CTA */}
              <div style={{ background: "linear-gradient(135deg,#1a3a5c 0%,#2d5a8a 100%)", padding: "1.25rem", position: "relative", overflow: "hidden", flex: 1 }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "90px", height: "90px", background: "rgba(200,169,110,0.15)", borderRadius: "50%", filter: "blur(20px)" }} />
                <Brain size={18} color="#c8a96e" style={{ marginBottom: "0.6rem" }} />
                <p style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.3rem", lineHeight: 1.3 }}>Unlock deeper AI strategy insights</p>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginBottom: "1rem", lineHeight: 1.5 }}>Industry benchmarks, LLM strategy reports & SHAP explainability await.</p>
                <Link href="/analysis/new" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#c8a96e", color: "#0a0f1e", fontSize: "0.72rem", fontWeight: 800, padding: "0.5rem 1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <Zap size={11} /> Start Analysis
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
