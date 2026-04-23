import { Link } from "react-router-dom";

const features = [
  {
    icon: "🔍",
    title: "Find Tailors Near You",
    desc: "Search by city and category to discover skilled tailors in your area instantly.",
  },
  {
    icon: "✂️",
    title: "Verified Professionals",
    desc: "Every tailor profile is verified with Aadhaar. Know who you're hiring.",
  },
  {
    icon: "⭐",
    title: "Real Customer Reviews",
    desc: "Read honest ratings and reviews from real customers before you book.",
  },
  {
    icon: "📞",
    title: "Direct Contact",
    desc: "Call your tailor directly — no middlemen, no commission, no delays.",
  },
  {
    icon: "👗",
    title: "Men, Women & Children",
    desc: "Browse tailors who specialize in any category — from suits to bridal wear.",
  },
  {
    icon: "🏠",
    title: "Home or Shop",
    desc: "Choose tailors who work from home or have a shop — whatever suits you.",
  },
];

const steps = [
  { step: "01", title: "Select Your City", desc: "Pick your city from the dropdown to see available tailors near you." },
  { step: "02", title: "Filter by Category", desc: "Choose Men, Women, or Children to find the right specialist." },
  { step: "03", title: "View & Call", desc: "Browse profiles with ratings and call your preferred tailor directly." },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fdf8f3", color: "#2c1e0f" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(139,115,85,0.15) !important; }
        .btn-primary { transition: background 0.2s, transform 0.15s; }
        .btn-primary:hover { background: #6b5a42 !important; }
        .btn-primary:active { transform: scale(0.97); }
        .btn-outline:hover { background: #fdf0e6 !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{
        minHeight: "92vh",
        background: "linear-gradient(160deg, #3d2e1e 0%, #5c4433 45%, #7a5c3f 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 24px", position: "relative", overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "radial-gradient(circle, #fef3e2 1px, transparent 1px)",
          backgroundSize: "30px 30px", pointerEvents: "none",
        }} />

        {/* Floating scissors decorations */}
        {[
          { top: "8%", left: "5%", size: 80, rot: 20, op: 0.07 },
          { top: "70%", left: "3%", size: 60, rot: -15, op: 0.05 },
          { top: "15%", right: "6%", size: 90, rot: -30, op: 0.07 },
          { bottom: "10%", right: "4%", size: 70, rot: 45, op: 0.05 },
        ].map((d, i) => (
          <span key={i} style={{
            position: "absolute", fontSize: d.size, color: "#fef3e2",
            opacity: d.op, transform: `rotate(${d.rot}deg)`,
            top: d.top, left: d.left, right: d.right, bottom: d.bottom,
            userSelect: "none", pointerEvents: "none",
          }}>✂</span>
        ))}

        <div style={{ maxWidth: "860px", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(254,243,226,0.12)", border: "1px solid rgba(254,243,226,0.2)",
            borderRadius: "40px", padding: "6px 18px", marginBottom: "28px",
          }}>
            <span style={{ fontSize: "13px", color: "rgba(254,243,226,0.85)", letterSpacing: "1px" }}>
              🧵 India's Tailoring Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-up-1" style={{
            fontFamily: "'Lora', serif", fontSize: "clamp(38px, 6vw, 68px)",
            color: "#fef3e2", fontWeight: 700, lineHeight: 1.15, marginBottom: "24px",
          }}>
            Find the Perfect<br />
            <span style={{ fontStyle: "italic", color: "#f0c97a" }}>Tailor Near You</span>
          </h1>

          <p className="fade-up-2" style={{
            fontSize: "18px", color: "rgba(254,243,226,0.7)", lineHeight: 1.8,
            maxWidth: "560px", margin: "0 auto 40px",
          }}>
            Connect with verified, skilled tailors in your city. Browse ratings, specialities, and call directly — no booking fees.
          </p>

          {/* CTA Buttons */}
          <div className="fade-up-3" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/find-tailor" className="btn-primary" style={{
              background: "#c9a84c", color: "#2c1e0f", padding: "15px 36px",
              borderRadius: "12px", fontWeight: 700, fontSize: "15px",
              textDecoration: "none", letterSpacing: "0.3px",
            }}>
              Find Tailors →
            </Link>
            <Link to="/signup" className="btn-outline" style={{
              background: "transparent", color: "#fef3e2",
              border: "1.5px solid rgba(254,243,226,0.3)",
              padding: "15px 36px", borderRadius: "12px",
              fontWeight: 600, fontSize: "15px", textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Sign Up Free
            </Link>
          </div>

          {/* Stats */}
          <div className="fade-up-4" style={{
            display: "flex", gap: "40px", justifyContent: "center",
            marginTop: "60px", flexWrap: "wrap",
          }}>
            {[["500+", "Tailors"], ["8", "Cities"], ["2000+", "Reviews"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "28px", color: "#f0c97a", fontWeight: 700 }}>{num}</div>
                <div style={{ fontSize: "12px", color: "rgba(254,243,226,0.5)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section style={{ padding: "80px 24px", background: "#fff", borderBottom: "1px solid #ede5d8" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#8b7355", textTransform: "uppercase", marginBottom: "10px" }}>Simple Process</p>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "#2c1e0f" }}>
              How StitchFind Works
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="card-hover" style={{
                background: "#fdf8f3", borderRadius: "20px",
                padding: "32px 28px", border: "1px solid #ede5d8",
                boxShadow: "0 2px 12px rgba(139,115,85,0.06)",
              }}>
                <div style={{
                  fontFamily: "'Lora', serif", fontSize: "42px", fontWeight: 700,
                  color: "#e8d9c4", marginBottom: "16px", lineHeight: 1,
                }}>{step}</div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c1e0f", marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: "#a0917e", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section style={{ padding: "80px 24px", background: "#fdf8f3" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#8b7355", textTransform: "uppercase", marginBottom: "10px" }}>Why Choose Us</p>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "#2c1e0f" }}>
              Everything You Need
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="card-hover" style={{
                background: "#fff", borderRadius: "18px", padding: "28px 24px",
                border: "1px solid #ede5d8", boxShadow: "0 2px 16px rgba(139,115,85,0.06)",
                display: "flex", gap: "18px", alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: "28px", width: "52px", height: "52px", flexShrink: 0,
                  background: "#fdf8f3", borderRadius: "14px", display: "flex",
                  alignItems: "center", justifyContent: "center", border: "1px solid #ede5d8",
                }}>{icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: "#2c1e0f", marginBottom: "6px" }}>{title}</h3>
                  <p style={{ fontSize: "13px", color: "#a0917e", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOR TAILORS CTA ═══════════ */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, #3d2e1e 0%, #5c4433 100%)",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }} className="float-anim">✂️</span>
          <h2 style={{
            fontFamily: "'Lora', serif", fontSize: "clamp(26px, 4vw, 38px)",
            color: "#fef3e2", fontWeight: 700, marginBottom: "16px",
          }}>Are You a Tailor?</h2>
          <p style={{ color: "rgba(254,243,226,0.65)", fontSize: "16px", lineHeight: 1.8, marginBottom: "36px" }}>
            Create your free profile, showcase your work, and get discovered by thousands of customers in your city.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/login" style={{
              background: "#c9a84c", color: "#2c1e0f", padding: "14px 32px",
              borderRadius: "12px", fontWeight: 700, fontSize: "14px",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#b8943e"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#c9a84c"}>
              Login
            </Link>
            <Link to="/tailor/review" style={{
              background: "transparent", color: "#fef3e2",
              border: "1.5px solid rgba(254,243,226,0.3)",
              padding: "14px 32px", borderRadius: "12px",
              fontWeight: 600, fontSize: "14px", textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(254,243,226,0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}>
              Leave a Review
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{
        background: "#2c1e0f", padding: "32px 24px",
        textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontFamily: "'Lora', serif", fontSize: "20px", color: "#fef3e2", fontWeight: 600, marginBottom: "8px" }}>
          ✂ StitchFind
        </div>
        <p style={{ fontSize: "13px", color: "rgba(254,243,226,0.35)" }}>
          © 2026 StitchFind. Connecting customers with skilled tailors across India.
        </p>
      </footer>
    </div>
  );
}
