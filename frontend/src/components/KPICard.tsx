interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: string;
  accentColor: string;
  sub?: string;
}

export default function KPICard({
  title,
  value,
  change,
  changePositive = true,
  icon,
  accentColor,
  sub,
}: KPICardProps) {
  return (
    <div
      style={{
        background: "#080f1e",
        border: `1px solid ${accentColor}33`,
        borderRadius: 14,
        padding: "20px 20px 18px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = `0 8px 32px ${accentColor}2a`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* top accent bar */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 3,
          background: `linear-gradient(90deg,${accentColor},${accentColor}55)`,
          borderRadius: "14px 14px 0 0",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `${accentColor}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
          }}
        >
          {icon}
        </div>
      </div>

      <p
        style={{
          margin: "0 0 8px",
          color: "#f1f5f9",
          fontSize: 26,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {change && (
          <span
            style={{
              background: changePositive ? "#052e1633" : "#2d050533",
              color: changePositive ? "#4ade80" : "#f87171",
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              border: `1px solid ${changePositive ? "#166534" : "#7f1d1d"}44`,
            }}
          >
            {changePositive ? "▲" : "▼"} {change}
          </span>
        )}
        {sub && (
          <span style={{ color: "#475569", fontSize: 11 }}>{sub}</span>
        )}
      </div>
    </div>
  );
}
