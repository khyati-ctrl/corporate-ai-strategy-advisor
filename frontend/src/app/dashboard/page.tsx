"use client";
import Link from "next/link";
import {
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import KPICard from "@/components/KPICard";
import TrendSection from "@/components/TrendSection";
import AIChatbot from "@/components/AIChatbot";

/* ─── Data ────────────────────────────────────────────────────────────────── */
const kpis = [
  {
    title: "AI Readiness",
    value: "68.3",
    change: "4.2 pts",
    changePositive: true,
    icon: "🧠",
    accentColor: "#1d4ed8",
    sub: "vs last quarter",
  },
  {
    title: "Market Opportunity",
    value: "$2.4B",
    change: "12%",
    changePositive: true,
    icon: "🌐",
    accentColor: "#7c3aed",
    sub: "addressable market",
  },
  {
    title: "Revenue Growth",
    value: "+18%",
    change: "3%",
    changePositive: true,
    icon: "📈",
    accentColor: "#059669",
    sub: "AI-attributed lift",
  },
  {
    title: "Automation Impact",
    value: "34%",
    change: "8%",
    changePositive: true,
    icon: "⚙️",
    accentColor: "#0891b2",
    sub: "tasks automated",
  },
  {
    title: "Risk Score",
    value: "Low",
    change: "2 pts",
    changePositive: true,
    icon: "🛡️",
    accentColor: "#d97706",
    sub: "adoption risk",
  },
];

const roiTrend = [
  { month: "Jan", roi: 112 },
  { month: "Feb", roi: 125 },
  { month: "Mar", roi: 138 },
  { month: "Apr", roi: 131 },
  { month: "May", roi: 148 },
  { month: "Jun", roi: 142.5 },
];

const radarData = [
  { axis: "Data Infra", value: 72 },
  { axis: "Talent", value: 65 },
  { axis: "Strategy", value: 80 },
  { axis: "Budget", value: 58 },
  { axis: "Culture", value: 70 },
  { axis: "Security", value: 75 },
];

const recentAnalyses = [
  {
    date: "Jun 7, 2026",
    industry: "Healthcare",
    useCase: "Predictive Analytics",
    roi: "142.5%",
    readiness: 68.3,
    id: "demo-001",
  },
  {
    date: "May 20, 2026",
    industry: "Financial Services",
    useCase: "Fraud Detection",
    roi: "198.3%",
    readiness: 79.1,
    id: "demo-002",
  },
  {
    date: "Apr 15, 2026",
    industry: "Retail & E-Commerce",
    useCase: "Demand Forecasting",
    roi: "89.7%",
    readiness: 55.4,
    id: "demo-003",
  },
];

/* ─── Custom tooltip ──────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#080f1e",
        border: "1px solid #1e3a5f",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
      }}
    >
      <p style={{ color: "#93c5fd", fontWeight: 700, margin: "0 0 6px" }}>
        {label}
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: <strong>{p.value}%</strong>
        </p>
      ))}
    </div>
  );
};

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060d1a",
        padding: "32px 36px 80px",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <p style={{ color: "#334155", fontSize: 13, margin: "0 0 20px" }}>
        Portal ›{" "}
        <span style={{ color: "#60a5fa" }}>Dashboard</span>
      </p>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              color: "#f1f5f9",
              fontSize: 26,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Dashboard
          </h1>
          <p style={{ color: "#475569", fontSize: 14, margin: "6px 0 0" }}>
            Welcome back, Jane — here is your AI strategy overview
          </p>
        </div>
        <Link
          href="/analysis/new"
          style={{
            background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
            color: "#fff",
            padding: "11px 22px",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          + New Analysis
        </Link>
      </div>

      {/* KPI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {kpis.map((k) => (
          <KPICard key={k.title} {...k} />
        ))}
      </div>

      {/* ROI trend + radar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 18,
          marginBottom: 28,
        }}
      >
        {/* ROI trend */}
        <div
          style={{
            background: "#080f1e",
            border: "1px solid #111c30",
            borderRadius: 14,
            padding: "22px 22px 18px",
          }}
        >
          <h3
            style={{
              color: "#f1f5f9",
              fontSize: 15,
              fontWeight: 700,
              margin: "0 0 3px",
            }}
          >
            ROI Prediction Trend
          </h3>
          <p
            style={{ color: "#475569", fontSize: 12, margin: "0 0 18px" }}
          >
            Average calculated return percentage over recent cycles
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={roiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111c30" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={{ stroke: "#1e293b" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip content={<Tip />} />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  color: "#64748b",
                  paddingTop: 8,
                }}
              />
              <Line
                type="monotone"
                dataKey="roi"
                name="Predicted ROI"
                stroke="#1d4ed8"
                strokeWidth={2.5}
                dot={{ fill: "#1d4ed8", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div
          style={{
            background: "#080f1e",
            border: "1px solid #111c30",
            borderRadius: 14,
            padding: "22px 22px 18px",
          }}
        >
          <h3
            style={{
              color: "#f1f5f9",
              fontSize: 15,
              fontWeight: 700,
              margin: "0 0 3px",
            }}
          >
            AI Readiness Radar
          </h3>
          <p
            style={{ color: "#475569", fontSize: 12, margin: "0 0 18px" }}
          >
            Assessment ratings across 6 operational vectors
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#475569", fontSize: 11 }}
              />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={{ fill: "#334155", fontSize: 10 }}
                axisLine={false}
              />
              <Radar
                name="Readiness"
                dataKey="value"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.28}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  background: "#080f1e",
                  border: "1px solid #1e3a5f",
                  borderRadius: 8,
                  color: "#f1f5f9",
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Industry Trend Analysis */}
      <TrendSection />

      {/* Recent analyses table */}
      <div
        style={{
          background: "#080f1e",
          border: "1px solid #111c30",
          borderRadius: 14,
          padding: "22px 24px",
          marginTop: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div>
            <h3
              style={{
                color: "#f1f5f9",
                fontSize: 15,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Recent Strategic Analyses
            </h3>
            <p
              style={{ color: "#475569", fontSize: 12, margin: "4px 0 0" }}
            >
              Monitor and access recent corporate model evaluations
            </p>
          </div>
          <Link
            href="/history"
            style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none" }}
          >
            Browse History →
          </Link>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #111c30" }}>
              {[
                "Date",
                "Industry Sector",
                "AI Use Case",
                "Predicted ROI",
                "Readiness",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    color: "#334155",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "8px 12px",
                    textAlign: "left",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentAnalyses.map((r) => (
              <tr
                key={r.id}
                style={{
                  borderBottom: "1px solid #0a1220",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    "#0b1525")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    "transparent")
                }
              >
                <td
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    padding: "13px 12px",
                  }}
                >
                  {r.date}
                </td>
                <td
                  style={{
                    color: "#cbd5e1",
                    fontSize: 13,
                    padding: "13px 12px",
                  }}
                >
                  {r.industry}
                </td>
                <td
                  style={{
                    color: "#cbd5e1",
                    fontSize: 13,
                    padding: "13px 12px",
                  }}
                >
                  {r.useCase}
                </td>
                <td
                  style={{
                    color: "#4ade80",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "13px 12px",
                  }}
                >
                  {r.roi}
                </td>
                <td
                  style={{
                    color: "#60a5fa",
                    fontSize: 13,
                    padding: "13px 12px",
                  }}
                >
                  {r.readiness}
                </td>
                <td style={{ padding: "13px 12px" }}>
                  <span
                    style={{
                      background: "#052e1633",
                      border: "1px solid #16653455",
                      color: "#4ade80",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    Ready
                  </span>
                </td>
                <td style={{ padding: "13px 12px" }}>
                  <Link
                    href={`/analysis/${r.id}`}
                    style={{
                      color: "#60a5fa",
                      fontSize: 13,
                      textDecoration: "none",
                    }}
                  >
                    Inspect →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating chatbot */}
      <AIChatbot />
    </div>
  );
}
