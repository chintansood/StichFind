import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { DarkToggleNav } from "../pages/DarkToggleNav";

interface FormData { name: string; phone: string; emailid: string; pwd: string; userType: "customer" | "tailor"; }
interface Errors { name?: string; phone?: string; emailid?: string; pwd?: string; }

const theme = {
  light: {
    pageBg: "#fdf8f3", cardBg: "#ffffff", cardBorder: "#ede5d8",
    cardShadow: "0 4px 40px rgba(139,115,85,0.1)",
    title: "#2c1e0f", sub: "#a0917e", label: "#6b5a42",
    inputBg: "#fdf8f3", inputText: "#2c1e0f", inputBorder: "#e8e0d5",
    accent: "#8b7355", accentHover: "#6b5a42",
    leftBg: "linear-gradient(160deg,#3d2e1e 0%,#5c4433 50%,#7a5c3f 100%)",
    brandTitle: "#fef3e2", brandSub: "rgba(254,243,226,0.65)",
  },
  dark: {
    pageBg: "#1a1209", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    cardShadow: "0 4px 40px rgba(0,0,0,0.4)",
    title: "#fef3e2", sub: "#8b7355", label: "#c4a882",
    inputBg: "#2c1e0f", inputText: "#fef3e2", inputBorder: "#3d2e1e",
    accent: "#c4a882", accentHover: "#d4b892",
    leftBg: "linear-gradient(160deg,#0f0a05 0%,#1e150a 50%,#2a1c0f 100%)",
    brandTitle: "#fef3e2", brandSub: "rgba(254,243,226,0.5)",
  },
};

const Signup = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", emailid: "", pwd: "", userType: "customer" });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    let e: Errors = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) e.phone = "Must be 10 digits";
    if (!formData.emailid.trim()) e.emailid = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.emailid)) e.emailid = "Invalid email";
    if (!formData.pwd) e.pwd = "Password is required";
    else if (formData.pwd.length < 6) e.pwd = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    try {
      const res = await api.post("/user/signup", formData);
      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", res.data.user.userType);
        navigate(res.data.user.userType === "customer" ? "/customer/CustomerDashboard" : "/tailor/TailorDashboard");
      } else alert(res.data.msg);
    } catch { alert("Signup failed. Please try again."); }
  };

  const inp = (err?: string): React.CSSProperties => ({
    width: "100%", padding: "12px 14px",
    border: `1.5px solid ${err ? "#e05555" : t.inputBorder}`,
    borderRadius: "10px", fontSize: "14px", color: t.inputText,
    background: t.inputBg, boxSizing: "border-box", transition: "border-color 0.2s",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: t.pageBg, fontFamily: "'DM Sans',sans-serif", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        input::placeholder { color: #c4b8a8; }
        input:focus { outline: none; }
        button:active { transform: scale(0.98); }
        .signup-left { display: flex; }
        @media (max-width: 700px) { .signup-left { display: none !important; } }
      `}</style>

      <DarkToggleNav dark={dark} onToggle={() => setDark(!dark)} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left panel */}
        <div className="signup-left" style={{ width: "42%", background: t.leftBg, alignItems: "center", justifyContent: "center", padding: "48px", overflow: "hidden" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "52px", color: "rgba(255,235,180,0.6)", display: "block", marginBottom: "16px" }}>✂</span>
            <h1 style={{ fontFamily: "'Lora',serif", fontSize: "34px", color: t.brandTitle, fontWeight: 600, margin: "0 0 12px" }}>StitchFind</h1>
            <p style={{ color: t.brandSub, fontSize: "14px", lineHeight: 1.7, margin: "0 0 24px", maxWidth: "270px" }}>Connect customers with professional tailors. Manage and grow your tailoring business.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {["✂ Tailors", "📍 Local", "⭐ Rated", "🧵 Verified"].map(tag => (
                <span key={tag} style={{ background: "rgba(254,243,226,0.12)", color: "rgba(254,243,226,0.8)", fontSize: "12px", padding: "5px 12px", borderRadius: "20px", border: "1px solid rgba(254,243,226,0.2)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", overflowY: "auto" }}>
          <div className="fade-up" style={{ width: "100%", maxWidth: "420px", background: t.cardBg, borderRadius: "20px", padding: "clamp(24px, 5vw, 40px)", boxShadow: t.cardShadow, border: `1px solid ${t.cardBorder}`, transition: "background 0.3s" }}>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "24px", color: t.title, fontWeight: 600, margin: "0 0 4px" }}>Create account</h2>
            <p style={{ color: t.sub, fontSize: "13px", margin: "0 0 24px" }}>Join thousands of tailors and customers</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {([["name", "Full Name", "text", "Ram Jain"], ["phone", "Phone Number", "tel", "9876543210"], ["emailid", "Email", "email", "you@example.com"], ["pwd", "Password", "password", "••••••••"]] as [keyof FormData, string, string, string][]).map(([name, label, type, ph]) => (
                <div key={name}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: t.label, marginBottom: "5px" }}>{label}</label>
                  <input name={name} type={type} value={formData[name] as string} onChange={handleChange} placeholder={ph}
                    style={inp(errors[name as keyof Errors])}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = errors[name as keyof Errors] ? "#e05555" : t.inputBorder} />
                  {errors[name as keyof Errors] && <p style={{ color: "#e05555", fontSize: "11px", marginTop: "4px" }}>{errors[name as keyof Errors]}</p>}
                </div>
              ))}

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: t.label, marginBottom: "6px" }}>I am a</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {(["customer", "tailor"] as const).map(role => (
                    <button key={role} onClick={() => setFormData({ ...formData, userType: role })}
                      style={{ padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: "1.5px solid transparent", transition: "all 0.2s", ...(formData.userType === role ? { background: t.accent, color: "#fef3e2", borderColor: t.accent } : { background: "transparent", color: t.accent, borderColor: t.inputBorder }) }}>
                      {role === "customer" ? "👤 Customer" : "✂ Tailor"}
                    </button>
                  ))}
                </div>
              </div>

              <button style={{ width: "100%", padding: "13px", background: t.accent, color: "#fef3e2", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                onClick={handleSignup}
                onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                onMouseLeave={e => e.currentTarget.style.background = t.accent}>
                Create Account
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "13px", color: t.sub, marginTop: "24px" }}>
              Already have an account? <Link to="/login" style={{ color: t.accent, fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;