interface KPICardProps {
  icon: string;
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  accent: string;
  sub?: string;
}

export default function KPICard({ icon, label, value, change, changePositive = true, accent, sub }: KPICardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderTop: `3px solid ${accent}`,
        padding: "2rem",
        transition: "box-shadow 0.25s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{
            fontSize: "0.75rem", fontWeight: 800, color: "#9ca3af",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.625rem",
          }}>{label}</p>
          <h3 style={{
            fontSize: "2.25rem", fontWeight: 900, color: "#111827",
            lineHeight: 1, margin: 0,
          }}>{value}</h3>
          {(change || sub) && (
            <div style={{ marginTop: "0.625rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              {change && (
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: changePositive ? "#10B981" : "#ef4444" }}>
                  {changePositive ? "↑" : "↓"} {change}
                </span>
              )}
              {sub && <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{sub}</span>}
            </div>
          )}
        </div>
        <div style={{
          width: 48, height: 48,
          background: `${accent}14`,
          border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
