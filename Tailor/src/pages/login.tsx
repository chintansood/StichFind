import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { DarkToggleNav } from "../pages/DarkToggleNav";

interface FormData { emailid: string; pwd: string; }
interface Errors { emailid?: string; pwd?: string; }

const theme = {
  light: {
    pageBg: "#fdf8f3", cardBg: "#ffffff", cardBorder: "#ede5d8",
    cardShadow: "0 4px 40px rgba(139,115,85,0.1)",
    title: "#2c1e0f", sub: "#a0917e", label: "#6b5a42",
    inputBg: "#fdf8f3", inputText: "#2c1e0f", inputBorder: "#e8e0d5",
    accent: "#8b7355", accentHover: "#6b5a42",
    leftBg: "linear-gradient(160deg,#3d2e1e 0%,#5c4433 50%,#7a5c3f 100%)",
    brandTitle: "#fef3e2", brandSub: "rgba(254,243,226,0.65)", dot: "#fef3e2",
  },
  dark: {
    pageBg: "#1a1209", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    cardShadow: "0 4px 40px rgba(0,0,0,0.4)",
    title: "#fef3e2", sub: "#8b7355", label: "#c4a882",
    inputBg: "#2c1e0f", inputText: "#fef3e2", inputBorder: "#3d2e1e",
    accent: "#c4a882", accentHover: "#d4b892",
    leftBg: "linear-gradient(160deg,#0f0a05 0%,#1e150a 50%,#2a1c0f 100%)",
    brandTitle: "#fef3e2", brandSub: "rgba(254,243,226,0.5)", dot: "#fef3e2",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;
  const [formData, setFormData] = useState<FormData>({ emailid: "", pwd: "" });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    let e: Errors = {};
    if (!formData.emailid.trim()) e.emailid = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.emailid)) e.emailid = "Invalid email";
    if (!formData.pwd) e.pwd = "Password is required";
    else if (formData.pwd.length < 6) e.pwd = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      const res = await api.post("/user/login", formData);
      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", res.data.user.userType);
        navigate(res.data.user.userType === "customer" ? "/customer/CustomerDashboard" : "/tailor/TailorDashboard");
      } else alert(res.data.message);
    } catch { alert("Error occurred"); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: t.pageBg, fontFamily: "'DM Sans',sans-serif", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        input::placeholder { color: #c4b8a8; }
        input:focus { outline: none; }
        button:active { transform: scale(0.98); }
        .login-left { display: flex; }
        @media (max-width: 700px) { .login-left { display: none !important; } }
      `}</style>

      <DarkToggleNav dark={dark} onToggle={() => setDark(!dark)} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left panel */}
        <div className="login-left" style={{ width: "45%", background: t.leftBg, alignItems: "center", justifyContent: "center", padding: "48px", position: "relative", overflow: "hidden" }}>
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "56px", color: "rgba(255,235,180,0.6)", marginBottom: "16px" }}>✂</div>
            <h1 style={{ fontFamily: "'Lora',serif", fontSize: "36px", color: t.brandTitle, fontWeight: 600, margin: "0 0 12px" }}>StitchFind</h1>
            <p style={{ color: t.brandSub, fontSize: "15px", lineHeight: 1.7, maxWidth: "280px" }}>Connect with skilled tailors and bring your fashion ideas to life.</p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "32px" }}>
              {[0,1,2,3,4,5,6,7].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.dot, opacity: i % 2 === 0 ? 0.6 : 0.3 }} />)}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", overflowY: "auto" }}>
          <div className="fade-up" style={{ width: "100%", maxWidth: "400px", background: t.cardBg, borderRadius: "20px", padding: "clamp(24px, 5vw, 40px)", boxShadow: t.cardShadow, border: `1px solid ${t.cardBorder}`, transition: "background 0.3s" }}>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "26px", color: t.title, fontWeight: 600, margin: "0 0 4px" }}>Welcome back</h2>
            <p style={{ color: t.sub, fontSize: "14px", margin: "0 0 28px" }}>Sign in to your account</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: t.label, marginBottom: "6px" }}>Email address</label>
                <input name="emailid" type="email" value={formData.emailid} onChange={handleChange} placeholder="you@example.com"
                  style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${t.inputBorder}`, borderRadius: "10px", fontSize: "14px", color: t.inputText, background: t.inputBg, boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder} />
                {errors.emailid && <p style={{ color: "#e05555", fontSize: "11px", marginTop: "4px" }}>{errors.emailid}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: t.label, marginBottom: "6px" }}>Password</label>
                <input name="pwd" type="password" value={formData.pwd} onChange={handleChange} placeholder="••••••••"
                  style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${t.inputBorder}`, borderRadius: "10px", fontSize: "14px", color: t.inputText, background: t.inputBg, boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder} />
                {errors.pwd && <p style={{ color: "#e05555", fontSize: "11px", marginTop: "4px" }}>{errors.pwd}</p>}
              </div>
              <button style={{ width: "100%", padding: "13px", background: t.accent, color: "#fef3e2", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                onClick={handleLogin}
                onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                onMouseLeave={e => e.currentTarget.style.background = t.accent}>
                Sign In
              </button>
            </div>
            <p style={{ textAlign: "center", fontSize: "13px", color: t.sub, marginTop: "24px" }}>
              Don't have an account? <Link to="/" style={{ color: t.accent, fontWeight: 600, textDecoration: "none" }}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;