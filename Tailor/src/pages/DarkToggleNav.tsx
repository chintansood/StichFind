// src/components/DarkToggleNav.tsx
interface Props {
  dark: boolean;
  onToggle: () => void;
  title?: string;
}

export const DarkToggleNav = ({ dark, onToggle, title }: Props) => {
  const t = dark
    ? { bg: "#1e150a", border: "#3d2e1e", text: "#fef3e2", btnBg: "#2c1e0f", btnColor: "#fef3e2", btnBorder: "#3d2e1e" }
    : { bg: "#fff", border: "#ede5d8", text: "#2c1e0f", btnBg: "#fff", btnColor: "#3d2e1e", btnBorder: "#e8e0d5" };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: t.bg, borderBottom: `1px solid ${t.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px", boxShadow: "0 1px 8px rgba(139,115,85,0.08)",
      transition: "background 0.3s",
    }}>
      <span style={{ fontFamily: "'Lora',serif", fontSize: "18px", fontWeight: 600, color: t.text }}>
        ✂ {title || "StitchFind"}
      </span>
      <button onClick={onToggle} style={{
        padding: "7px 16px", borderRadius: "20px", fontSize: "13px",
        fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
        background: t.btnBg, color: t.btnColor, border: `1px solid ${t.btnBorder}`,
      }}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
};