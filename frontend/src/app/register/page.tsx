"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Building, Mail, Lock, Bot, ArrowRight, Phone,
  BadgeCheck, Briefcase, Globe, ChevronDown, CheckCircle2,
  Building2, Hash, Shield, Eye, EyeOff, ArrowLeft, Check
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const industries = [
  "Finance & Banking", "Healthcare & Pharma", "Technology & Software",
  "Manufacturing", "Retail & E-Commerce", "Energy & Utilities",
  "Consulting & Professional Services", "Education", "Logistics & Supply Chain",
  "Government & Public Sector", "Real Estate", "Media & Entertainment", "Other"
];

const companySizes = [
  { label: "1–10 employees", value: "micro" },
  { label: "11–50 employees", value: "small" },
  { label: "51–200 employees", value: "medium" },
  { label: "201–1,000 employees", value: "large" },
  { label: "1,001–5,000 employees", value: "enterprise" },
  { label: "5,000+ employees", value: "global" },
];

const jobTitles = [
  "C-Suite / Executive", "VP / Director", "Manager / Team Lead",
  "Senior Analyst / Strategist", "Data Scientist / AI Engineer",
  "Business Analyst", "IT / Technology Lead", "Operations", "Consultant", "Other"
];

const regions = [
  "North America", "Europe", "Asia Pacific", "Middle East & Africa",
  "Latin America", "South Asia", "Australia & New Zealand"
];

// ─── Step Config ──────────────────────────────────────────────────────────────
const steps = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Organization", icon: Building2 },
  { id: 3, label: "Security", icon: Lock },
  { id: 4, label: "Verification", icon: BadgeCheck },
];

// ─── Reusable Input ───────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e7eb] focus:border-[#1a3a5c]/50 rounded-xl text-[#111827] text-sm placeholder-[#9ca3af] outline-none transition-all focus:ring-2 focus:ring-[#1a3a5c]/10 font-medium";
const selectCls = "w-full pl-10 pr-8 py-3 bg-[#f9fafb] border border-[#e5e7eb] focus:border-[#1a3a5c]/50 rounded-xl text-[#111827] text-sm outline-none transition-all focus:ring-2 focus:ring-[#1a3a5c]/10 font-medium appearance-none";

