"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  LayoutGrid,
  List,
  Activity,
  Briefcase,
  PieChart
} from "lucide-react";

const allAnalyses = [
  { id: "demo-001", date: "Jun 7, 2026", industry: "Healthcare", useCase: "Predictive Analytics", roi: 142.5, readiness: 68.3, investment: "$2,000,000", status: "complete" },
  { id: "demo-002", date: "May 20, 2026", industry: "Financial Services", useCase: "Fraud Detection", roi: 198.3, readiness: 79.1, investment: "$5,000,000", status: "complete" },
  { id: "demo-003", date: "Apr 15, 2026", industry: "Retail & E-Commerce", useCase: "Demand Forecasting", roi: 89.7, readiness: 55.4, investment: "$800,000", status: "complete" },
  { id: "demo-004", date: "Mar 2, 2026", industry: "Manufacturing", useCase: "Predictive Maintenance", roi: 78.1, readiness: 49.0, investment: "$1,200,000", status: "complete" },
  { id: "demo-005", date: "Feb 14, 2026", industry: "Technology", useCase: "NLP / Chatbot", roi: 211.0, readiness: 84.5, investment: "$600,000", status: "complete" },
  { id: "demo-006", date: "Jan 28, 2026", industry: "Healthcare", useCase: "Computer Vision", roi: 163.4, readiness: 72.0, investment: "$3,500,000", status: "complete" },
];

