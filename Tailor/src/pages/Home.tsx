import { useState } from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "🔍", title: "Find Tailors Near You", desc: "Search by city and category to discover skilled tailors in your area instantly." },
  { icon: "✂️", title: "Verified Professionals", desc: "Every tailor profile is verified with Aadhaar. Know who you're hiring." },
  { icon: "⭐", title: "Real Customer Reviews", desc: "Read honest ratings and reviews from real customers before you book." },
  { icon: "📞", title: "Direct Contact", desc: "Call your tailor directly — no middlemen, no commission, no delays." },
  { icon: "👗", title: "Men, Women & Children", desc: "Browse tailors who specialize in any category — from suits to bridal wear." },
  { icon: "🏠", title: "Home or Shop", desc: "Choose tailors who work from home or have a shop — whatever suits you." },
];

const steps = [
  { step: "01", title: "Select Your City", desc: "Pick your city from the dropdown to see available tailors near you." },
  { step: "02", title: "Filter by Category", desc: "Choose Men, Women, or Children to find the right specialist." },
  { step: "03", title: "View & Call", desc: "Browse profiles with ratings and call your preferred tailor directly." },
];

const theme = {
  light: {
    pageBg: "#fdf8f3", sectionBg: "#fff", featureBg: "#fdf8f3",
    cardBg: "#fff", cardBorder: "#ede5d8",
    title: "#2c1e0f", sub: "#a0917e", label: "#6b5a42",
    stepNum: "#e8d9c4", toggleBg: "#fff", toggleColor: "#3d2e1e", toggleBorder: "#e8e0d5",
  },
  dark: {
    pageBg: "#1a1209", sectionBg: "#1e150a", featureBg: "#1a1209",
    cardBg: "#231a0f", cardBorder: "#3d2e1e",
    title: "#fef3e2", sub: "#8b7355", label: "#c4a882",
    stepNum: "#3d2e1e", toggleBg: "#2c1e0f", toggleColor: "#fef3e2", toggleBorder: "#3d2e1e",
  },
};

