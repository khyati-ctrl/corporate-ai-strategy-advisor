"use client";

import Link from "next/link";
import Sidebar from "@frontend/components/Sidebar";
import TopBar from "@frontend/components/TopBar";
import { useEffect, useState } from "react";
import {
  TrendingUp, Gauge, FileText, Plus, ArrowUpRight,
  Brain, Zap, ChevronRight, Target, Clock, Rocket
} from "lucide-react";
import { ThemeToggle } from "@frontend/components/ThemeToggle";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function MetricPill({ icon: Icon, label, value, change, up, accent }: {
  icon: React.ElementType; label: string; value: string; change: string; up: boolean; accent: string;
}) {
  return (
    <div className="bg-card text-card-foreground border border-border transition-shadow hover:shadow-md" style={{ borderTop: `2px solid ${accent}`, padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
      <div style={{ width: "34px", height: "34px", background: `${accent}12`, border: `1px solid ${accent}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "8px" }}>
        <Icon size={15} color={accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.15rem" }}>{label}</p>
        <p style={{ fontSize: "1.3rem", fontWeight: 900, fontFamily: "var(--font-display)", lineHeight: 1 }}>{value}</p>
      </div>
      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: up ? "#10B981" : "#ef4444", background: up ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", padding: "0.2rem 0.55rem", whiteSpace: "nowrap", borderRadius: "4px" }}>
        {up ? "↑" : "↓"} {change}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [anRes, repRes] = await Promise.all([
          fetch('/api/analysis'),
          fetch('/api/reports')
        ]);
        if (anRes.ok) setAnalyses(await anRes.json());
        if (repRes.ok) setReports(await repRes.json());
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <TopBar
          title="Dashboard"
          subtitle="Your AI strategy overview and key performance indicators."
          actions={
            <div className="flex items-center gap-3">
              <Link href="/analysis/new" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-semibold transition-colors">
                <Plus size={16} /> New Analysis
              </Link>
            </div>
          }
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricPill icon={Gauge}      label="AI Readiness Score" value={analyses.length > 0 ? (analyses[0].readinessScore || 82).toString() : "0"} change="4.6%" up={true}  accent="#10B981" />
            <MetricPill icon={TrendingUp} label="ROI Forecast"       value={analyses.length > 0 ? `${analyses[0].roiForecast || 142.5}%` : "0%"} change="18%"  up={true}  accent="#1a3a5c" />
            <MetricPill icon={Target}     label="Cost Reduction"     value={analyses.length > 0 ? `${analyses[0].costReduction || 28}%` : "0%"} change="5%"   up={true}  accent="#c8a96e" />
            <MetricPill icon={Brain}      label="AI Maturity Level"  value={analyses.length > 0 ? (analyses[0].maturityLevel || "Intermediate") : "N/A"} change="Level Up" up={true} accent="#8b5cf6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Section - spans 3 columns above table */}
            <div className="lg:col-span-3 bg-card border border-border rounded-lg p-5">
              <h2 className="text-lg font-bold mb-4">Readiness vs ROI Forecast</h2>
              <div className="h-72 w-full">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Loading chart data...</div>
                ) : analyses.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No data available. Add an analysis to see insights.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[...analyses].reverse().slice(-10)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                      <XAxis dataKey="companyName" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                        itemStyle={{ fontWeight: 600, fontSize: 12 }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: "10px" }} />
                      <Bar dataKey="readinessScore" name="Readiness Score (/100)" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="roiForecast" name="ROI Forecast (%)" fill="#1a3a5c" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Recent Analyses Table */}
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Analyses</h2>
                <Link href="/history" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight size={14} />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                      <th className="pb-3 font-semibold">Company</th>
                      <th className="pb-3 font-semibold">Industry</th>
                      <th className="pb-3 font-semibold">Readiness</th>
                      <th className="pb-3 font-semibold">ROI</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={6} className="py-4 text-center text-muted-foreground text-sm">Loading...</td></tr>
                    ) : analyses.length === 0 ? (
                      <tr><td colSpan={6} className="py-4 text-center text-muted-foreground text-sm">No analyses found.</td></tr>
                    ) : (
                      analyses.slice(0, 5).map((a, i) => (
                        <tr key={i} className="border-b border-border last:border-0 text-sm">
                          <td className="py-3 font-medium">{a.companyName || "Acme Corp"}</td>
                          <td className="py-3 text-muted-foreground">{a.industry || "Healthcare"}</td>
                          <td className="py-3 text-success font-semibold">{a.readinessScore || 82}/100</td>
                          <td className="py-3 text-success font-semibold">{a.roiForecast || 142}%</td>
                          <td className="py-3 text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 text-right">
                            <Link href={`/analysis/${a.id}`} className="text-primary hover:text-primary/80 font-semibold">View</Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Recent Reports */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-5">
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/analysis/new" className="flex flex-col items-center justify-center gap-2 p-4 bg-muted hover:bg-accent rounded-md transition-colors text-center">
                    <Rocket className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold text-foreground">New Assessment</span>
                  </Link>
                  <Link href="/recommendations" className="flex flex-col items-center justify-center gap-2 p-4 bg-muted hover:bg-accent rounded-md transition-colors text-center">
                    <Target className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold text-foreground">Get Strategy</span>
                  </Link>
                  <Link href="/reports" className="flex flex-col items-center justify-center gap-2 p-4 bg-muted hover:bg-accent rounded-md transition-colors text-center">
                    <FileText className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold text-foreground">View Reports</span>
                  </Link>
                  <Link href="/history" className="flex flex-col items-center justify-center gap-2 p-4 bg-muted hover:bg-accent rounded-md transition-colors text-center">
                    <Clock className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold text-foreground">History Log</span>
                  </Link>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" /> Recent Reports
                </h2>
                <div className="space-y-4">
                  {loading ? (
                    <p className="text-sm text-muted-foreground text-center py-2">Loading...</p>
                  ) : reports.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">No reports generated yet.</p>
                  ) : (
                    reports.slice(0, 3).map((r, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="min-w-0 flex-1 pr-4">
                          <p className="text-sm font-bold truncate">{r.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Link href="/reports" className="shrink-0 p-2 bg-muted hover:bg-accent text-foreground rounded-full transition-colors">
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
