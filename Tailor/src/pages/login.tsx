import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

interface FormData { emailid: string; pwd: string; }
interface Errors { emailid?: string; pwd?: string; }

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ emailid: "", pwd: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [dark, setDark] = useState(false);

  const t = dark ? theme.dark : theme.light;

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
        const role = res.data.user.userType;
        navigate(role === "customer" ? "/customer/CustomerDashboard" : "/tailor/TailorDashboard");
      } else alert(res.data.message);
    } catch { alert("Error occurred"); }
  };

  return (
    <div style={{ ...s.page, background: t.pageBg }}>
      <style>{css}</style>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        style={{ ...s.themeBtn, background: t.toggleBg, color: t.toggleColor, border: `1px solid ${t.toggleBorder}` }}
        title="Toggle dark mode"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Left Panel */}
      <div style={{ ...s.left, background: t.leftBg }} className="left-panel">
        <div style={s.brand}>
          <div style={s.scissor}>✂</div>
          <h1 style={{ ...s.brandTitle, color: t.brandTitle }}> StitchFind</h1>
          <p style={{ ...s.brandSub, color: t.brandSub }}>
            Connect with skilled tailors and bring your fashion ideas to life.
          </p>
          <div style={s.dots}>
            {[0,1,2,3,4,5,6,7].map(i => (
              <div key={i} style={{ ...s.dot, opacity: i % 2 === 0 ? 0.6 : 0.3, background: t.dot }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ ...s.right, background: t.pageBg }}>
        <div style={{ ...s.card, background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }} className="fade-up">
          <h2 style={{ ...s.cardTitle, color: t.title }}>Welcome back</h2>
          <p style={{ ...s.cardSub, color: t.sub }}>Sign in to your account</p>

          <div style={s.fields}>
            <div>
              <label style={{ ...s.label, color: t.label }}>Email address</label>
              <input
                name="emailid" type="email" value={formData.emailid}
                onChange={handleChange} placeholder="you@example.com"
                style={{ ...s.input, background: t.inputBg, color: t.inputText, border: `1.5px solid ${t.inputBorder}` }}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.inputBorder}
              />
              {errors.emailid && <p style={s.err}>{errors.emailid}</p>}
            </div>
            <div>
              <label style={{ ...s.label, color: t.label }}>Password</label>
              <input
                name="pwd" type="password" value={formData.pwd}
                onChange={handleChange} placeholder="••••••••"
                style={{ ...s.input, background: t.inputBg, color: t.inputText, border: `1.5px solid ${t.inputBorder}` }}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.inputBorder}
              />
              {errors.pwd && <p style={s.err}>{errors.pwd}</p>}
            </div>
            <button
              style={{ ...s.btn, background: t.accent }}
              onClick={handleLogin}
              onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
              onMouseLeave={e => e.currentTarget.style.background = t.accent}
            >
              Sign In
            </button>
          </div>

          <p style={{ ...s.foot, color: t.sub }}>
            Don't have an account?{" "}
            <Link to="/" style={{ ...s.link, color: t.accent }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
  .fade-up { animation: fadeUp 0.5s ease both }
  input::placeholder { color: #c4b8a8 }
  input:focus { outline: none }
  button:active { transform: scale(0.98) }

  @media (max-width: 768px) {
    .left-panel { display: none !important; }
  }
`;

const theme = {
  light: {
    pageBg: "#fdf8f3",
    leftBg: "linear-gradient(160deg,#3d2e1e 0%,#5c4433 50%,#7a5c3f 100%)",
    cardBg: "#ffffff",
    cardBorder: "#ede5d8",
    cardShadow: "0 4px 40px rgba(139,115,85,0.1)",
    title: "#2c1e0f",
    sub: "#a0917e",
    label: "#6b5a42",
    inputBg: "#fdf8f3",
    inputText: "#2c1e0f",
    inputBorder: "#e8e0d5",
    accent: "#8b7355",
    accentHover: "#6b5a42",
    brandTitle: "#fef3e2",
    brandSub: "rgba(254,243,226,0.65)",
    dot: "#fef3e2",
    toggleBg: "#fff",
    toggleColor: "#3d2e1e",
    toggleBorder: "#e8e0d5",
  },
  dark: {
    pageBg: "#1a1209",
    leftBg: "linear-gradient(160deg,#0f0a05 0%,#1e150a 50%,#2a1c0f 100%)",
    cardBg: "#231a0f",
    cardBorder: "#3d2e1e",
    cardShadow: "0 4px 40px rgba(0,0,0,0.4)",
    title: "#fef3e2",
    sub: "#8b7355",
    label: "#c4a882",
    inputBg: "#2c1e0f",
    inputText: "#fef3e2",
    inputBorder: "#3d2e1e",
    accent: "#c4a882",
    accentHover: "#d4b892",
    brandTitle: "#fef3e2",
    brandSub: "rgba(254,243,226,0.5)",
    dot: "#fef3e2",
    toggleBg: "#2c1e0f",
    toggleColor: "#fef3e2",
    toggleBorder: "#3d2e1e",
  },
};

const s: Record<string, React.CSSProperties> = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", position: "relative" },
  themeBtn: {
    position: "fixed", top: "16px", right: "16px", zIndex: 100,
    padding: "8px 16px", borderRadius: "20px", fontSize: "13px",
    fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
  },
  left: {
    width: "45%", display: "flex", alignItems: "center",
    justifyContent: "center", padding: "48px",
    position: "relative", overflow: "hidden",
  },
  brand: { position: "relative", zIndex: 1, textAlign: "center" },
  scissor: { fontSize: "56px", color: "rgba(255,235,180,0.6)", display: "block", marginBottom: "16px" },
  brandTitle: { fontFamily: "'Lora',serif", fontSize: "36px", fontWeight: 600, margin: "0 0 12px" },
  brandSub: { fontSize: "15px", lineHeight: 1.7, margin: 0, maxWidth: "280px" },
  dots: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "32px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%" },
  right: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" },
  card: { width: "100%", maxWidth: "400px", borderRadius: "20px", padding: "40px" },
  cardTitle: { fontFamily: "'Lora',serif", fontSize: "26px", fontWeight: 600, margin: "0 0 4px" },
  cardSub: { fontSize: "14px", margin: "0 0 28px" },
  fields: { display: "flex", flexDirection: "column", gap: "18px" },
  label: { display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "6px", letterSpacing: "0.3px" },
  input: { width: "100%", padding: "12px 14px", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box", transition: "border-color 0.2s" },
  btn: { width: "100%", padding: "13px", color: "#fef3e2", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s", letterSpacing: "0.3px" },
  err: { color: "#e05555", fontSize: "11px", marginTop: "4px" },
  foot: { textAlign: "center", fontSize: "13px", marginTop: "24px" },
  link: { fontWeight: 600, textDecoration: "none" },
};

export default Login;