"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Building, Mail, Lock, Bot, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-base p-6 grid-bg">
      {/* Background radial glows */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[550px] h-[350px] bg-accent/8 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-lg p-10 sm:p-12 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-secondary to-primary" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Create Account</h1>
          <p className="text-base text-text-muted mt-1 font-medium">Start assessing readiness and ROI in minutes</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3.5 bg-bg-base/60 border border-border-premium focus:border-accent/50 rounded-xl text-text-primary text-sm placeholder-text-muted/60 outline-none transition-all focus:ring-4 focus:ring-accent/10 font-medium"
                />
              </div>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">
                Organization
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                  <Building className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  required
                  value={form.org}
                  onChange={e => setForm({ ...form, org: e.target.value })}
                  className="w-full pl-10 pr-4 py-3.5 bg-bg-base/60 border border-border-premium focus:border-accent/50 rounded-xl text-text-primary text-sm placeholder-text-muted/60 outline-none transition-all focus:ring-4 focus:ring-accent/10 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3.5 bg-bg-base/60 border border-border-premium focus:border-accent/50 rounded-xl text-text-primary text-sm placeholder-text-muted/60 outline-none transition-all focus:ring-4 focus:ring-accent/10 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Min. 8 characters"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3.5 bg-bg-base/60 border border-border-premium focus:border-accent/50 rounded-xl text-text-primary text-sm placeholder-text-muted/60 outline-none transition-all focus:ring-4 focus:ring-accent/10 font-medium"
              />
            </div>
            {/* Criteria tracker */}
            <div className="mt-3.5 p-3.5 bg-white/[0.02] border border-border-premium rounded-lg space-y-1">
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Password Criteria:</p>
              <div className="grid grid-cols-2 gap-x-3.5 gap-y-1.5 text-xs text-text-secondary font-medium">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${form.password.length >= 8 ? "bg-success" : "bg-text-muted"}`} />
                  <span>At least 8 chars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(form.password) ? "bg-success" : "bg-text-muted"}`} />
                  <span>Includes a number</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(form.password) ? "bg-success" : "bg-text-muted"}`} />
                  <span>Includes uppercase</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${/[^A-Za-z0-9]/.test(form.password) ? "bg-success" : "bg-text-muted"}`} />
                  <span>Special character</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] py-3.5 sm:py-4 mt-4 font-bold text-white shadow-[0_4px_12px_rgba(26,58,92,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(26,58,92,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            {loading ? (
              <span className="relative z-10 flex items-center justify-center gap-2 text-[0.8rem] sm:text-[0.85rem] tracking-[0.1em] uppercase">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </span>
            ) : (
              <span className="relative z-10 flex items-center justify-center gap-1.5 text-[0.8rem] sm:text-[0.85rem] tracking-[0.1em] uppercase">
                Create Account 
                <div className="ml-1 flex items-center justify-center bg-[#c8a96e] rounded-full w-5 h-5 sm:w-6 sm:h-6 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} className="text-white" strokeWidth={3} />
                </div>
              </span>
            )}
          </button>
          <p className="text-xs text-text-muted text-center leading-relaxed mt-2.5 font-medium">
            By signing up, you agree to our Terms of Service and data encryption compliance policy.
          </p>
        </form>

        <p className="text-center text-xs text-text-muted mt-6 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:text-primary font-bold transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
