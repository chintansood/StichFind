import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ name: string; profilePic: string } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const email = localStorage.getItem("email") || "";

  useEffect(() => {
    if (!email) { setLoadingProfile(false); return; }
    api.post("/customer/find", { email })
      .then(res => {
        if (res.data.status) {
          setProfile({ name: res.data.doc.name, profilePic: res.data.doc.profilePic });
        }
      })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const quickActions = [
    { icon: "🔍", title: "Find Tailor", desc: "Search by city & category", to: "/find-tailor", color: "#fef3e2" },
    { icon: "⭐", title: "Write a Review", desc: "Share your experience", to: "/tailor/review", color: "#fef9f0" },
    { icon: "👤", title: "My Profile", desc: "Update your details", to: "/customer/profile", color: "#fdf8f3" },
    { icon: "🏠", title: "Browse All", desc: "Explore all tailors", to: "/find-tailor", color: "#fef3e2" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fdf8f3", color: "#2c1e0f", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .fade-2 { animation: fadeUp 0.6s 0.2s ease both; }
        .fade-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .fade-4 { animation: fadeUp 0.6s 0.4s ease both; }
        .float-el { animation: float 4s ease-in-out infinite; }
        .action-card { transition: transform 0.22s ease, box-shadow 0.22s ease; cursor:pointer; }
        .action-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(139,115,85,0.14) !important; }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── TOPBAR ── */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #ede5d8",
        boxShadow: "0 1px 10px rgba(139,115,85,0.07)",
        padding: "0 32px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>✂️</span>
          <span style={{ fontFamily: "'Lora',serif", fontSize: "18px", fontWeight: 600, color: "#2c1e0f" }}>StitchFind</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/customer/profile" style={{
            padding: "7px 16px", borderRadius: "9px", fontSize: "13px",
            fontWeight: 600, textDecoration: "none", color: "#8b7355",
            border: "1.5px solid #e8e0d5", background: "#fdf8f3",
          }}>My Profile</Link>
          <button onClick={handleLogout} style={{
            padding: "7px 16px", borderRadius: "9px", fontSize: "13px",
            fontWeight: 600, border: "none", cursor: "pointer",
            background: "#8b7355", color: "#fef3e2",
          }}>Logout</button>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section style={{
        background: "linear-gradient(160deg, #3d2e1e 0%, #5c4433 45%, #7a5c3f 100%)",
        padding: "56px 32px 64px", position: "relative", overflow: "hidden",
      }}>
        {/* Dot pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "radial-gradient(circle, #fef3e2 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none",
        }} />
        {/* Scissor decorations */}
        {[{t:"10%",l:"4%",r:15,op:0.07},{t:"65%",l:"2%",r:-20,op:0.05},{t:"8%",r:"5%",rot:"-30",op:0.07},{b:"12%",r:"3%",r2:40,op:0.05}].map((d,i)=>(
          <span key={i} style={{
            position:"absolute", fontSize:"72px", color:"#fef3e2",
            opacity:d.op, transform:`rotate(${d.r||d.r2||0}deg)`,
            top:d.t, left:d.l, right:d.r, bottom:d.b,
            userSelect:"none", pointerEvents:"none",
          }}>✂</span>
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>

            {/* Left: greeting */}
            <div className="fade-up">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(254,243,226,0.12)", border: "1px solid rgba(254,243,226,0.2)",
                borderRadius: "40px", padding: "5px 16px", marginBottom: "20px",
              }}>
                <span style={{ fontSize: "12px", color: "rgba(254,243,226,0.8)", letterSpacing: "0.5px" }}>👋 Welcome back</span>
              </div>
              <h1 style={{
                fontFamily: "'Lora',serif", fontSize: "clamp(30px,5vw,52px)",
                color: "#fef3e2", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px",
              }}>
                {profile?.name
                  ? <>Hello, <span style={{ fontStyle: "italic", color: "#f0c97a" }}>{profile.name}</span></>
                  : <>Your <span style={{ fontStyle: "italic", color: "#f0c97a" }}>Dashboard</span></>
                }
              </h1>
              <p style={{ color: "rgba(254,243,226,0.6)", fontSize: "15px", lineHeight: 1.7, maxWidth: "420px" }}>
                Find skilled tailors, write reviews, and manage your tailoring journey all in one place.
              </p>
            </div>

            {/* Right: profile card */}
            <div className="fade-1">
              {loadingProfile ? (
                <div style={{
                  width: "220px", height: "120px", borderRadius: "20px",
                  background: "rgba(254,243,226,0.08)", border: "1px solid rgba(254,243,226,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: "rgba(254,243,226,0.4)", fontSize: "13px" }}>Loading...</span>
                </div>
              ) : profile ? (
                /* Profile exists */
                <Link to="/customer/profile" style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "rgba(254,243,226,0.1)", border: "1px solid rgba(254,243,226,0.2)",
                    borderRadius: "20px", padding: "20px 24px", backdropFilter: "blur(10px)",
                    display: "flex", alignItems: "center", gap: "16px", minWidth: "220px",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(254,243,226,0.16)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(254,243,226,0.1)"}>
                    <div style={{
                      width: "60px", height: "60px", borderRadius: "50%",
                      overflow: "hidden", border: "2.5px solid rgba(240,201,122,0.6)", flexShrink: 0,
                    }}>
                      {profile.profilePic && profile.profilePic !== "nopic.jpg"
                        ? <img src={profile.profilePic} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ width: "100%", height: "100%", background: "rgba(254,243,226,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>👤</div>
                      }
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Lora',serif", fontSize: "16px", fontWeight: 600, color: "#fef3e2", marginBottom: "3px" }}>{profile.name}</p>
                      <p style={{ fontSize: "11px", color: "rgba(254,243,226,0.5)", marginBottom: "6px" }}>Customer Account</p>
                      <span style={{
                        fontSize: "10px", fontWeight: 600, padding: "2px 10px",
                        borderRadius: "20px", background: "rgba(74,222,128,0.15)",
                        color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)",
                        letterSpacing: "0.5px",
                      }}>● Profile Complete</span>
                    </div>
                  </div>
                </Link>
              ) : (
                /* No profile */
                <Link to="/customer/profile" style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "rgba(254,243,226,0.08)", border: "1.5px dashed rgba(254,243,226,0.25)",
                    borderRadius: "20px", padding: "24px 28px", textAlign: "center", minWidth: "220px",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(254,243,226,0.13)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(254,243,226,0.08)"}>
                    <div style={{ fontSize: "36px", marginBottom: "10px", opacity: 0.5 }}>👤</div>
                    <p style={{ fontFamily: "'Lora',serif", fontSize: "15px", color: "rgba(254,243,226,0.7)", marginBottom: "4px", fontWeight: 600 }}>No Profile Made</p>
                    <p style={{ fontSize: "12px", color: "rgba(254,243,226,0.4)", marginBottom: "14px" }}>Complete your profile to get started</p>
                    <span style={{
                      fontSize: "12px", fontWeight: 700, padding: "7px 18px",
                      borderRadius: "10px", background: "#c9a84c", color: "#2c1e0f",
                      display: "inline-block",
                    }}>+ Add Profile</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section style={{ padding: "52px 32px", background: "#fff", borderBottom: "1px solid #ede5d8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "36px" }} className="fade-2">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "#8b7355", textTransform: "uppercase", marginBottom: "6px" }}>Quick Actions</p>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#2c1e0f" }}>Everything You Need</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: "20px" }} className="fade-3">
            {quickActions.map(({ icon, title, desc, to, color }) => (
              <Link key={title} to={to} style={{ textDecoration: "none" }}>
                <div className="action-card" style={{
                  background: color, borderRadius: "18px", padding: "28px 24px",
                  border: "1px solid #ede5d8", boxShadow: "0 2px 12px rgba(139,115,85,0.06)",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                    background: "linear-gradient(135deg, #c9a84c, #8b7355)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
                  }}>{icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Lora',serif", fontSize: "16px", fontWeight: 600, color: "#2c1e0f", marginBottom: "5px" }}>{title}</h3>
                    <p style={{ fontSize: "13px", color: "#a0917e", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "52px 32px", background: "#fdf8f3" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }} className="fade-4">
          <div style={{ marginBottom: "36px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "#8b7355", textTransform: "uppercase", marginBottom: "6px" }}>Get Started</p>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#2c1e0f" }}>Three Simple Steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px" }}>
            {[
              { step:"01", title:"Complete Your Profile", desc:"Add your name, city, and photo so tailors can recognize you." },
              { step:"02", title:"Find & Call a Tailor", desc:"Filter by city and category, then call your preferred tailor directly." },
              { step:"03", title:"Leave a Review", desc:"Help others by sharing your honest experience after each visit." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="action-card" style={{
                background: "#fff", borderRadius: "18px", padding: "28px 24px",
                border: "1px solid #ede5d8", boxShadow: "0 2px 12px rgba(139,115,85,0.06)",
              }}>
                <div style={{
                  fontFamily: "'Lora',serif", fontSize: "38px", fontWeight: 700,
                  color: "#e8d9c4", marginBottom: "12px", lineHeight: 1,
                }}>{step}</div>
                <h3 style={{ fontFamily: "'Lora',serif", fontSize: "16px", fontWeight: 600, color: "#2c1e0f", marginBottom: "6px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#a0917e", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{
        padding: "52px 32px", textAlign: "center",
        background: "linear-gradient(135deg, #3d2e1e 0%, #5c4433 100%)",
      }}>
        <span className="float-el" style={{ fontSize: "44px", display: "block", marginBottom: "14px" }}>✂️</span>
        <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(22px,3.5vw,30px)", color: "#fef3e2", fontWeight: 700, marginBottom: "12px" }}>
          Ready to Find Your Tailor?
        </h2>
        <p style={{ color: "rgba(254,243,226,0.6)", fontSize: "14px", lineHeight: 1.8, marginBottom: "28px", maxWidth: "440px", margin: "0 auto 28px" }}>
          Browse verified professionals in your city and get the perfect fit every time.
        </p>
        <Link to="/find-tailor" style={{
          background: "#c9a84c", color: "#2c1e0f", padding: "14px 36px",
          borderRadius: "12px", fontWeight: 700, fontSize: "14px",
          textDecoration: "none", display: "inline-block",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#b8943e"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#c9a84c"}>
          Browse Tailors →
        </Link>
      </section>
    </div>
  );
}