function MetricPill({ icon: Icon, label, value, subtext, accent }: {
  icon: React.ElementType; label: string; value: string; subtext?: string; accent: string;
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
      {subtext && (
        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#9ca3af" }}>
          {subtext}
        </span>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const pageSize = 6;

  const industries = ["All", ...Array.from(new Set(allAnalyses.map(a => a.industry)))];

  const filtered = allAnalyses.filter(a =>
    (industryFilter === "All" || a.industry === industryFilter) &&
    (search === "" || a.industry.toLowerCase().includes(search.toLowerCase()) || a.useCase.toLowerCase().includes(search.toLowerCase()))
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        if (prev.length < 2) return [...prev, id];
        return [prev[1], id];
      }
    });
  };

  const getAnalysisById = (id: string) => allAnalyses.find(a => a.id === id);
  const comparisonItems = selected.map(id => getAnalysisById(id)).filter(Boolean);

  // Summary Stats
  const avgRoi = (allAnalyses.reduce((acc, curr) => acc + curr.roi, 0) / allAnalyses.length).toFixed(1);
  const avgReadiness = (allAnalyses.reduce((acc, curr) => acc + curr.readiness, 0) / allAnalyses.length).toFixed(1);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar
          title="Analysis History"
          subtitle={`${allAnalyses.length} total strategy runs compiled — explore or select two to compare`}
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5">
          
          {/* ── Summary Stats ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricPill icon={Briefcase}  label="Total Analyses"    value={`${allAnalyses.length}`}  accent="#1a3a5c" />
            <MetricPill icon={TrendingUp} label="Avg Projected ROI" value={`${avgRoi}%`} accent="#10B981" />
            <MetricPill icon={Activity}   label="Avg Readiness"     value={`${avgReadiness}`} subtext="/100" accent="#c8a96e" />
            <MetricPill icon={PieChart}   label="Top Industry"      value="Healthcare" accent="#f59e0b" />
          </div>

          {/* ── Filters & Controls ──────────────────────────────────────────────── */}
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "0.75rem 1rem" }} className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-80">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search use cases..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ paddingLeft: "2.5rem" }}
                  className="w-full pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-primary/50 focus:bg-white rounded-xl text-sm text-gray-800 outline-none transition-all placeholder-gray-400 font-semibold"
                />
              </div>

              <div className="relative w-full sm:w-56">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <Filter className="w-4 h-4" />
                </span>
                <select
                  value={industryFilter}
                  onChange={e => { setIndustryFilter(e.target.value); setPage(1); }}
                  style={{ paddingLeft: "2.5rem" }}
                  className="w-full pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-primary/50 focus:bg-white rounded-xl text-sm text-gray-800 outline-none transition-all font-semibold appearance-none cursor-pointer"
                >
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              {(search || industryFilter !== "All") && (
                <button 
                  onClick={() => { setSearch(""); setIndustryFilter("All"); setPage(1); }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-bold shrink-0 hidden sm:block">
                Showing {paginated.length} of {filtered.length} runs
              </span>
              <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                    viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                    viewMode === "list" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"
                  }`}
                  aria-label="List View"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Content Area ────────────────────────────────────────────────────── */}
          {paginated.length === 0 ? (
            <div className="py-20 text-center text-gray-400 space-y-4">
              <Search className="w-12 h-12 mx-auto opacity-30" />
              <p className="font-bold text-lg text-gray-500">No analysis reports match your criteria.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
              {paginated.map((a) => {
                const isSelected = selected.includes(a.id);
                const isHigh = a.readiness >= 70;
                const isMid = a.readiness >= 50 && a.readiness < 70;
                const progressColor = isHigh ? "bg-success" : isMid ? "bg-warning" : "bg-danger";
                const scoreColor = isHigh ? "text-success" : isMid ? "text-warning" : "text-danger";

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={a.id} 
                    className={`bg-white border transition-all ${
                      isSelected ? "border-[#1a3a5c] shadow-[0_0_0_2px_rgba(26,58,92,0.2)]" : "border-[#e5e7eb] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-[#d1d5db]"
                    }`}
                  >
                    <div style={{ padding: "1rem 1.25rem" }}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase bg-gray-100 text-gray-600 tracking-wider">
                          {a.industry}
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(a.id)}
                            className="w-4 h-4 accent-[#1a3a5c] rounded cursor-pointer transition-all border-gray-300"
                          />
                        </label>
                      </div>

                      <h3 className="text-[1.05rem] font-black text-gray-900 mb-1.5 truncate" title={a.useCase}>{a.useCase}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mb-4">
                        <Calendar size={13} /> {a.date}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#f9fafb] p-2.5 border border-[#e5e7eb]">
                          <div className="text-[0.65rem] font-bold text-[#9ca3af] uppercase tracking-wider mb-0.5">Proj. ROI</div>
                          <div className="text-[1.1rem] font-black" style={{ color: "#10B981" }}>{a.roi}%</div>
                        </div>
                        <div className="bg-[#f9fafb] p-2.5 border border-[#e5e7eb]">
                          <div className="text-[0.65rem] font-bold text-[#9ca3af] uppercase tracking-wider mb-0.5">Investment</div>
                          <div className="text-[1rem] font-black text-[#111827]">{a.investment}</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-4">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-gray-600">Readiness Score</span>
                          <span className={scoreColor}>{a.readiness}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div style={{ width: `${a.readiness}%` }} className={`h-full rounded-full ${progressColor}`} />
                        </div>
                      </div>

                      <Link 
                        href={`/analysis/${a.id}`} 
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] py-2 mt-2 font-bold text-white shadow-[0_2px_8px_rgba(26,58,92,0.2)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(26,58,92,0.3)]"
                      >
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                          <div className="relative h-full w-8 bg-white/20" />
                        </div>
                        <span className="relative z-10 text-[0.7rem] tracking-[0.1em] uppercase">Inspect Report</span>
                        <ArrowUpRight size={13} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-[#e5e7eb] overflow-hidden mb-10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-4 px-6 w-12 text-center">Compare</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Industry Sector</th>
                      <th className="py-4 px-6">AI Use Case</th>
                      <th className="py-4 px-6">Investment</th>
                      <th className="py-4 px-6">Predicted ROI</th>
                      <th className="py-4 px-6">Readiness Score</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginated.map((a) => {
                      const isSelected = selected.includes(a.id);
                      const isHigh = a.readiness >= 70;
                      const isMid = a.readiness >= 50 && a.readiness < 70;
                      const progressColor = isHigh ? "bg-success" : isMid ? "bg-warning" : "bg-danger";
                      const scoreColor = isHigh ? "text-success" : isMid ? "text-warning" : "text-danger";

                      return (
                        <tr key={a.id} className={`hover:bg-gray-50 transition-colors group text-sm font-medium ${isSelected ? "bg-primary/5" : ""}`}>
                          <td className="py-4 px-6 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelect(a.id)}
                              className="w-5 h-5 accent-primary rounded cursor-pointer transition-all border-gray-300"
                            />
                          </td>
                          <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                            <div className="flex items-center gap-2 font-semibold">
                              <Calendar className="w-4 h-4" /> {a.date}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-900 font-bold">{a.industry}</td>
                          <td className="py-4 px-6 text-gray-600">{a.useCase}</td>
                          <td className="py-4 px-6 text-gray-600 font-bold">{a.investment}</td>
                          <td className="py-4 px-6 font-black text-success text-base">{a.roi}%</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden shrink-0">
                                <div style={{ width: `${a.readiness}%` }} className={`h-full rounded-full ${progressColor}`} />
                              </div>
                              <span className={`font-bold ${scoreColor}`}>{a.readiness.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Link 
                              href={`/analysis/${a.id}`} 
                              className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-4 py-2 font-bold text-white shadow-[0_2px_8px_rgba(26,58,92,0.2)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(26,58,92,0.3)] hover:-translate-y-0.5 text-[0.7rem] uppercase tracking-wider"
                              style={{ textDecoration: "none" }}
                            >
                              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                <div className="relative h-full w-4 bg-white/20" />
                              </div>
                              <span className="relative z-10">Inspect</span>
                              <ArrowUpRight size={12} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Pagination ──────────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-10">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-xl bg-white text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <ChevronLeft size={18} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button 
                  key={p} 
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 font-bold text-sm rounded-xl transition-all cursor-pointer ${
                    p === page 
                      ? "bg-[#1a3a5c] text-white shadow-md shadow-primary/20" 
                      : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900 shadow-sm"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                className="p-2 border border-gray-200 rounded-xl bg-white text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ── Comparative Drawer ─────────────────────────────────── */}
        <AnimatePresence>
          {comparisonItems.length === 2 && (
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 py-8 md:px-12 flex flex-col gap-6 max-w-[1400px] mx-auto rounded-t-3xl"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">Comparative Analytics Panel</h3>
                </div>
                <button 
                  onClick={() => setSelected([])} 
                  className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 items-center py-2 text-sm font-semibold">
                <div className="space-y-5 text-gray-400 uppercase text-xs font-black">
                  <div className="h-10 flex items-center">Use Case</div>
                  <div className="h-10 flex items-center">Industry Sector</div>
                  <div className="h-10 flex items-center border-t border-gray-100 pt-4">Allocated Investment</div>
                  <div className="h-10 flex items-center border-t border-gray-100 pt-4">Predicted ROI</div>
                  <div className="h-10 flex items-center border-t border-gray-100 pt-4">Readiness Index</div>
                  <div className="h-10 flex items-center border-t border-gray-100 pt-4">Report Details</div>
                </div>

                <div className="space-y-5 text-gray-900 border-l border-gray-100 pl-6">
                  <div className="h-10 flex items-center font-bold truncate text-base">{comparisonItems[0]?.useCase}</div>
                  <div className="h-10 flex items-center text-gray-500 truncate">{comparisonItems[0]?.industry}</div>
                  <div className="h-10 flex items-center text-gray-800 font-bold border-t border-gray-100 pt-4">{comparisonItems[0]?.investment}</div>
                  <div className="h-10 flex items-center text-success font-black text-lg border-t border-gray-100 pt-4">{comparisonItems[0]?.roi}%</div>
                  <div className="h-10 flex items-center font-black border-t border-gray-100 pt-4 text-[#1a3a5c]">{comparisonItems[0]?.readiness?.toFixed(1)}/100</div>
                  <div className="h-10 flex items-center border-t border-gray-100 pt-4">
                    <Link href={`/analysis/${comparisonItems[0]?.id}`} className="text-[#1a3a5c] hover:text-[#c8a96e] font-bold flex items-center gap-1">
                      Inspect Report <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-5 text-gray-900 border-l border-gray-100 pl-6">
                  <div className="h-10 flex items-center font-bold truncate text-base">{comparisonItems[1]?.useCase}</div>
                  <div className="h-10 flex items-center text-gray-500 truncate">{comparisonItems[1]?.industry}</div>
                  <div className="h-10 flex items-center text-gray-800 font-bold border-t border-gray-100 pt-4">{comparisonItems[1]?.investment}</div>
                  <div className="h-10 flex items-center text-success font-black text-lg border-t border-gray-100 pt-4">{comparisonItems[1]?.roi}%</div>
                  <div className="h-10 flex items-center font-black border-t border-gray-100 pt-4 text-[#1a3a5c]">{comparisonItems[1]?.readiness?.toFixed(1)}/100</div>
                  <div className="h-10 flex items-center border-t border-gray-100 pt-4">
                    <Link href={`/analysis/${comparisonItems[1]?.id}`} className="text-[#1a3a5c] hover:text-[#c8a96e] font-bold flex items-center gap-1">
                      Inspect Report <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
