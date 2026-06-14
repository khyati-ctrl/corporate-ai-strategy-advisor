"use client";

import Link from "next/link";
import { Bell, HelpCircle, Settings, ChevronDown } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-4 pl-20 md:py-6 md:pr-9 md:pl-20 bg-white border-b border-gray-200">

      {/* Title */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em" }}>Portal</span>
          <span style={{ color: "#d1d5db", fontSize: "0.72rem" }}>›</span>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#c8a96e", textTransform: "uppercase", letterSpacing: "0.12em" }}>{title}</span>
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", lineHeight: 1.25 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.3rem", fontWeight: 500 }}>{subtitle}</p>
        )}
      </div>

      {/* Actions + User */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-3 sm:static sm:flex-row sm:items-center sm:gap-6 z-20">

        {/* Actions */}
        {actions && <div className="order-2 sm:order-1 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">{actions}</div>}

        {/* Icon Toolbar */}
        <div className="order-3 sm:order-2 hidden sm:flex items-center gap-2 sm:gap-3 sm:border-l-2 sm:border-gray-100 sm:pl-6">
          {[
            { icon: Bell, hasNotif: true },
            { icon: HelpCircle, hasNotif: false },
            { icon: Settings, hasNotif: false, href: "/profile" },
          ].map((item, i) => {
            const Icon = item.icon;
            const content = (
              <button key={i}
                style={{
                  padding: "0.5rem", color: "#6b7280", cursor: "pointer",
                  background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "50%",
                  position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#d1d5db";
                  (e.currentTarget as HTMLButtonElement).style.color = "#111827";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
                  (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <Icon size={18} strokeWidth={2.5} />
                {item.hasNotif && (
                  <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", border: "2px solid #ffffff" }} />
                )}
              </button>
            );
            return item.href ? (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>{content}</Link>
            ) : content;
          })}
        </div>

        {/* User Card */}
        <div className="order-1 sm:order-3">
          <Link href="/profile" style={{ textDecoration: "none" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.875rem", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "9999px", boxShadow: "0 2px 8px -2px rgba(0,0,0,0.05)", cursor: "pointer", transition: "all 0.3s" }}
              className="p-1 sm:py-1.5 sm:px-5 sm:pl-1.5"
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px -2px rgba(0,0,0,0.05)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "#ffffff", boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.2),0 2px 5px rgba(59,130,246,0.3)", flexShrink: 0 }}>
                JD
              </div>
              <div className="hidden sm:flex flex-col justify-center">
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>Jane Doe</span>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>Acme Corp</span>
              </div>
              <div className="hidden sm:flex items-center justify-center" style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f3f4f6", marginLeft: "0.25rem" }}>
                <ChevronDown size={14} color="#6b7280" strokeWidth={3} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
