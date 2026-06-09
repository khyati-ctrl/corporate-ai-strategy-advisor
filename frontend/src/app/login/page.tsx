"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Bot, ShieldCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate validation
    if (!email.includes("@")) {
      setError("Please enter a valid business email address.");
      setLoading(false);
      return;
    }

    await new Promise(r => setTimeout(r, 1200));
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-base p-6 grid-bg">
      {/* Background radial glows */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-lg p-10 sm:p-12 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome Back</h1>
          <p className="text-base text-text-muted mt-1 font-medium">Sign in to your Corporate AI Advisor profile</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3.5 bg-bg-base/60 border border-border-premium focus:border-primary/50 rounded-xl text-text-primary text-sm placeholder-text-muted/60 outline-none transition-all focus:ring-4 focus:ring-primary/10 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-primary hover:text-accent font-semibold transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3.5 bg-bg-base/60 border border-border-premium focus:border-primary/50 rounded-xl text-text-primary text-sm placeholder-text-muted/60 outline-none transition-all focus:ring-4 focus:ring-primary/10 font-medium"
              />
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-2.5 p-3.5 bg-danger/10 border border-danger/20 rounded-xl text-danger text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-premium-primary py-3.5 text-sm uppercase tracking-wider font-bold cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                Sign In <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-y-1/2 left-0 right-0 h-[1px] bg-border-premium" />
          <span className="relative bg-bg-surface px-4 text-sm font-bold text-text-muted uppercase tracking-wider">
            Or
          </span>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button className="btn-premium-secondary py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer">
            Google
          </button>
          <button className="btn-premium-secondary py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer">
            Microsoft
          </button>
        </div>

        {/* Register Redirect */}
        <p className="text-center text-xs text-text-muted mt-8 font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:text-accent font-bold transition-colors">
            Sign up free
          </Link>
        </p>

        {/* Demo Fast-Pass */}
        <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/15 flex flex-col items-center gap-2.5 text-center">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Demo Mode</span>
          </div>
          <p className="text-[11px] text-text-muted font-medium leading-relaxed">
            By-pass user setup constraints and inspect pre-populated strategy metrics immediately.
          </p>
          <button 
            onClick={() => router.push("/dashboard")} 
            className="w-full py-3 bg-accent/10 hover:bg-accent/25 text-accent text-sm font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-accent/20"
          >
            Skip Authentication →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