// ─── Password rules ───────────────────────────────────────────────────────────
const pwRules = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Number", test: (p: string) => /[0-9]/.test(p) },
  { label: "Special char", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

// ─── OTP Box ──────────────────────────────────────────────────────────────────
function OTPInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const digits = value.padEnd(6, "").split("").slice(0, 6);
  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={d === " " ? "" : d}
          onChange={e => {
            const next = value.split("");
            next[i] = e.target.value.slice(-1);
            onChange(next.join("").slice(0, 6));
            if (e.target.value && i < 5) {
              (e.target.nextSibling as HTMLInputElement)?.focus();
            }
          }}
          onKeyDown={e => {
            if (e.key === "Backspace" && !value[i] && i > 0) {
              (e.target as HTMLInputElement).previousSibling && ((e.target as HTMLInputElement).previousSibling as HTMLInputElement).focus();
            }
          }}
          className="w-11 h-12 text-center text-lg font-bold bg-bg-base/60 border border-border-premium focus:border-accent/60 rounded-xl text-text-primary outline-none transition-all focus:ring-2 focus:ring-accent/10"
        />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpSent, setOtpSent] = useState({ email: false, phone: false });

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    employeeId: "", jobTitle: "", linkedIn: "",
    org: "", industry: "", companySize: "", region: "", website: "",
    password: "", confirmPassword: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const pwPassed = pwRules.filter(r => r.test(form.password)).length;
  const pwStrengthColor = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"][Math.min(pwPassed - 1, 3)];

  const sendOTP = (type: "email" | "phone") => {
    setOtpSent(prev => ({ ...prev, [type]: true }));
  };

  const verifyOTP = (type: "email" | "phone") => {
    if (type === "email") setEmailVerified(true);
    else setPhoneVerified(true);
  };

  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    router.push("/dashboard");
  };

  const slide = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.25 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4 sm:p-6">
      {/* Background glow */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-2xl relative overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid #e5e7eb", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #1a3a5c, #2d5a8a, #c8a96e)" }} />

        <div className="p-8 sm:p-10">
          {/* Logo + Title */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a3a5c] to-[#2d5a8a] flex items-center justify-center shadow-[0_4px_12px_rgba(26,58,92,0.2)] shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight leading-none">Create Account</h1>
              <p className="text-xs text-[#6b7280] font-medium mt-0.5">Start assessing readiness and ROI in minutes</p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-0 mb-8">
            {steps.map((s, i) => {
              const done = step > s.id;
              const active = step === s.id;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${done ? "bg-[#10B981] border-[#10B981]" : active ? "bg-[#c8a96e]/15 border-[#c8a96e]" : "bg-[#f9fafb] border-[#e5e7eb]"}`}>
                      {done ? <Check size={14} className="text-white" strokeWidth={3} /> : <Icon size={13} className={active ? "text-[#c8a96e]" : "text-[#9ca3af]"} />}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wide hidden sm:block ${active ? "text-[#c8a96e]" : done ? "text-[#10B981]" : "text-[#9ca3af]"}`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-1 transition-all duration-300 ${step > s.id ? "bg-[#10B981]" : "bg-[#e5e7eb]"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Steps */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">

              {/* ─── STEP 1: Personal Info ─── */}
              {step === 1 && (
                <motion.div key="step1" {...slide} className="space-y-4">
                  <h2 className="text-base font-bold text-text-primary mb-1">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Jane" required value={form.firstName} onChange={set("firstName")} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Last Name">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Doe" required value={form.lastName} onChange={set("lastName")} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Employee ID / Staff No.">
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="EMP-00123" required value={form.employeeId} onChange={set("employeeId")} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Job Title / Designation">
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <select required value={form.jobTitle} onChange={set("jobTitle")} className={selectCls}>
                          <option value="">Select role…</option>
                          {jobTitles.map(j => <option key={j} value={j}>{j}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
                      </div>
                    </Field>
                    <Field label="Work Email">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="email" placeholder="you@company.com" required value={form.email} onChange={set("email")} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Phone Number">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="tel" placeholder="+1 (555) 000-0000" required value={form.phone} onChange={set("phone")} className={inputCls} />
                      </div>
                    </Field>
                  </div>
                  <Field label="LinkedIn Profile (optional)">
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedIn} onChange={set("linkedIn")} className={inputCls} />
                    </div>
                  </Field>
                </motion.div>
              )}

              {/* ─── STEP 2: Organization ─── */}
              {step === 2 && (
                <motion.div key="step2" {...slide} className="space-y-4">
                  <h2 className="text-base font-bold text-text-primary mb-1">Organization Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company / Organization Name">
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Acme Corporation" required value={form.org} onChange={set("org")} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Company Website (optional)">
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="url" placeholder="https://acmecorp.com" value={form.website} onChange={set("website")} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Industry Sector">
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <select required value={form.industry} onChange={set("industry")} className={selectCls}>
                          <option value="">Select industry…</option>
                          {industries.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
                      </div>
                    </Field>
                    <Field label="Company Size">
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <select required value={form.companySize} onChange={set("companySize")} className={selectCls}>
                          <option value="">Select size…</option>
                          {companySizes.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
                      </div>
                    </Field>
                    <Field label="Region / Headquarters">
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <select required value={form.region} onChange={set("region")} className={selectCls}>
                          <option value="">Select region…</option>
                          {regions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
                      </div>
                    </Field>
                  </div>
                  {/* AI Interest */}
                  <div>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Primary AI Interest</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["ROI Analysis", "Strategy Planning", "Risk Assessment", "Industry Benchmarking", "Readiness Score", "Forecasting"].map(tag => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border border-border-premium hover:border-accent/30 hover:bg-accent/5 transition-all">
                          <input type="checkbox" className="accent-accent w-3.5 h-3.5" />
                          <span className="text-xs text-text-secondary font-medium">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── STEP 3: Security ─── */}
              {step === 3 && (
                <motion.div key="step3" {...slide} className="space-y-4">
                  <h2 className="text-base font-bold text-text-primary mb-1">Account Security</h2>
                  <Field label="Password">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type={showPw ? "text" : "password"} placeholder="Create a strong password" required value={form.password} onChange={set("password")} className={`${inputCls} pr-10`} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-1">
                          {[0,1,2,3].map(i => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < pwPassed ? pwStrengthColor : "bg-border-premium"}`} />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {pwRules.map(r => {
                            const ok = r.test(form.password);
                            return (
                              <div key={r.label} className="flex items-center gap-1.5">
                                <div className={`w-3 h-3 rounded-full flex items-center justify-center ${ok ? "bg-success" : "border border-border-premium"}`}>
                                  {ok && <Check size={7} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className={`text-[10px] font-medium ${ok ? "text-success" : "text-text-muted"}`}>{r.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field label="Confirm Password">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type={showConfirm ? "text" : "password"} placeholder="Re-enter password" required value={form.confirmPassword} onChange={set("confirmPassword")} className={`${inputCls} pr-10`} />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
                        {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {form.confirmPassword && (
                      <p className={`text-[10px] mt-1 font-semibold ${form.password === form.confirmPassword ? "text-success" : "text-red-400"}`}>
                        {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                      </p>
                    )}
                  </Field>
                  {/* Security note */}
                  <div className="flex items-start gap-3 p-3.5 bg-accent/5 border border-accent/15 rounded-xl">
                    <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-text-muted leading-relaxed font-medium">
                      Your password is hashed using AES-256 encryption and never stored in plain text. We comply with GDPR, SOC 2, and ISO 27001 standards.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ─── STEP 4: Verification ─── */}
              {step === 4 && (
                <motion.div key="step4" {...slide} className="space-y-6">
                  <h2 className="text-base font-bold text-text-primary mb-1">Verify Your Identity</h2>
                  {/* Email OTP */}
                  <div className="p-5 border border-border-premium rounded-xl space-y-3 bg-bg-base/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold text-text-primary">Email Verification</span>
                      </div>
                      {emailVerified && <span className="flex items-center gap-1 text-xs font-bold text-success"><CheckCircle2 size={13} /> Verified</span>}
                    </div>
                    <p className="text-xs text-text-muted">{form.email || "your@email.com"}</p>
                    {!emailVerified && (
                      <>
                        {!otpSent.email ? (
                          <button type="button" onClick={() => sendOTP("email")}
                            className="text-xs font-bold text-accent hover:text-primary transition-colors border border-accent/30 hover:border-primary/50 px-4 py-2 rounded-lg">
                            Send Verification Code
                          </button>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-xs text-text-muted">Enter the 6-digit code sent to your email</p>
                            <OTPInput value={emailOTP} onChange={setEmailOTP} />
                            <button type="button" onClick={() => verifyOTP("email")}
                              disabled={emailOTP.length < 6}
                              className="w-full py-2 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/30 text-accent text-xs font-bold transition-all disabled:opacity-40">
                              Verify Email Code
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {/* Phone OTP */}
                  <div className="p-5 border border-border-premium rounded-xl space-y-3 bg-bg-base/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold text-text-primary">Phone Verification</span>
                      </div>
                      {phoneVerified && <span className="flex items-center gap-1 text-xs font-bold text-success"><CheckCircle2 size={13} /> Verified</span>}
                    </div>
                    <p className="text-xs text-text-muted">{form.phone || "+1 (555) 000-0000"}</p>
                    {!phoneVerified && (
                      <>
                        {!otpSent.phone ? (
                          <button type="button" onClick={() => sendOTP("phone")}
                            className="text-xs font-bold text-accent hover:text-primary transition-colors border border-accent/30 hover:border-primary/50 px-4 py-2 rounded-lg">
                            Send SMS Code
                          </button>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-xs text-text-muted">Enter the 6-digit code sent via SMS</p>
                            <OTPInput value={phoneOTP} onChange={setPhoneOTP} />
                            <button type="button" onClick={() => verifyOTP("phone")}
                              disabled={phoneOTP.length < 6}
                              className="w-full py-2 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/30 text-accent text-xs font-bold transition-all disabled:opacity-40">
                              Verify Phone Code
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {/* Summary */}
                  <div className="p-4 bg-bg-base/40 border border-border-premium rounded-xl text-xs text-text-muted space-y-1.5">
                    <p className="font-bold text-text-secondary uppercase tracking-wider text-[10px] mb-2">Account Summary</p>
                    {[
                      ["Name", `${form.firstName} ${form.lastName}`],
                      ["Employee ID", form.employeeId],
                      ["Role", form.jobTitle],
                      ["Organization", form.org],
                      ["Industry", form.industry],
                      ["Company Size", companySizes.find(s => s.value === form.companySize)?.label ?? "—"],
                      ["Region", form.region],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between">
                        <span className="text-text-muted font-medium">{k}</span>
                        <span className="text-text-secondary font-semibold">{v || "—"}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-7 pt-5 border-t border-[#e5e7eb]">
              {step > 1 ? (
                <button type="button" onClick={back}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#6b7280] hover:text-[#111827] transition-colors">
                  <ArrowLeft size={15} /> Back
                </button>
              ) : (
                <Link href="/login" className="text-xs text-[#6b7280] hover:text-[#374151] transition-colors font-medium">
                  Already have an account? <span className="text-[#1a3a5c] font-bold">Sign In</span>
                </Link>
              )}

              {step < 4 ? (
                <button type="button" onClick={next}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-7 py-2.5 font-bold text-white text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-6 bg-white/15" />
                  </div>
                  <span className="relative z-10">Continue</span>
                  <div className="relative z-10 flex items-center justify-center bg-[#c8a96e] rounded-full w-5 h-5 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={11} className="text-white" strokeWidth={3} />
                  </div>
                </button>
              ) : (
                <button type="submit" disabled={loading}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-7 py-2.5 font-bold text-white text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70">
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-6 bg-white/15" />
                  </div>
                  {loading ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account…
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      Create Account
                      <div className="flex items-center justify-center bg-[#c8a96e] rounded-full w-5 h-5 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={11} className="text-white" strokeWidth={3} />
                      </div>
                    </span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
