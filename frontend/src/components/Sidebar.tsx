"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  User,
  Bot,
  Home,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/analysis/new", icon: PlusCircle, label: "New Analysis" },
  { href: "/history", icon: History, label: "History" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 40,
          background: "#0a0f1e",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "0.6rem",
          borderRadius: "0.5rem",
          color: "#fff",
          cursor: "pointer",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        aria-label="Open Menu"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed", 
            inset: 0, 
            background: "rgba(0,0,0,0.4)", 
            backdropFilter: "blur(4px)", 
            zIndex: 45 
          }}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "260px",
          background: "#0a0f1e",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          zIndex: 50,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div style={{
          padding: "1.75rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          overflow: "hidden",
        }}>
          <div style={{
            width: "42px", height: "42px", 
            background: "linear-gradient(135deg, #c8a96e 0%, #e8d09e 100%)",
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: "0 4px 15px rgba(200, 169, 110, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
          }}>
            <Bot size={24} color="#0a0f1e" strokeWidth={2.5} />
          </div>
          <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            <div style={{ 
              fontSize: "1.05rem", 
              fontWeight: 800, 
              color: "#ffffff", 
              whiteSpace: "nowrap", 
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}>
              Corporate <span style={{ color: "#c8a96e" }}>AI</span>
            </div>
            <div style={{ 
              fontSize: "0.68rem", 
              fontWeight: 700, 
              color: "rgba(255, 255, 255, 0.5)", 
              letterSpacing: "0.15em", 
              textTransform: "uppercase" 
            }}>
              Strategy Advisor
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "1rem 0", overflowY: "auto" }}>
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} style={{ display: "block", position: "relative", textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: "1rem 1.5rem",
                  borderLeft: isActive ? "3px solid #c8a96e" : "3px solid transparent",
                  background: isActive ? "rgba(200,169,110,0.08)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = "rgba(200,169,110,0.3)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLDivElement).style.background = "transparent";
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent";
                    }
                  }}
                >
                  <Icon size={20} color={isActive ? "#c8a96e" : "rgba(255,255,255,0.45)"} style={{ flexShrink: 0 }} />
                  <span style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                    whiteSpace: "nowrap",
                  }}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Close btn */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
              marginBottom: "0.625rem",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
            }}
          >
            <X size={18} />
            <span>Close Menu</span>
          </button>

          {/* Back to Home */}
          <Link href="/" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", display: "block" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "0.6rem",
              padding: "0.625rem 0.25rem",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.color = "#c8a96e"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.3)"}
            >
              <Home size={16} />
              <span>Home Page</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
