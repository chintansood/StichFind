import { useState } from "react";
import { Link } from "react-router-dom";

const theme = {
  light: {
    pageBg: "#fdf8f3", sectionBg: "#fff", cardBg: "#fdf8f3", cardBorder: "#ede5d8",
    title: "#2c1e0f", sub: "#a0917e",
    toggleBg: "#fff", toggleColor: "#3d2e1e", toggleBorder: "#e8e0d5",
    heroBg: "linear-gradient(160deg, #3d2e1e 0%, #5c4433 45%, #7a5c3f 100%)",
    ctaBg: "linear-gradient(135deg, #3d2e1e 0%, #5c4433 100%)",
  },
  dark: {
    pageBg: "#1a1209", sectionBg: "#1e150a", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    title: "#fef3e2", sub: "#8b7355",
    toggleBg: "#2c1e0f", toggleColor: "#fef3e2", toggleBorder: "#3d2e1e",
    heroBg: "linear-gradient(160deg, #0f0a05 0%, #1a1005 45%, #221508 100%)",
    ctaBg: "linear-gradient(135deg, #0f0a05 0%, #1a1005 100%)",
  },
};

const quickActions = [
  { icon: "📋", title: "New Orders", desc: "Manage incoming orders", to: "/tailor/TailorDashboard/orders" },
  { icon: "⭐", title: "Customer Reviews", desc: "View & respond to reviews", to: "/tailor/TailorDashboard/reviews" },
  { icon: "💰", title: "Earnings", desc: "Track your monthly earnings", to: "/tailor/TailorDashboard/earnings" },
  { icon: "👤", title: "My Profile", desc: "Update shop details", to: "/tailor/TailorDashboard/profile" },
];

const stats = [
  { num: "24", label: "Total Orders" },
  { num: "4.9", label: "Avg Rating" },
  { num: "₹28,500", label: "This Month" },
];

export default function TailorDashboard() {
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: t.pageBg, color: t.title, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(139,115,85,0.18) !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .actions-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-stats { gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .actions-grid { grid-template-columns: 1fr !important; }
          .action-card { flex-direction: column !important; }
          .upgrade-btns { flex-direction: column !important; align-items: center; }
        }
      `}</style>

      {/* Dark toggle */}
      <button onClick={() => setDark(!dark)} style={{ position: "fixed", top: "16px", right: "16px", zIndex: 200, padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: t.toggleBg, color: t.toggleColor, border: `1px solid ${t.toggleBorder}` }}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: "70vh", background: t.heroBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle, #fef3e2 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "860px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(254,243,226,0.12)", border: "1px solid rgba(254,243,226,0.2)", borderRadius: "40px", padding: "6px 18px", marginBottom: "28px" }}>
            <span style={{ fontSize: "13px", color: "rgba(254,243,226,0.85)" }}>✂ Welcome Back</span>
          </div>
          <h1 className="fade-up-1" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(32px, 6vw, 64px)", color: "#fef3e2", fontWeight: 700, lineHeight: 1.15, marginBottom: "20px" }}>
            Tailor<br /><span style={{ fontStyle: "italic", color: "#f0c97a" }}>Dashboard</span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(254,243,226,0.7)", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 40px" }}>
            Manage orders, respond to customers, track earnings, and grow your tailoring business.
          </p>
          <div className="fade-up-3 hero-stats" style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "40px", flexWrap: "wrap" }}>
            {stats.map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "32px", color: "#f0c97a", fontWeight: 700 }}>{num}</div>
                <div style={{ fontSize: "12px", color: "rgba(254,243,226,0.5)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUICK ACTIONS ═══ */}
      <section style={{ padding: "60px 24px", background: t.sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="fade-up" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, color: t.title, marginBottom: "12px" }}>Quick Actions</h2>
            <p className="fade-up-1" style={{ fontSize: "15px", color: t.sub }}>Everything you need, one click away</p>
          </div>
          <div className="actions-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {quickActions.map(({ icon, title, desc, to }) => (
              <Link key={title} to={to} className="card-hover action-card" style={{ background: t.cardBg, borderRadius: "20px", padding: "28px 24px", border: `1px solid ${t.cardBorder}`, boxShadow: "0 2px 12px rgba(139,115,85,0.06)", textDecoration: "none", color: "inherit", display: "flex", gap: "20px", alignItems: "flex-start", transition: "background 0.3s" }}>
                <div style={{ fontSize: "28px", width: "56px", height: "56px", flexShrink: 0, background: "linear-gradient(135deg, #c9a84c, #b8943e)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: t.title, marginBottom: "6px" }}>{title}</h3>
                  <p style={{ fontSize: "13px", color: t.sub, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UPGRADE CTA ═══ */}
      <section style={{ padding: "60px 24px", background: t.ctaBg, textAlign: "center", transition: "background 0.3s" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <span style={{ fontSize: "52px", display: "block", marginBottom: "20px" }} className="float-anim">⭐</span>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(22px, 4vw, 32px)", color: "#fef3e2", fontWeight: 700, marginBottom: "16px" }}>Upgrade to Premium</h2>
          <p style={{ color: "rgba(254,243,226,0.65)", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>
            Get priority customer matching, advanced analytics, and exclusive promotions.
          </p>
          <div className="upgrade-btns" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/tailor/TailorDashboard/profile" style={{ background: "#c9a84c", color: "#2c1e0f", padding: "16px 40px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#b8943e"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#c9a84c"}>
              Upgrade Now - ₹199/month
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}