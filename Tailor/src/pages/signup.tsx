import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormData { name:string; phone:string; emailid:string; pwd:string; userType:"customer"|"tailor"; }
interface Errors { name?:string; phone?:string; emailid?:string; pwd?:string; }

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ name:"", phone:"", emailid:"", pwd:"", userType:"customer" });
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
    const res = await axios.post("http://localhost:3000/user/signup", formData);

    if (res.data.status) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", res.data.user.userType);

      navigate(
        res.data.user.userType === "customer"
          ? "/customer/CustomerDashboard"
          : "/tailor/TailorDashboard"
      );
    } else {
      alert(res.data.msg);
    }
  } catch {
    alert("Signup failed. Please try again.");
  }
};

  const inputStyle = (err?: string): React.CSSProperties => ({
    width:"100%", padding:"12px 14px", border:`1.5px solid ${err?"#e57373":"#e8e0d5"}`,
    borderRadius:"10px", fontSize:"14px", color:"#2c1e0f", background:"#fdf8f3",
    boxSizing:"border-box" as const, transition:"border-color 0.2s",
  });

  return (
    <div style={s.page}>
      <style>{css}</style>
      <div style={s.left}>
        <div style={s.brand}>
          <span style={s.scissor}>✂</span>
          <h1 style={s.brandTitle}>StitchFind</h1>
          <p style={s.brandSub}>Connect customers with professional tailors. Manage and grow your tailoring business.</p>
          <div style={s.pillRow}>
            {["✂ Tailors","📍 Local","⭐ Rated","🧵 Verified"].map(t=>(
              <span key={t} style={s.pill}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={s.right}>
        <div style={s.card} className="fade-up">
          <h2 style={s.cardTitle}>Create account</h2>
          <p style={s.cardSub}>Join thousands of tailors and customers</p>

          <div style={s.fields}>
            {([["name","Full Name","text","Ram Jain"],["phone","Phone Number","tel","9876543210"],["emailid","Email","email","you@example.com"],["pwd","Password","password","••••••••"]] as [keyof FormData,string,string,string][]).map(([name,label,type,ph])=>(
              <div key={name}>
                <label style={s.label}>{label}</label>
                <input name={name} type={type} value={formData[name] as string} onChange={handleChange} placeholder={ph}
                  style={inputStyle(errors[name as keyof Errors])}
                  onFocus={e=>e.target.style.borderColor="#8b7355"}
                  onBlur={e=>e.target.style.borderColor=errors[name as keyof Errors]?"#e57373":"#e8e0d5"} />
                {errors[name as keyof Errors] && <p style={s.err}>{errors[name as keyof Errors]}</p>}
              </div>
            ))}

            <div>
              <label style={s.label}>I am a</label>
              <div style={s.toggleRow}>
                {(["customer","tailor"] as const).map(role=>(
                  <button key={role} onClick={()=>setFormData({...formData,userType:role})}
                    style={{...s.toggleBtn, ...(formData.userType===role ? s.toggleActive : s.toggleInactive)}}>
                    {role==="customer" ? "👤 Customer" : "✂ Tailor"}
                  </button>
                ))}
              </div>
            </div>

            <button style={s.btn} onClick={handleSignup}
              onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
              onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
              Create Account
            </button>
          </div>

          <p style={s.foot}>Already have an account? <Link to="/login" style={s.link}>Sign in</Link></p>
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
  left:{ width:"42%", background:"linear-gradient(160deg,#3d2e1e 0%,#5c4433 50%,#7a5c3f 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"48px", position:"relative", overflow:"hidden" },
  brand:{ position:"relative", zIndex:1, textAlign:"center" },
  scissor:{ fontSize:"52px", color:"rgba(255,235,180,0.6)", display:"block", marginBottom:"16px" },
  brandTitle:{ fontFamily:"'Lora',serif", fontSize:"34px", color:"#fef3e2", fontWeight:600, margin:"0 0 12px" },
  brandSub:{ color:"rgba(254,243,226,0.65)", fontSize:"14px", lineHeight:1.7, margin:"0 0 24px", maxWidth:"270px" },
  pillRow:{ display:"flex", flexWrap:"wrap" as const, gap:"8px", justifyContent:"center" },
  pill:{ background:"rgba(254,243,226,0.12)", color:"rgba(254,243,226,0.8)", fontSize:"12px", padding:"5px 12px", borderRadius:"20px", border:"1px solid rgba(254,243,226,0.2)" },
  right:{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px", background:"#fdf8f3", overflowY:"auto" as const },
  card:{ width:"100%", maxWidth:"420px", background:"#ffffff", borderRadius:"20px", padding:"40px", boxShadow:"0 4px 40px rgba(139,115,85,0.1)", border:"1px solid #ede5d8" },
  cardTitle:{ fontFamily:"'Lora',serif", fontSize:"24px", color:"#2c1e0f", fontWeight:600, margin:"0 0 4px" },
  cardSub:{ color:"#a0917e", fontSize:"13px", margin:"0 0 24px" },
  fields:{ display:"flex", flexDirection:"column", gap:"16px" },
  label:{ display:"block", fontSize:"12px", fontWeight:500, color:"#6b5a42", marginBottom:"5px" },
  btn:{ width:"100%", padding:"13px", background:"#8b7355", color:"#fef3e2", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:600, cursor:"pointer", transition:"background 0.2s" },
  err:{ color:"#c0392b", fontSize:"11px", marginTop:"4px" },
  foot:{ textAlign:"center" as const, fontSize:"13px", color:"#a0917e", marginTop:"24px" },
  link:{ color:"#8b7355", fontWeight:600, textDecoration:"none" },
  toggleRow:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" },
  toggleBtn:{ padding:"10px", borderRadius:"10px", fontSize:"13px", fontWeight:600, cursor:"pointer", border:"1.5px solid transparent", transition:"all 0.2s" },
  toggleActive:{ background:"#8b7355", color:"#fef3e2", borderColor:"#8b7355" },
  toggleInactive:{ background:"transparent", color:"#8b7355", borderColor:"#e8e0d5" },
};

export default Signup;
