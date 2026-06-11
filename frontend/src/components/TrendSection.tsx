"use client";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

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
  { year: "2022", actual: 58,  forecast: null },
  { year: "2023", actual: 82,  forecast: null },
  { year: "2024", actual: 118, forecast: null },
  { year: "2025", actual: 152, forecast: null },
  { year: "2026", actual: 190, forecast: 195 },
  { year: "2027", actual: null, forecast: 248 },
  { year: "2028", actual: null, forecast: 310 },
];

const sectorData = [
  { sector: "FinTech",     adoption: 84, color: "#1a3a5c" },
  { sector: "HealthTech",  adoption: 71, color: "#c8a96e" },
  { sector: "RetailTech",  adoption: 63, color: "#2d5a8a" },
  { sector: "ManuTech",    adoption: 55, color: "#10B981" },
  { sector: "EdTech",      adoption: 47, color: "#f59e0b" },
  { sector: "LegalTech",   adoption: 39, color: "#6366f1" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      padding: "10px 14px", fontSize: 12,
    }}>
      <p style={{ color: "#111827", fontWeight: 700, margin: "0 0 6px" }}>{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, margin: "2px 0", fontWeight: 600 }}>
          {p.name}: <strong>{p.value}{p.name.includes("Funding") ? "B" : p.name.includes("Adoption") ? "%" : ""}</strong>
        </p>
      ))}
    </div>
  );
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "2rem",
};

function ChartCard({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{title}</h3>
        <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem", marginBottom: 0 }}>{sub}</p>
      </div>
      {children}
    </div>
  );
}

export default function TrendSection() {
  return (
    <section style={{ marginTop: "2rem" }}>
      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: "1.5rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <div style={{ width: 3, height: 28, background: "linear-gradient(180deg,#1a3a5c,#c8a96e)" }} />
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
            Industry Trend Analysis
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: "0.2rem 0 0" }}>
            Startup growth trends, AI adoption metrics, funding insights and market forecasts
          </p>
        </div>
        <span style={{
          marginLeft: "auto",
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.2)",
          color: "#10B981",
          fontSize: "0.72rem", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "0.35rem 0.8rem",
        }}>
          ● Live — Q2 2026
        </span>
      </div>

      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <ChartCard
          title="Startup Growth & Funding"
          sub="Monthly new AI startups and investment ($B) — 2026"
        >
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 4, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false}
                  label={{ value: "Startups", angle: -90, position: "insideLeft", fill: "#d1d5db", fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false}
                  label={{ value: "Funding $B", angle: 90, position: "insideRight", fill: "#d1d5db", fontSize: 10 }} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#6b7280", paddingTop: 8 }} />
                <Line yAxisId="left" dataKey="startups" name="Startups" stroke="#1a3a5c" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#c8a96e", strokeWidth: 0 }} />
                <Line yAxisId="right" dataKey="funding" name="Funding $B" stroke="#c8a96e" strokeWidth={2.5} dot={false} strokeDasharray="5 3" activeDot={{ r: 4, fill: "#1a3a5c", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Enterprise AI Adoption Rate"
          sub="% of Fortune 1000 companies with active AI deployments"
        >
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 4, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adoptGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a3a5c" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#1a3a5c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#6b7280", paddingTop: 8 }} />
                <Area type="monotone" dataKey="adoption" name="AI Adoption %" stroke="#1a3a5c" fill="url(#adoptGrad)" strokeWidth={2.5}
                  dot={{ fill: "#1a3a5c", r: 3, stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: "#c8a96e", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem" }}>
        <ChartCard
          title="AI Market Revenue Forecast"
          sub="Global AI market revenue ($B) — Actual vs Projected"
        >
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData} barGap={4} margin={{ top: 4, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="year" tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} unit="B" />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#6b7280", paddingTop: 8 }} />
                <ReferenceLine x="2026" stroke="#e5e7eb" strokeDasharray="4 3"
                  label={{ value: "Now", fill: "#9ca3af", fontSize: 10 }} />
                <Bar dataKey="actual" name="Actual Revenue" fill="#1a3a5c" radius={[2, 2, 0, 0]} />
                <Bar dataKey="forecast" name="Forecast" fill="#c8a96e" radius={[2, 2, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="AI Adoption by Sector"
          sub="Active deployment rate (%) per industry vertical"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {sectorData.map((s) => (
              <div key={s.sector}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: "#374151", fontSize: 13, fontWeight: 600 }}>{s.sector}</span>
                  <span style={{ color: s.color, fontWeight: 800, fontSize: 13 }}>{s.adoption}%</span>
                </div>
                <div style={{ background: "#f3f4f6", height: 5, overflow: "hidden" }}>
                  <div style={{
                    width: `${s.adoption}%`, height: "100%",
                    background: `linear-gradient(90deg,${s.color},${s.color}99)`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