export default function Home() {
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: t.pageBg, color: t.title, transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(139,115,85,0.18) !important; }
        .btn-primary:hover { background: #6b5a42 !important; }
        .btn-primary:active { transform: scale(0.97); }
        .btn-outline:hover { background: rgba(254,243,226,0.08) !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 600px) {
          .hero-btns { flex-direction: column !important; align-items: center; }
          .hero-stats { gap: 24px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .tailor-cta-btns { flex-direction: column !important; align-items: center; }
        }
      `}</style>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "fixed", top: "16px", right: "16px", zIndex: 200,
          padding: "8px 16px", borderRadius: "20px", fontSize: "13px",
          fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          background: t.toggleBg, color: t.toggleColor, border: `1px solid ${t.toggleBorder}`,
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "92vh",
        background: dark
          ? "linear-gradient(160deg, #0f0a05 0%, #1e150a 45%, #2a1c0f 100%)"
          : "linear-gradient(160deg, #3d2e1e 0%, #5c4433 45%, #7a5c3f 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 24px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle, #fef3e2 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
        {[{ top: "8%", left: "5%", size: 80, rot: 20, op: 0.07 }, { top: "70%", left: "3%", size: 60, rot: -15, op: 0.05 }, { top: "15%", right: "6%", size: 90, rot: -30, op: 0.07 }, { bottom: "10%", right: "4%", size: 70, rot: 45, op: 0.05 }].map((d, i) => (
          <span key={i} style={{ position: "absolute", fontSize: d.size, color: "#fef3e2", opacity: d.op, transform: `rotate(${d.rot}deg)`, top: d.top, left: (d as any).left, right: (d as any).right, bottom: (d as any).bottom, userSelect: "none", pointerEvents: "none" }}>✂</span>
        ))}
        <div style={{ maxWidth: "860px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(254,243,226,0.12)", border: "1px solid rgba(254,243,226,0.2)", borderRadius: "40px", padding: "6px 18px", marginBottom: "28px" }}>
            <span style={{ fontSize: "13px", color: "rgba(254,243,226,0.85)", letterSpacing: "1px" }}>🧵 India's Tailoring Platform</span>
          </div>
          <h1 className="fade-up-1" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(32px, 6vw, 68px)", color: "#fef3e2", fontWeight: 700, lineHeight: 1.15, marginBottom: "24px" }}>
            Find the Perfect<br /><span style={{ fontStyle: "italic", color: "#f0c97a" }}>Tailor Near You</span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(254,243,226,0.7)", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 40px" }}>
            Connect with verified, skilled tailors in your city. Browse ratings, specialities, and call directly — no booking fees.
          </p>
          <div className="fade-up-3 hero-btns" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/find-tailor" className="btn-primary" style={{ background: "#c9a84c", color: "#2c1e0f", padding: "15px 36px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", transition: "background 0.2s" }}>Find Tailors →</Link>
            <Link to="/signup" className="btn-outline" style={{ background: "transparent", color: "#fef3e2", border: "1.5px solid rgba(254,243,226,0.3)", padding: "15px 36px", borderRadius: "12px", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "background 0.2s" }}>Sign Up Free</Link>
          </div>
          <div className="fade-up-4 hero-stats" style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "60px", flexWrap: "wrap" }}>
            {[["500+", "Tailors"], ["8", "Cities"], ["2000+", "Reviews"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "28px", color: "#f0c97a", fontWeight: 700 }}>{num}</div>
                <div style={{ fontSize: "12px", color: "rgba(254,243,226,0.5)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "80px 24px", background: t.sectionBg, borderBottom: `1px solid ${t.cardBorder}`, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#8b7355", textTransform: "uppercase", marginBottom: "10px" }}>Simple Process</p>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: t.title }}>How StitchFind Works</h2>
          </div>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="card-hover" style={{ background: t.cardBg, borderRadius: "20px", padding: "32px 28px", border: `1px solid ${t.cardBorder}`, boxShadow: "0 2px 12px rgba(139,115,85,0.06)", transition: "background 0.3s" }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "42px", fontWeight: 700, color: t.stepNum, marginBottom: "16px", lineHeight: 1 }}>{step}</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: t.title, marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: t.sub, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: "80px 24px", background: t.featureBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#8b7355", textTransform: "uppercase", marginBottom: "10px" }}>Why Choose Us</p>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: t.title }}>Everything You Need</h2>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="card-hover" style={{ background: t.sectionBg, borderRadius: "18px", padding: "28px 24px", border: `1px solid ${t.cardBorder}`, boxShadow: "0 2px 16px rgba(139,115,85,0.06)", display: "flex", gap: "18px", alignItems: "flex-start", transition: "background 0.3s" }}>
                <div style={{ fontSize: "28px", width: "52px", height: "52px", flexShrink: 0, background: t.featureBg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${t.cardBorder}` }}>{icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: t.title, marginBottom: "6px" }}>{title}</h3>
                  <p style={{ fontSize: "13px", color: t.sub, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOR TAILORS CTA ═══ */}
      <section style={{ padding: "80px 24px", background: dark ? "linear-gradient(135deg, #0f0a05 0%, #1e150a 100%)" : "linear-gradient(135deg, #3d2e1e 0%, #5c4433 100%)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }} className="float-anim">✂️</span>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(24px, 4vw, 38px)", color: "#fef3e2", fontWeight: 700, marginBottom: "16px" }}>Are You a Tailor?</h2>
          <p style={{ color: "rgba(254,243,226,0.65)", fontSize: "16px", lineHeight: 1.8, marginBottom: "36px" }}>
            Create your free profile, showcase your work, and get discovered by thousands of customers in your city.
          </p>
          <div className="tailor-cta-btns" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/login" style={{ background: "#c9a84c", color: "#2c1e0f", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#b8943e"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#c9a84c"}>Login</Link>
            <Link to="/tailor/review" style={{ background: "transparent", color: "#fef3e2", border: "1.5px solid rgba(254,243,226,0.3)", padding: "14px 32px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(254,243,226,0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}>Leave a Review</Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: dark ? "#0f0a05" : "#2c1e0f", padding: "32px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "'Lora', serif", fontSize: "20px", color: "#fef3e2", fontWeight: 600, marginBottom: "8px" }}>✂ StitchFind</div>
        <p style={{ fontSize: "13px", color: "rgba(254,243,226,0.35)" }}>© 2026 StitchFind. Connecting customers with skilled tailors across India.</p>
      </footer>
    </div>
  );
}