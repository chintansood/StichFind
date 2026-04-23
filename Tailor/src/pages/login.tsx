import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

interface FormData { emailid: string; pwd: string; }
interface Errors { emailid?: string; pwd?: string; }

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ emailid:"", pwd:"" });
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

const role = res.data.user.userType;

navigate(
  role === "customer"
    ? "/customer/CustomerDashboard"
    : "/tailor/TailorDashboard"
);
      } else alert(res.data.message);
    } catch { alert("Error occurred"); }
  };

  return (
    <div style={s.page}>
      <style>{css}</style>
      <div style={s.left}>
        <div style={s.brand}>
          <div style={s.scissor}>✂</div>
          <h1 style={s.brandTitle}>StitchFind</h1>
          <p style={s.brandSub}>Connect with skilled tailors and bring your fashion ideas to life.</p>
          <div style={s.dots}>
            {[0,1,2,3,4,5,6,7].map(i=><div key={i} style={{...s.dot, opacity: i%2===0?0.6:0.3}} />)}
          </div>
        </div>
      </div>
      <div style={s.right}>
        <div style={s.card} className="fade-up">
          <h2 style={s.cardTitle}>Welcome back</h2>
          <p style={s.cardSub}>Sign in to your account</p>
          <div style={s.fields}>
            <div>
              <label style={s.label}>Email address</label>
              <input name="emailid" type="email" value={formData.emailid} onChange={handleChange} placeholder="you@example.com" style={s.input} onFocus={e=>e.target.style.borderColor="#8b7355"} onBlur={e=>e.target.style.borderColor="#e8e0d5"} />
              {errors.emailid && <p style={s.err}>{errors.emailid}</p>}
            </div>
            <div>
              <label style={s.label}>Password</label>
              <input name="pwd" type="password" value={formData.pwd} onChange={handleChange} placeholder="••••••••" style={s.input} onFocus={e=>e.target.style.borderColor="#8b7355"} onBlur={e=>e.target.style.borderColor="#e8e0d5"} />
              {errors.pwd && <p style={s.err}>{errors.pwd}</p>}
            </div>
            <button style={s.btn} onClick={handleLogin} onMouseEnter={e=>(e.currentTarget.style.background="#6b5a42")} onMouseLeave={e=>(e.currentTarget.style.background="#8b7355")}>Sign In</button>
          </div>
          <p style={s.foot}>Don't have an account? <Link to="/" style={s.link}>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeUp 0.5s ease both}
  input::placeholder{color:#c4b8a8}
  input:focus{outline:none}
  button:active{transform:scale(0.98)}
`;

const s: Record<string,React.CSSProperties> = {
  page:{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", background:"#fdf8f3" },
  left:{ width:"45%", background:"linear-gradient(160deg,#3d2e1e 0%,#5c4433 50%,#7a5c3f 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"48px", position:"relative", overflow:"hidden" },
  brand:{ position:"relative", zIndex:1, textAlign:"center" },
  scissor:{ fontSize:"56px", color:"rgba(255,235,180,0.6)", display:"block", marginBottom:"16px" },
  brandTitle:{ fontFamily:"'Lora',serif", fontSize:"36px", color:"#fef3e2", fontWeight:600, margin:"0 0 12px" },
  brandSub:{ color:"rgba(254,243,226,0.65)", fontSize:"15px", lineHeight:1.7, margin:0, maxWidth:"280px" },
  dots:{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"32px" },
  dot:{ width:"8px", height:"8px", borderRadius:"50%", background:"#fef3e2" },
  right:{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px", background:"#fdf8f3" },
  card:{ width:"100%", maxWidth:"400px", background:"#ffffff", borderRadius:"20px", padding:"40px", boxShadow:"0 4px 40px rgba(139,115,85,0.1)", border:"1px solid #ede5d8" },
  cardTitle:{ fontFamily:"'Lora',serif", fontSize:"26px", color:"#2c1e0f", fontWeight:600, margin:"0 0 4px" },
  cardSub:{ color:"#a0917e", fontSize:"14px", margin:"0 0 28px" },
  fields:{ display:"flex", flexDirection:"column", gap:"18px" },
  label:{ display:"block", fontSize:"12px", fontWeight:500, color:"#6b5a42", marginBottom:"6px", letterSpacing:"0.3px" },
  input:{ width:"100%", padding:"12px 14px", border:"1.5px solid #e8e0d5", borderRadius:"10px", fontSize:"14px", color:"#2c1e0f", background:"#fdf8f3", boxSizing:"border-box" as const, transition:"border-color 0.2s" },
  btn:{ width:"100%", padding:"13px", background:"#8b7355", color:"#fef3e2", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:600, cursor:"pointer", transition:"background 0.2s", letterSpacing:"0.3px" },
  err:{ color:"#c0392b", fontSize:"11px", marginTop:"4px" },
  foot:{ textAlign:"center" as const, fontSize:"13px", color:"#a0917e", marginTop:"24px" },
  link:{ color:"#8b7355", fontWeight:600, textDecoration:"none" },
};

export default Login;
