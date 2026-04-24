import { useState } from "react";
import { Link } from "react-router-dom";
import { DarkToggleNav } from "../../pages/DarkToggleNav";

const theme = {
  light: {
    pageBg: "#fdf8f3", sectionBg: "#fff", cardBg: "#fdf8f3", cardBorder: "#ede5d8",
    title: "#2c1e0f", sub: "#a0917e",
    heroBg: "linear-gradient(160deg,#3d2e1e 0%,#5c4433 45%,#7a5c3f 100%)",
    ctaBg: "linear-gradient(135deg,#3d2e1e 0%,#5c4433 100%)",
  },
  dark: {
    pageBg: "#1a1209", sectionBg: "#1e150a", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    title: "#fef3e2", sub: "#8b7355",
    heroBg: "linear-gradient(160deg,#0f0a05 0%,#1a1005 45%,#221508 100%)",
    ctaBg: "linear-gradient(135deg,#0f0a05 0%,#1a1005 100%)",
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
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: t.pageBg, color: t.title, minHeight: "100vh", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .fade-up{animation:fadeUp 0.7s ease both}
        .fade-up-1{animation:fadeUp 0.7s 0.1s ease both}
        .fade-up-2{animation:fadeUp 0.7s 0.2s ease both}
        .fade-up-3{animation:fadeUp 0.7s 0.35s ease both}
        .float-anim{animation:float 4s ease-in-out infinite}
        .card-hover{transition:transform 0.25s,box-shadow 0.25s}
        .card-hover:hover{transform:translateY(-5px);box-shadow:0 12px 28px rgba(139,115,85,0.18)!important}
        *{box-sizing:border-box;margin:0;padding:0}
        @media(max-width:768px){
          .actions-grid{grid-template-columns:1fr 1fr!important}
          .hero-stats{gap:20px!important}
        }
        @media(max-width:480px){
          .actions-grid{grid-template-columns:1fr!important}
          .action-card{flex-direction:column!important}
          .upgrade-row{flex-direction:column!important;align-items:stretch!important}
          .upgrade-row a{text-align:center}
        }
      `}</style>

      <DarkToggleNav dark={dark} onToggle={() => setDark(!dark)} title="Tailor Dashboard" />

      {/* HERO */}
      <section style={{ background: t.heroBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px", position: "relative", overflow: "hidden", transition: "background 0.3s" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle,#fef3e2 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "860px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", background: "rgba(254,243,226,0.12)", border: "1px solid rgba(254,243,226,0.2)", borderRadius: "40px", padding: "6px 18px", marginBottom: "24px" }}>
            <span style={{ fontSize: "13px", color: "rgba(254,243,226,0.85)" }}>✂ Welcome Back</span>
          </div>
          <h1 className="fade-up-1" style={{ fontFamily: "'Lora',serif", fontSize: "clamp(30px,6vw,60px)", color: "#fef3e2", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
            Tailor<br /><span style={{ fontStyle: "italic", color: "#f0c97a" }}>Dashboard</span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: "clamp(14px,2vw,17px)", color: "rgba(254,243,226,0.7)", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 32px" }}>
            Manage orders, respond to customers, track earnings, and grow your tailoring business.
          </p>
          <div className="fade-up-3 hero-stats" style={{ display: "flex", gap: "36px", justifyContent: "center", flexWrap: "wrap" }}>
            {stats.map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Lora',serif", fontSize: "clamp(22px,4vw,30px)", color: "#f0c97a", fontWeight: 700 }}>{num}</div>
                <div style={{ fontSize: "11px", color: "rgba(254,243,226,0.5)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section style={{ padding: "50px 20px", background: t.sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 className="fade-up" style={{ fontFamily: "'Lora',serif", fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 700, color: t.title, marginBottom: "8px" }}>Quick Actions</h2>
            <p className="fade-up-1" style={{ fontSize: "14px", color: t.sub }}>Everything you need, one click away</p>
          </div>
          <div className="actions-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" }}>
            {quickActions.map(({ icon, title, desc, to }) => (
              <Link key={title} to={to} className="card-hover action-card" style={{ background: t.cardBg, borderRadius: "18px", padding: "24px", border: `1px solid ${t.cardBorder}`, textDecoration: "none", color: "inherit", display: "flex", gap: "16px", alignItems: "flex-start", transition: "background 0.3s" }}>
                <div style={{ fontSize: "26px", width: "52px", height: "52px", flexShrink: 0, background: "linear-gradient(135deg,#c9a84c,#b8943e)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Lora',serif", fontSize: "16px", fontWeight: 600, color: t.title, marginBottom: "5px" }}>{title}</h3>
                  <p style={{ fontSize: "13px", color: t.sub, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPGRADE CTA */}
      <section style={{ padding: "50px 20px", background: t.ctaBg, textAlign: "center", transition: "background 0.3s" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }} className="float-anim">⭐</span>
          <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(20px,4vw,30px)", color: "#fef3e2", fontWeight: 700, marginBottom: "14px" }}>Upgrade to Premium</h2>
          <p style={{ color: "rgba(254,243,226,0.65)", fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.8, marginBottom: "28px" }}>
            Get priority customer matching, advanced analytics, and exclusive promotions.
          </p>
          <div className="upgrade-row" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/tailor/TailorDashboard/profile" style={{ background: "#c9a84c", color: "#2c1e0f", padding: "14px 36px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
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