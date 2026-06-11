"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/* ─── Sample data ─────────────────────────────────────────────────────────── */
const monthlyData = [
  { month: "Jan", startups: 420, funding: 3.1, adoption: 34 },
  { month: "Feb", startups: 480, funding: 3.8, adoption: 37 },
  { month: "Mar", startups: 510, funding: 4.2, adoption: 41 },
  { month: "Apr", startups: 560, funding: 5.0, adoption: 46 },
  { month: "May", startups: 610, funding: 6.1, adoption: 51 },
  { month: "Jun", startups: 670, funding: 7.4, adoption: 57 },
  { month: "Jul", startups: 720, funding: 8.0, adoption: 61 },
  { month: "Aug", startups: 780, funding: 9.3, adoption: 65 },
  { month: "Sep", startups: 830, funding: 10.1, adoption: 68 },
  { month: "Oct", startups: 890, funding: 11.8, adoption: 72 },
  { month: "Nov", startups: 940, funding: 13.2, adoption: 76 },
  { month: "Dec", startups: 1020, funding: 15.0, adoption: 81 },
];

const forecastData = [
  { year: "2022", actual: 58, forecast: null },
  { year: "2023", actual: 82, forecast: null },
  { year: "2024", actual: 118, forecast: null },
  { year: "2025", actual: 152, forecast: null },
  { year: "2026", actual: 190, forecast: 195 },
  { year: "2027", actual: null, forecast: 248 },
  { year: "2028", actual: null, forecast: 310 },
];

const sectorData = [
  { sector: "FinTech", adoption: 84, color: "#1d4ed8" },
  { sector: "HealthTech", adoption: 71, color: "#7c3aed" },
  { sector: "RetailTech", adoption: 63, color: "#0891b2" },
  { sector: "ManuTech", adoption: 55, color: "#059669" },
  { sector: "EdTech", adoption: 47, color: "#d97706" },
  { sector: "LegalTech", adoption: 39, color: "#db2777" },
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
      <p style={{ color: "#93c5fd", fontWeight: 700, margin: "0 0 6px" }}>{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}:{" "}
          <strong>
            {p.value}
            {p.name.includes("Funding") ? "B" : p.name.includes("Adoption") ? "%" : ""}
          </strong>
        </p>
      ))}
    </div>
  );
};

/* ─── Card wrapper ────────────────────────────────────────────────────────── */
function Card({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#080f1e",
        border: "1px solid #111c30",
        borderRadius: 14,
        padding: "22px 22px 18px",
      }}
    >
      <h3
        style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 700, margin: "0 0 3px" }}
      >
        {title}
      </h3>
      <p style={{ color: "#475569", fontSize: 12, margin: "0 0 18px" }}>{sub}</p>
      {children}
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export default function TrendSection() {
  return (
    <section style={{ marginTop: 40 }}>
      {/* Section header */}
      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 20 }}>📈</span>
          <h2
            style={{
              color: "#f1f5f9",
              fontSize: 20,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Industry Trend Analysis
          </h2>
          <span
            style={{
              background: "#1d4ed818",
              border: "1px solid #1d4ed844",
              color: "#60a5fa",
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 10px",
              borderRadius: 20,
            }}
          >
            Live — Q2 2026
          </span>
        </div>
        <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
          Startup growth trends, AI adoption metrics, funding insights, and
          global market forecasts
        </p>
      </div>

      {/* Row 1: two charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        {/* Startup growth + funding */}
        <Card
          title="Startup Growth & Funding"
          sub="Monthly new AI startups and investment ($B) — 2026"
        >
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111c30" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={{ stroke: "#1e293b" }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Startups",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#334155",
                  fontSize: 10,
                  offset: 10,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Funding $B",
                  angle: 90,
                  position: "insideRight",
                  fill: "#334155",
                  fontSize: 10,
                  offset: 10,
                }}
              />
              <Tooltip content={<Tip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "#64748b", paddingTop: 8 }}
              />
              <Line
                yAxisId="left"
                dataKey="startups"
                name="Startups"
                stroke="#1d4ed8"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                dataKey="funding"
                name="Funding $B"
                stroke="#7c3aed"
                strokeWidth={2.5}
                dot={false}
                strokeDasharray="5 3"
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* AI adoption rate */}
        <Card
          title="Enterprise AI Adoption Rate"
          sub="% of Fortune 1000 companies with active AI deployments"
        >
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="adoptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                domain={[0, 100]}
              />
              <Tooltip content={<Tip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "#64748b", paddingTop: 8 }}
              />
              <Area
                type="monotone"
                dataKey="adoption"
                name="AI Adoption %"
                stroke="#0891b2"
                fill="url(#adoptGrad)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 2: bar forecast + sector bars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 18,
        }}
      >
        {/* Market revenue forecast */}
        <Card
          title="AI Market Revenue Forecast"
          sub="Global AI market revenue ($B) — Actual vs Projected"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={forecastData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111c30" />
              <XAxis
                dataKey="year"
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={{ stroke: "#1e293b" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#475569", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit="B"
              />
              <Tooltip content={<Tip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "#64748b", paddingTop: 8 }}
              />
              <ReferenceLine
                x="2026"
                stroke="#334155"
                strokeDasharray="4 3"
                label={{ value: "Now", fill: "#475569", fontSize: 10 }}
              />
              <Bar
                dataKey="actual"
                name="Actual Revenue"
                fill="#1d4ed8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="forecast"
                name="Forecast"
                fill="#7c3aed"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.75}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sector AI adoption — custom bar chart */}
        <Card
          title="AI Adoption by Sector"
          sub="Active deployment rate (%) per industry vertical"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 11,
              marginTop: 4,
            }}
          >
            {sectorData.map((s) => (
              <div key={s.sector}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ color: "#cbd5e1", fontSize: 12 }}>
                    {s.sector}
                  </span>
                  <span
                    style={{
                      color: s.color,
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {s.adoption}%
                  </span>
                </div>
                <div
                  style={{
                    background: "#111c30",
                    borderRadius: 6,
                    height: 7,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${s.adoption}%`,
                      height: "100%",
                      background: `linear-gradient(90deg,${s.color},${s.color}88)`,
                      borderRadius: 6,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
