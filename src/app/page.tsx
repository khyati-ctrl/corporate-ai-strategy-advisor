"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingUp,
  Brain,
  LineChart,
  FileCheck,
  Gauge,
  FolderOpen,
  Bot,
  ChevronRight,
  Globe,
  Share2,
  Rss,
  Mail,
  Phone,
  MapPin,
  BarChart3,
  Target,
  ShieldCheck,
  Layers
} from "lucide-react";

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count.toLocaleString()}{suffix}</>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`corp-nav ${scrolled ? "scrolled" : ""}`}>


      {/* Main Nav */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 md:py-5.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#c8a96e] to-[#e8d09e] shadow-[0_4px_15px_rgba(200,169,110,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-[#0a0f1e]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-[0.1rem]">
            <div className={`text-[14px] md:text-lg font-extrabold tracking-tight leading-none transition-colors ${scrolled ? "text-[#0a0f1e]" : "text-white"}`}>
              Corporate <span className="text-[#c8a96e]">AI</span>
            </div>
            <div className={`text-[7px] md:text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${scrolled ? "text-gray-500" : "text-white/60"}`}>
              Strategy Advisor
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Contact", href: "#contact" },
          ].map(item => (
            <a key={item.label} href={item.href}
              className={`corp-nav-link ${scrolled ? "scrolled" : ""}`}>
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <Link href="/login"
            className={`text-[9px] md:text-xs font-bold uppercase tracking-wider transition-colors ${scrolled ? "text-[#374151] hover:text-[#1a3a5c]" : "text-white/80 hover:text-white"}`}>
            Sign In
          </Link>
          <Link href="/register" className="btn-corp-primary text-[8px] md:text-xs !px-2.5 !py-1.5 md:!px-7 md:!py-3.5">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [started, setStarted] = useState(false);
  useEffect(() => setStarted(true), []);

  return (
    <section className="corp-hero" style={{ minHeight: "92vh" }}>
      <div className="corp-hero-bg" style={{ backgroundImage: "url('/hero_bg.png')" }} />
      <div className="corp-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-32 md:pt-44 pb-56 md:pb-32 w-full">
        <div className="max-w-2xl">
          {started && (
            <>
              <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 border border-[#c8a96e]/40 bg-[#c8a96e]/10 mb-4 md:mb-6 animate-fadeInUp max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] shrink-0" />
                <span className="text-[#c8a96e] text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] leading-tight truncate">Enterprise AI Strategy Platform</span>
              </div>

              <h1 className="animate-fadeInUp animate-delay-100"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5.5vw,5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.15, marginBottom: "1.75rem" }}>
                Predict AI ROI<br />
                <span style={{ color: "#c8a96e" }}>Before You Invest</span>
              </h1>

              <p className="animate-fadeInUp animate-delay-200"
                style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.7, marginBottom: "3.5rem", maxWidth: "600px" }}>
                Data-driven AI adoption strategies for your enterprise. Assess organizational readiness,
                run predictive ROI projections, and get boardroom-ready reports — powered by ML.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animate-delay-300">
                <Link href="/register" className="btn-corp-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                  Start Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dashboard" className="btn-corp-outline flex items-center justify-center gap-2 w-full sm:w-auto">
                  Explore Dashboard <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white shadow-2xl">
            {[
              { value: 2400, suffix: "+", label: "Strategy Reports" },
              { value: 142, suffix: "%", label: "Average ROI Predicted" },
              { value: 94, suffix: "%", label: "Model Accuracy" },
              { value: 50, suffix: "+", label: "Industries Covered" },
            ].map((stat, i) => (
              <div key={i} className={`py-4 md:py-8 px-2 md:px-8 text-center border-gray-100 md:border-b-0 ${i % 2 === 0 ? 'border-r' : ''} md:border-r md:last:border-r-0 ${i < 2 ? 'border-b' : ''}`}>
                <div className="text-[1.8rem] md:text-[2.5rem] font-black text-[#1a3a5c] leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[0.65rem] md:text-[0.8rem] font-bold text-[#6b7280] uppercase tracking-[0.1em] mt-1 md:mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Row ─────────────────────────────────────────────────────────────
function ServicesRow() {
  const [active, setActive] = useState(2);
  const services = [
    { id: 0, icon: LineChart, label: "ROI Projections", sub: "Monte Carlo Simulation" },
    { id: 1, icon: Gauge, label: "AI Readiness Score", sub: "6-Dimension Analysis" },
    { id: 2, icon: Brain, label: "LLM Insights", sub: "Executive Reports" },
    { id: 3, icon: Target, label: "Strategic Roadmap", sub: "Prioritized Actions" },
    { id: 4, icon: FileCheck, label: "SHAP Explainability", sub: "Feature Attribution" },
  ];

  return (
    <section className="py-24 bg-[#f9fafb]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-gray-200">
          {services.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`service-card border-r border-gray-200 last:border-r-0 ${isActive ? "active" : ""}`}
              >
                <div className={`w-12 h-12 flex items-center justify-center mx-auto mb-4 ${isActive ? "bg-white/10" : "bg-[#1a3a5c]/8"}`}>
                  <Icon className={`w-6 h-6 ${isActive ? "text-[#c8a96e]" : "text-[#1a3a5c]"}`} />
                </div>
                <div className={`text-base font-bold mb-2 ${isActive ? "text-white" : "text-[#111827]"}`}>{s.label}</div>
                <div className={`text-xs font-medium ${isActive ? "text-white/60" : "text-[#6b7280]"}`}>{s.sub}</div>
                {isActive && (
                  <div className="mt-4 w-6 h-6 rounded-full bg-[#c8a96e] flex items-center justify-center mx-auto">
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
  const [tab, setTab] = useState(0);
  const tabs = ["In-Depth Analysis", "Excellence & Leadership", "Competitive Pricing"];
  const content = [
    {
      title: "Unparalleled Depth of Analysis",
      text: "Our platform processes thousands of corporate profiles across 50+ industries to deliver hyper-accurate ROI predictions. Every analysis leverages 6-dimensional readiness scoring, SHAP feature attribution, and Monte Carlo simulation for unprecedented accuracy.",
      points: ["6-Dimension Readiness Index", "Monte Carlo ROI Simulation", "Industry Benchmark Comparison", "SHAP Factor Attribution"]
    },
    {
      title: "Industry-Leading AI Leadership",
      text: "Built by enterprise strategists and ML engineers with decades of combined experience, our platform delivers boardroom-ready insights that drive confident AI adoption decisions across Fortune 500 companies and mid-market enterprises alike.",
      points: ["10+ Years Domain Experience", "Fortune 500 Client Base", "Research-Backed Methodology", "Continuous Model Improvement"]
    },
    {
      title: "Transparent & Competitive Pricing",
      text: "No hidden fees, no lock-in. Our flexible pricing tiers scale with your organization — from individual analysts to enterprise-wide deployments. Start free, upgrade when ready, with full access to all core features from day one.",
      points: ["Start Free — No Credit Card", "Flexible Enterprise Plans", "No Long-Term Commitments", "Full Feature Access"]
    }
  ];
  const current = content[tab];

  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Why Work With Us</span>
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="corp-divider mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-12 gap-0 flex-wrap">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              className={`tab-btn ${tab === i ? "active" : ""}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="/team_meeting.png"
              alt="Team collaboration"
              style={{ width: "100%", height: "440px", objectFit: "cover" }}
            />
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>
              {current.title}
            </h3>
            <div className="corp-divider" />
            <p style={{ color: "#6b7280", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2rem" }}>
              {current.text}
            </p>
            <ul className="space-y-4 mb-10">
              {current.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-base font-semibold text-[#374151]">
                  <span className="w-5.5 h-5.5 rounded-full bg-[#c8a96e] flex items-center justify-center shrink-0">
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/register" className="btn-corp-dark flex items-center gap-2 w-fit">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Company Intro ────────────────────────────────────────────────────────────
function CompanyIntro() {
  return (
    <section className="py-28 bg-[#f9fafb]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title mb-6">AI Strategy Company<br />With a Difference. Innovation.</h2>
            <div className="corp-divider" />
            <p style={{ color: "#6b7280", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1.75rem" }}>
              Corporate AI Strategy Advisor (CASA) is positioned globally, built by professionals
              who have decades of enterprise experience in the AI industry. Our team of strategists,
              data scientists, and business analysts has guided 2,400+ organizations through AI adoption.
            </p>
            <p style={{ color: "#6b7280", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
              Where our headquarters spans the Americas, Europe, and Asia-Pacific. Regional offices
              are located in New York, London, Singapore, and Dubai, with remote-first teams globally.
            </p>

            {/* Author */}
            <div className="flex items-center gap-5 pt-5 border-t border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#1a3a5c] to-[#2d5a8a] flex items-center justify-center text-white font-bold text-lg">
                AT
              </div>
              <div>
                <div className="font-bold text-[#111827] text-base">Anwar Tahir</div>
                <div className="text-sm text-[#6b7280] font-medium">Founder & Director</div>
              </div>
            </div>
          </div>

          {/* Right: Two image cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div style={{ background: "#1a3a5c", padding: "2rem", color: "white" }}>
                <Brain className="w-8 h-8 text-[#c8a96e] mb-4" />
                <div className="font-bold text-base mb-2.5">Who We Are</div>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  Corporate AI is one of the leading groups in the global AI and logistics services as it continues to expand its horizons.
                </p>
                <div className="mt-5 w-8 h-8 rounded-full bg-[#c8a96e] flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-6 mt-8">
              <img
                src="/data_center.png"
                alt="Technology infrastructure"
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
              <div style={{ background: "#111827", padding: "2rem", color: "white" }}>
                <Layers className="w-8 h-8 text-[#c8a96e] mb-4" />
                <div className="font-bold text-base mb-2.5">Analytics Redefined</div>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  Corporate AI is one of the leading groups as it continues to expand its horizons to new frontiers.
                </p>
                <div className="mt-5 w-8 h-8 rounded-full bg-[#c8a96e] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">›</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dark Services Section ─────────────────────────────────────────────────────
function DarkServices() {
  const services = [
    {
      icon: LineChart,
      title: "ROI Projections",
      desc: "Provides AI strategy services to meet up with your organization needs, professional services to deliver your AI insight fast and safe to its final destination.",
    },
    {
      icon: Gauge,
      title: "AI Readiness Score",
      desc: "Provides AI freight services to meet up with your organization needs, professional services to deliver your AI insight fast and safe to its final destination.",
    },
    {
      icon: Brain,
      title: "LLM Executive Insights",
      desc: "Provides up freight services to meet up with your organization needs, professional services to deliver your AI insight fast and safe to its final destination.",
    },
    {
      icon: Target,
      title: "Strategic Roadmap",
      desc: "Provides all freight services to meet up with your organization needs, professional services to deliver your AI insight fast and safe to its final destination.",
    },
    {
      icon: FileCheck,
      title: "SHAP Explainability",
      desc: "Provides freight services to meet up with your organization needs, professional services to deliver your AI insight fast and safe to its final destination.",
    },
  ];

  return (
    <section id="services" className="section-dark py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left heading */}
          <div>
            <span className="section-label">What We Offer</span>
            <h2 className="section-title light mb-8">
              Unmatched<br />Services.<br />Unmatched<br />Excellence.
            </h2>
            <Link href="/register" className="btn-corp-primary mt-4 w-fit flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Get Started
            </Link>
          </div>

          {/* Right grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="dark-card group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c8a96e]/15 border border-[#c8a96e]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#c8a96e]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ──────────────────────────────────────────────────────────
function Features() {
  const feats = [
    { icon: Brain, title: "LLM Executive Summaries", desc: "Generate narrative summaries, strategic bullet points, and boardroom presentations explaining model findings automatically." },
    { icon: ShieldCheck, title: "SHAP Explainability", desc: "Identify exactly which variables drive ROI predictions using SHAP values — complete transparency into AI decision-making." },
    { icon: FolderOpen, title: "Shareable Artifacts", desc: "Download comprehensive strategy briefs with visuals, model weights, and recommendation spreadsheets for key stakeholders." },
    { icon: BarChart3, title: "Readiness Benchmarking", desc: "Compare your AI readiness score across your industry peer group with anonymized benchmarking data from 50+ sectors." },
    { icon: Target, title: "Actionable Roadmaps", desc: "Prioritized recommendation lists with timeline estimates, technical difficulty tiers, and required staffing guidance." },
    { icon: TrendingUp, title: "Scenario Projections", desc: "Run conservative, moderate, and aggressive scenario projections with confidence intervals and payback period analysis." },
  ];

  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-18">
          <span className="section-label">Platform Capabilities</span>
          <h2 className="section-title">Everything Required to Optimize AI Decisions</h2>
          <div className="corp-divider mx-auto" />
          <p style={{ color: "#6b7280", maxWidth: "600px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Avoid blind spending. Leverage models trained on thousands of corporate cases to plan data-backed AI roadmap decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feats.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="info-card group">
                <div className="w-12 h-12 bg-[#1a3a5c]/8 flex items-center justify-center mb-4 group-hover:bg-[#c8a96e]/10 transition-colors">
                  <Icon className="w-6 h-6 text-[#1a3a5c] group-hover:text-[#c8a96e] transition-colors" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#111827", marginBottom: "0.5rem" }}>{f.title}</h3>
                <div className="w-8 h-0.5 bg-[#c8a96e] mb-3" />
                <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Strip ────────────────────────────────────────────────────────────────
function CTAStrip() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #0a0f1e 100%)" }}>
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
            Ready to Predict Your AI Success?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", marginTop: "0.5rem" }}>
            Join enterprise leaders leveraging predictive algorithms to de-risk AI investments.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <Link href="/register" className="btn-corp-primary flex items-center gap-2">
            Start Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="btn-corp-outline flex items-center gap-2">
            Explore Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="corp-footer">
      <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c8a96e] to-[#e8d09e] shadow-[0_4px_15px_rgba(200,169,110,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-[#0a0f1e]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <div className="text-lg font-extrabold text-white tracking-tight leading-none">
                Corporate <span className="text-[#c8a96e]">AI</span>
              </div>
              <div className="text-[10px] font-bold text-white/60 tracking-[0.15em] uppercase">
                Strategy Advisor
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Provides all AI strategy services to meet up with your organization needs, professional services to deliver your AI insight fast and safe to its final destination.
          </p>
          <div className="flex gap-3">
            {[Globe, Share2, Rss].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors text-white/50">
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            Services
          </h4>
          <ul className="space-y-1">
            {["ROI Projections", "AI Readiness Score", "LLM Insights", "Strategic Roadmap", "SHAP Explainability", "Industry Benchmarks"].map(l => (
              <li key={l}><a href="#" className="footer-link">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Outlook */}
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            Outlook
          </h4>
          <ul className="space-y-1">
            {["Analysis Tracking", "Get a Quote", "Client Portal", "Our Associates", "News & Events", "Careers"].map(l => (
              <li key={l}><a href="#" className="footer-link">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            Subscribe
          </h4>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1rem" }}>
            Get to know about Corporate AI, our updates and all news straight to your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-3.5 text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#c8a96e] transition-colors"
            />
            <button className="px-4 py-3.5 bg-[#c8a96e] hover:bg-[#b8944f] transition-colors">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="mt-6 space-y-2.5">
            {[
              { icon: MapPin, text: "123 AI Boulevard, New York, NY 10001" },
              { icon: Phone, text: "+1 (800) 555-0199" },
              { icon: Mail, text: "info@corpai.advisor.com" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-white/45">
                <Icon className="w-4 h-4 text-[#c8a96e] shrink-0 mt-0.5" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/06 py-5">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            © 2026 Corporate AI Strategy Advisor. All Rights Reserved.
          </span>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#c8a96e"}
                onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ background: "#f9fafb" }}>
      <Navbar />
      <Hero />
      <ServicesRow />
      <WhyUs />
      <CompanyIntro />
      <DarkServices />
      <Features />
      <CTAStrip />
      <Footer />
    </div>
  );
}
