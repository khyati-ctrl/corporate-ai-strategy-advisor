"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  Building2,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  Briefcase,
  Layers
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface CompanyProfile {
  industry_sector: string;
  company_size: string;
  annual_revenue_usd: number;
  employee_count: number;
  country: string;
  is_startup: boolean;
  funding_stage: string;
}

interface ReadinessScores {
  data_score: number;
  talent_score: number;
  leadership_score: number;
  tech_stack_score: number;
  change_mgmt_score: number;
  data_quality_score: number;
}

interface AIInitiative {
  use_case: string;
  investment_budget_usd: number;
  timeline_months: number;
}

// ─── Score Slider ──────────────────────────────────────────────────────────────
function ScoreSlider({ label, description, value, onChange }: {
  label: string; description: string; value: number;
  onChange: (v: number) => void;
}) {
  const isHigh = value >= 7;
  const isMid = value >= 4 && value < 7;
  const barColor = isHigh ? "#10B981" : isMid ? "#fbbf24" : "#ef4444";
  const badgeColor = isHigh
    ? { color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" }
    : isMid
      ? { color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)" }
      : { color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" };

  return (
    <div style={{
      padding: "1.75rem",
      border: "1px solid #e5e7eb",
      background: "#fafafa",
      marginBottom: "1.25rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", gap: "1.25rem" }}>
        <div>
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827" }}>{label}</h4>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>{description}</p>
        </div>
        <div style={{
          minWidth: "56px", height: "56px",
          border: `1px solid ${badgeColor.border}`,
          background: badgeColor.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", fontWeight: 900, color: badgeColor.color,
          flexShrink: 0,
        }}>
          {value.toFixed(1)}
        </div>
      </div>
      <input
        type="range" min={0} max={10} step={0.5} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%", height: "5px", cursor: "pointer", outline: "none",
          WebkitAppearance: "none", appearance: "none",
          backgroundImage: `linear-gradient(90deg, ${barColor} ${value * 10}%, #e5e7eb ${value * 10}%)`,
          borderRadius: "2px",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        <span>0 — Not Ready</span>
        <span>5 — Average</span>
        <span>10 — Advanced</span>
      </div>
    </div>
  );
}

// ─── Step Progress ─────────────────────────────────────────────────────────────
function StepProgress({ currentStep }: { currentStep: number }) {
  const steps = ["Company Profile", "AI Readiness", "Initiative Setup"];
  return (
    <div className="flex items-center justify-center mb-6 md:mb-10 p-4 md:p-8 md:px-10 bg-white border border-gray-200">
      {steps.map((step, i) => {
        const num = i + 1;
        const isActive = num === currentStep;
        const isDone = num < currentStep;
        return (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: i === steps.length - 1 ? "flex-end" : "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: "44px", height: "44px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "0.9rem",
                background: isDone ? "#1a3a5c" : isActive ? "#c8a96e" : "#f3f4f6",
                color: isDone || isActive ? "#ffffff" : "#9ca3af",
                border: `2px solid ${isDone ? "#1a3a5c" : isActive ? "#c8a96e" : "#e5e7eb"}`,
                transition: "all 0.3s",
              }}>
                {isDone ? <Check size={18} /> : num}
              </div>
              <span style={{
                fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                color: isActive ? "#1a3a5c" : "#9ca3af", whiteSpace: "nowrap",
              }}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: "2px", margin: "0 1.25rem",
                background: isDone ? "#1a3a5c" : "#e5e7eb",
                marginBottom: "1.5rem",
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function NewAnalysisPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  const [company, setCompany] = useState<CompanyProfile>({
    industry_sector: "", company_size: "",
    annual_revenue_usd: 100, employee_count: 500, country: "",
    is_startup: false, funding_stage: "",
  });

  const [readiness, setReadiness] = useState<ReadinessScores>({
    data_score: 5, talent_score: 5, leadership_score: 5,
    tech_stack_score: 5, change_mgmt_score: 5, data_quality_score: 5,
  });

  const [initiative, setInitiative] = useState<AIInitiative>({
    use_case: "", investment_budget_usd: 500000, timeline_months: 12,
  });

  const readinessTotal = parseFloat((
    readiness.data_score * 0.25 +
    readiness.talent_score * 0.20 +
    readiness.leadership_score * 0.20 +
    readiness.tech_stack_score * 0.15 +
    readiness.change_mgmt_score * 0.10 +
    readiness.data_quality_score * 0.10
  ).toFixed(1)) * 10;

  const handleSubmit = async () => {
    setLoading(true);
    const messages = [
      "Structuring core company profile matrices...",
      "Calculating dimension-specific readiness index...",
      "Loading predictive ROI simulation model (10k Monte Carlo runs)...",
      "Running SHAP analysis to extract feature weights...",
      "Generating tailored strategic roadmap files...",
      "Compiling boardroom-ready report draft...",
    ];
    for (const msg of messages) {
      setLoadingMsg(msg);
      await new Promise(r => setTimeout(r, 800));
    }
    router.push("/analysis/demo-001");
  };

  const industries = ["Healthcare", "Financial Services", "Retail & E-Commerce", "Manufacturing", "Technology", "Education", "Logistics", "Energy", "Telecommunications"];
  const companySizes = ["SMB (< 200)", "Mid-Market (200-1,000)", "Enterprise (1,000-10,000)", "Large Enterprise (10,000+)"];
  const useCases = ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Fraud Detection", "Demand Forecasting", "Customer Churn Prediction", "Process Automation", "Recommendation Engine", "Predictive Maintenance", "Document Intelligence"];

  const inputStyle = {
    width: "100%", padding: "0.9rem 1.25rem", paddingLeft: "3rem",
    background: "#ffffff", border: "1px solid #d1d5db",
    fontSize: "0.95rem", color: "#111827", outline: "none",
    transition: "border-color 0.2s",
  };

  const selectStyle = {
    width: "100%", padding: "0.9rem 1.25rem", paddingLeft: "3rem",
    background: "#ffffff", border: "1px solid #d1d5db",
    fontSize: "0.95rem", color: "#111827", outline: "none", cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar title="New Analysis" subtitle="Complete the 3-step wizard to evaluate your AI initiative" />

        <div className="flex-1 p-4 md:p-10 overflow-y-auto">
          <div className="max-w-[900px] mx-auto">
            <StepProgress currentStep={step} />

            <AnimatePresence mode="wait">
              {loading ? (
                /* Loading state */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    background: "#ffffff", border: "1px solid #e5e7eb",
                    padding: "5rem 2.5rem", textAlign: "center",
                  }}
                >
                  <div style={{ width: "64px", height: "64px", background: "#1a3a5c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.75rem" }}>
                    <Loader2 size={32} color="white" className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                  </div>
                  <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#111827", marginBottom: "1rem" }}>
                    Processing AI Strategy Models
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#6b7280", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7, minHeight: "48px" }}>
                    {loadingMsg}
                  </p>
                  <div style={{ display: "flex", gap: "0.625rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
                    {["Sector Match", "Readiness Indexes", "ROI Projections", "SHAP Factors", "Recommendations"].map(s => (
                      <span key={s} style={{
                        padding: "0.45rem 1.1rem", background: "#f3f4f6", border: "1px solid #e5e7eb",
                        fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280",
                      }}>{s}</span>
                    ))}
                  </div>
                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-200 p-5 md:p-11"
                >
                  {/* Step 1: Company Profile */}
                  {step === 1 && (
                    <div>
                      <div style={{ marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid #f3f4f6" }}>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Company Profile
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.3rem" }}>
                          Provide general operational metadata about your firm.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Industry */}
                        <div>
                          <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Industry Sector *</label>
                          <div style={{ position: "relative" }}>
                            <Briefcase size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
                            <select value={company.industry_sector}
                              onChange={e => setCompany({ ...company, industry_sector: e.target.value })}
                              style={selectStyle}>
                              <option value="">Select industry...</option>
                              {industries.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                          </div>
                        </div>
                        {/* Country */}
                        <div>
                          <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Country / Region *</label>
                          <div style={{ position: "relative" }}>
                            <MapPin size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
                            <select value={company.country}
                              onChange={e => setCompany({ ...company, country: e.target.value })}
                              style={selectStyle}>
                              <option value="">Select region...</option>
                              {["United States", "United Kingdom", "Canada", "Germany", "France", "Australia", "India", "Singapore", "UAE"].map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Business Type (Startup or Established) */}
                      <div style={{ marginBottom: "1.5rem" }}>
                        <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Business Type *</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label style={{
                            display: "flex", alignItems: "center", gap: "1rem",
                            padding: "1.1rem 1.5rem",
                            border: `2px solid ${!company.is_startup ? "#1a3a5c" : "#e5e7eb"}`,
                            background: !company.is_startup ? "rgba(26,58,92,0.04)" : "#ffffff",
                            cursor: "pointer", transition: "all 0.2s",
                          }}>
                            <input type="radio" name="is_startup" checked={!company.is_startup}
                              onChange={() => setCompany({ ...company, is_startup: false })}
                              style={{ accentColor: "#1a3a5c" }} />
                            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: !company.is_startup ? "#1a3a5c" : "#374151" }}>Established Enterprise</span>
                          </label>

                          <label style={{
                            display: "flex", alignItems: "center", gap: "1rem",
                            padding: "1.1rem 1.5rem",
                            border: `2px solid ${company.is_startup ? "#1a3a5c" : "#e5e7eb"}`,
                            background: company.is_startup ? "rgba(26,58,92,0.04)" : "#ffffff",
                            cursor: "pointer", transition: "all 0.2s",
                          }}>
                            <input type="radio" name="is_startup" checked={company.is_startup}
                              onChange={() => setCompany({ ...company, is_startup: true })}
                              style={{ accentColor: "#1a3a5c" }} />
                            <span style={{ fontSize: "0.92rem", fontWeight: 600, color: company.is_startup ? "#1a3a5c" : "#374151" }}>Startup Business</span>
                          </label>
                        </div>
                      </div>

                      {/* Startup Funding Stage (Conditional) */}
                      {company.is_startup && (
                        <div className="grid grid-cols-1 gap-6 mb-6">
                          <div>
                            <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Funding Stage *</label>
                            <div style={{ position: "relative" }}>
                              <Briefcase size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
                              <select value={company.funding_stage}
                                onChange={e => setCompany({ ...company, funding_stage: e.target.value })}
                                style={selectStyle}>
                                <option value="">Select funding stage...</option>
                                {["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+"].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Company Size */}
                      <div style={{ marginBottom: "1.5rem" }}>
                        <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Company Size Scale *</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {companySizes.map(size => {
                            const isSelected = company.company_size === size;
                            return (
                              <label key={size} style={{
                                display: "flex", alignItems: "center", gap: "1rem",
                                padding: "1.1rem 1.5rem",
                                border: `2px solid ${isSelected ? "#1a3a5c" : "#e5e7eb"}`,
                                background: isSelected ? "rgba(26,58,92,0.04)" : "#ffffff",
                                cursor: "pointer", transition: "all 0.2s",
                              }}>
                                <input type="radio" name="company_size" checked={isSelected}
                                  onChange={() => setCompany({ ...company, company_size: size })}
                                  style={{ accentColor: "#1a3a5c" }} />
                                <span style={{ fontSize: "0.92rem", fontWeight: 600, color: isSelected ? "#1a3a5c" : "#374151" }}>{size}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Annual Revenue (USD Millions)</label>
                          <div style={{ position: "relative" }}>
                            <DollarSign size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)" }} />
                            <input type="number" value={company.annual_revenue_usd}
                              onChange={e => setCompany({ ...company, annual_revenue_usd: Number(e.target.value) })}
                              placeholder="e.g. 500" style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label className="form-label" style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Employee Count</label>
                          <div style={{ position: "relative" }}>
                            <Users size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)" }} />
                            <input type="number" value={company.employee_count}
                              onChange={e => setCompany({ ...company, employee_count: Number(e.target.value) })}
                              placeholder="e.g. 5000" style={inputStyle} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: AI Readiness */}
                  {step === 2 && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid #f3f4f6" }}>
                        <div>
                          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            AI Readiness Assessment
                          </h3>
                          <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.3rem" }}>
                            Rate parameters from 0 to 10 based on internal maturity.
                          </p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{
                            width: "72px", height: "72px", background: "#1a3a5c",
                            display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", flexShrink: 0,
                          }}>
                            <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#c8a96e", lineHeight: 1 }}>{readinessTotal.toFixed(0)}</span>
                            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>/100</span>
                          </div>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: "0.5rem" }}>Weighted</span>
                        </div>
                      </div>

                      <ScoreSlider label="Data Infrastructure" description="Reliability of data lakes, storage schemas, and pipelines" value={readiness.data_score} onChange={v => setReadiness({ ...readiness, data_score: v })} />
                      <ScoreSlider label="AI/ML Talent Resources" description="Data science staff, analytics capability, and hiring paths" value={readiness.talent_score} onChange={v => setReadiness({ ...readiness, talent_score: v })} />
                      <ScoreSlider label="Leadership & Strategy Alignment" description="Management roadmap focus, AI alignment, and execution priority" value={readiness.leadership_score} onChange={v => setReadiness({ ...readiness, leadership_score: v })} />
                      <ScoreSlider label="Technical Stack Capabilities" description="Compute networks, cloud providers, and development environments" value={readiness.tech_stack_score} onChange={v => setReadiness({ ...readiness, tech_stack_score: v })} />
                      <ScoreSlider label="Change Management Adaptability" description="Workforce capability to adjust, adopt, and integrate AI products" value={readiness.change_mgmt_score} onChange={v => setReadiness({ ...readiness, change_mgmt_score: v })} />
                      <ScoreSlider label="Input Data Quality" description="Reliability, completeness, noise, and governance of existing assets" value={readiness.data_quality_score} onChange={v => setReadiness({ ...readiness, data_quality_score: v })} />
                    </div>
                  )}

                  {/* Step 3: Initiative Setup */}
                  {step === 3 && (
                    <div>
                      <div style={{ marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid #f3f4f6" }}>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Initiative Setup
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.3rem" }}>
                          Outline the details of the AI use case you are evaluating.
                        </p>
                      </div>

                      {/* Use Case */}
                      <div style={{ marginBottom: "1.75rem" }}>
                        <label className="form-label">AI Use Case *</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {useCases.map(uc => {
                            const isSelected = initiative.use_case === uc;
                            return (
                              <label key={uc} style={{
                                display: "flex", alignItems: "center", gap: "0.875rem",
                                padding: "1rem 1.25rem",
                                border: `2px solid ${isSelected ? "#c8a96e" : "#e5e7eb"}`,
                                background: isSelected ? "rgba(200,169,110,0.06)" : "#ffffff",
                                cursor: "pointer", transition: "all 0.2s",
                              }}>
                                <input type="radio" name="usecase" checked={isSelected}
                                  onChange={() => setInitiative({ ...initiative, use_case: uc })}
                                  style={{ accentColor: "#c8a96e" }} />
                                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: isSelected ? "#111827" : "#374151" }}>{uc}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
                        <div>
                          <label className="form-label">Investment Budget (USD)</label>
                          <div style={{ position: "relative" }}>
                            <DollarSign size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)" }} />
                            <input type="number" value={initiative.investment_budget_usd}
                              onChange={e => setInitiative({ ...initiative, investment_budget_usd: Number(e.target.value) })}
                              placeholder="e.g. 2000000" style={inputStyle} />
                          </div>
                          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>Include software, coding costs, and personnel overhead.</p>
                        </div>
                        <div>
                          <label className="form-label">Implementation Timeline (months)</label>
                          <div style={{ position: "relative" }}>
                            <Calendar size={18} color="#9ca3af" style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)" }} />
                            <input type="number" value={initiative.timeline_months}
                              onChange={e => setInitiative({ ...initiative, timeline_months: Number(e.target.value) })}
                              min={1} max={120} style={inputStyle} />
                          </div>
                          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>Estimated duration from kick-off to core model deployment.</p>
                        </div>
                      </div>

                      {/* Summary */}
                      <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", padding: "1.75rem" }}>
                        <h4 style={{ fontSize: "0.78rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
                          <Layers size={15} /> Assessment Summary
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { label: "Industry Sector", value: company.industry_sector || "—" },
                            { label: "Business Type", value: company.is_startup ? `Startup (${company.funding_stage || "Any"})` : "Established" },
                            { label: "Use Case", value: initiative.use_case || "—" },
                            { label: "Readiness Index", value: `${readinessTotal.toFixed(1)}/100`, accent: true },
                            { label: "Budget Allocated", value: `$${initiative.investment_budget_usd.toLocaleString()}` },
                          ].map(({ label, value, accent }) => (
                            <div key={label}>
                              <span style={{ fontSize: "0.72rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, display: "block", marginBottom: "0.3rem" }}>{label}</span>
                              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: accent ? "#c8a96e" : "#111827" }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-100 w-full">
                    {step > 1 ? (
                      <button onClick={() => setStep(step - 1)}
                        className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-white border-2 border-gray-200 px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
                      >
                        <ArrowLeft size={16} className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="relative z-10 text-[0.75rem] sm:text-[0.8rem] tracking-[0.1em] uppercase">Back</span>
                      </button>
                    ) : <div className="hidden sm:block" />}

                    {step < 3 ? (
                      <button onClick={() => setStep(step + 1)}
                        className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(26,58,92,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(26,58,92,0.4)] hover:-translate-y-0.5"
                      >
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                          <div className="relative h-full w-8 bg-white/20" />
                        </div>
                        <span className="relative z-10 text-[0.75rem] sm:text-[0.8rem] tracking-[0.1em] uppercase">Next</span>
                        <div className="relative z-10 flex items-center justify-center bg-[#c8a96e] rounded-full w-5 h-5 sm:w-6 sm:h-6 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight size={14} className="text-white" strokeWidth={3} />
                        </div>
                      </button>
                    ) : (
                      <button onClick={handleSubmit}
                        className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#c8a96e] to-[#b8944f] px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(200,169,110,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(200,169,110,0.4)] hover:-translate-y-0.5"
                      >
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                          <div className="relative h-full w-8 bg-white/20" />
                        </div>
                        <span className="relative z-10 text-[0.85rem] sm:text-[0.85rem] tracking-[0.1em] uppercase">🚀 Compute Strategy Projections</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
