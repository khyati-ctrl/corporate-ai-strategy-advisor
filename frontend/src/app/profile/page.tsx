"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  User,
  Mail,
  Building,
  Calendar,
  BarChart3,
  FileText,
  ShieldCheck,
  KeyRound,
  Trash2,
  AlertTriangle,
  Crown,
  Check,
  Star
} from "lucide-react";

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "1.6rem", marginBottom: "1.25rem" }}>
      <div className="mb-6 pb-5 border-b border-[#f3f4f6]">
        <h3 className="text-[1.15rem] font-extrabold text-[#111827] uppercase tracking-[0.06em]">{title}</h3>
        {desc && <p className="text-[0.85rem] text-[#9ca3af] mt-1">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const [name, setName] = useState("Jane Doe");
  const [org, setOrg] = useState("Acme Corporation");
  const [email] = useState("jane.doe@acmecorp.com");
  const [saved, setSaved] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar title="Profile & Settings" subtitle="Manage your corporate account preferences and authentication keys" />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5 w-full max-w-[100vw]">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 lg:gap-7 max-w-[1100px] w-full mx-auto">

            {/* ── Left: Profile Card ─────────────────────────────── */}
            <div>
              {/* User Card */}
              <div style={{
                background: "#ffffff", border: "1px solid #e5e7eb",
                marginBottom: "1.25rem", overflow: "hidden",
              }}>
                {/* Top accent */}
                <div style={{ height: "4px", background: "linear-gradient(90deg, #1a3a5c, #c8a96e)" }} />
                <div style={{ padding: "2.25rem", textAlign: "center" }}>
                  {/* Avatar */}
                  <div style={{
                    width: "88px", height: "88px",
                    background: "linear-gradient(135deg, #1a3a5c, #2d5a8a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.75rem", fontWeight: 900, color: "#ffffff",
                    margin: "0 auto 1.25rem",
                  }}>
                    JD
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827" }}>{name}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.3rem" }}>{email}</p>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.45rem 1rem",
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    marginTop: "1.25rem",
                  }}>
                    <Star size={13} color="#c8a96e" fill="#c8a96e" />
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#c8a96e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Strategy Analyst
                    </span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #f3f4f6", padding: "1.5rem 1.75rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { label: "Organization", value: org, icon: Building },
                      { label: "Member Since", value: "January 2026", icon: Calendar },
                      { label: "Plan Tier", value: "Enterprise Lite", icon: Crown },
                      { label: "Analyses Run", value: "12", icon: BarChart3 },
                      { label: "Reports Exported", value: "5", icon: FileText },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            <Icon size={14} /> {item.label}
                          </span>
                          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Upgrade Card */}
              <div style={{
                background: "#1a3a5c",
                padding: "2rem",
                border: "1px solid rgba(200,169,110,0.2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
                  <Crown size={18} color="#c8a96e" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#c8a96e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Upgrade to Pro
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Unlock multi-tenant workspaces, high-priority model access, raw SHAP parameter weights, and REST API ingestion keys.
                </p>
                <button 
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#c8a96e] to-[#b8944f] px-6 py-3 font-bold text-white shadow-[0_4px_12px_rgba(200,169,110,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(200,169,110,0.4)] hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                  <span className="relative z-10 text-[0.8rem] tracking-[0.1em] uppercase">Unlock Pro Access</span>
                </button>
              </div>
            </div>

            {/* ── Right: Settings Panels ───────────────────────── */}
            <div>
              {/* Personal Details */}
              <Section title="Personal Information" desc="Update workspace variables for strategy reports.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label">Full Name</label>
                    <div style={{ position: "relative" }}>
                      <User size={15} color="#9ca3af" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: "2.5rem" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <div style={{ position: "relative" }}>
                      <Mail size={15} color="#9ca3af" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="form-input"
                        style={{ paddingLeft: "2.5rem" }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label className="form-label">Organization Entity</label>
                  <div style={{ position: "relative" }}>
                    <Building size={15} color="#9ca3af" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="text"
                      value={org}
                      onChange={e => setOrg(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: "2.5rem" }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                  <button
                    onClick={handleSave}
                    className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8a] px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(26,58,92,0.25)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(26,58,92,0.4)] hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                      <div className="relative h-full w-8 bg-white/20" />
                    </div>
                    {saved ? (
                      <span className="relative z-10 flex items-center gap-2 text-[0.75rem] sm:text-[0.8rem] tracking-[0.1em] uppercase">
                        <Check size={16} /> Saved!
                      </span>
                    ) : (
                      <span className="relative z-10 text-[0.75rem] sm:text-[0.8rem] tracking-[0.1em] uppercase">Save Changes</span>
                    )}
                  </button>
                  {saved && (
                    <span style={{ fontSize: "0.875rem", color: "#10B981", fontWeight: 600 }}>
                      Profile successfully updated.
                    </span>
                  )}
                </div>
              </Section>

              {/* Security */}
              <Section title="Security & Encryption Keys" desc="Calibrate authentication options and update user passwords.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label">Current Password</label>
                    <div style={{ position: "relative" }}>
                      <KeyRound size={15} color="#9ca3af" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)" }} />
                      <input type="password" placeholder="••••••••" className="form-input" style={{ paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">New Password</label>
                    <div style={{ position: "relative" }}>
                      <KeyRound size={15} color="#9ca3af" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)" }} />
                      <input type="password" placeholder="••••••••" className="form-input" style={{ paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1.25rem 1.5rem",
                  background: "#f9fafb", border: "1px solid #e5e7eb",
                  marginBottom: "1.5rem",
                }}>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <ShieldCheck size={18} color="#1a3a5c" /> Multi-Factor Authentication (MFA)
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "0.3rem" }}>
                      Verify logins through secure token verification algorithms.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    style={{
                      width: "48px", height: "26px",
                      background: mfaEnabled ? "#1a3a5c" : "#d1d5db",
                      borderRadius: "999px", border: "none", cursor: "pointer",
                      position: "relative", transition: "background 0.2s", flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: "20px", height: "20px",
                      background: "#ffffff", borderRadius: "50%",
                      position: "absolute", top: "3px",
                      left: mfaEnabled ? "25px" : "3px",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    }} />
                  </button>
                </div>

                <button
                  className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-white border-2 border-gray-200 px-6 py-3 sm:px-8 sm:py-3.5 font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="relative z-10 text-[0.75rem] sm:text-[0.8rem] tracking-[0.1em] uppercase">Update Security Credentials</span>
                </button>
              </Section>

              {/* Danger Zone */}
              <div style={{
                background: "#ffffff", border: "1px solid #fca5a5",
                padding: "2.25rem",
              }}>
                <h3 style={{
                  fontSize: "0.95rem", fontWeight: 800, color: "#ef4444",
                  display: "flex", alignItems: "center", gap: "0.625rem",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  marginBottom: "0.75rem"
                }}>
                  <AlertTriangle size={16} /> Danger Zone
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Deleting this profile terminates access to all Strategy Advisor instances. All cached analyses,
                  reports, datasets, and API credentials will be permanently erased.
                </p>
                <button
                  className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-red-50 border-2 border-red-200 px-6 py-3 font-bold text-red-600 shadow-sm transition-all duration-300 hover:border-red-300 hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5"
                >
                  <Trash2 size={16} className="relative z-10" />
                  <span className="relative z-10 text-[0.75rem] tracking-[0.1em] uppercase">Delete Account Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
