import { useState } from "react";
import axios from "axios";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi",
];

export default function CustomerProfile() {
  const [isExisting, setIsExisting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    email: "", name: "", address: "", city: "", state: "", gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!form.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";
    if (!form.name) return "Name is required";
    if (!form.city) return "City is required";
    if (!form.state) return "State is required";
    if (!form.gender) return "Gender is required";
    return null;
  };

  const buildFormData = () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (profileFile) fd.append("profilepic", profileFile);
    return fd;
  };

  const handleFind = async () => {
    if (!form.email) return alert("Enter email to search");
    try {
      const res = await axios.post("http://localhost:3000/customer/find", { email: form.email });
      if (res.data.status) {
        const d = res.data.doc;
        setForm({ email: d.email, name: d.name, address: d.address, city: d.city, state: d.state, gender: d.gender });
        if (d.profilePic) setProfileImage(d.profilePic);
        setIsExisting(true);
        alert("Customer found ✅");
      } else {
        alert("Customer not found");
        setIsExisting(false);
      }
    } catch { alert("Error finding customer"); }
  };

  const handleSave = async () => {
    const err = validate(); if (err) return alert(err);
    try {
      const res = await axios.post("http://localhost:3000/customer/create", buildFormData());
      alert(res.data.msg);
      setIsExisting(true);
    } catch { alert("Error saving profile"); }
  };

  const handleUpdate = async () => {
    const err = validate(); if (err) return alert(err);
    try {
      const res = await axios.post("http://localhost:3000/customer/update", buildFormData());
      alert(res.data.msg);
    } catch { alert("Error updating profile"); }
  };

  const handleDelete = async () => {
    if (!form.email) return alert("Enter email to delete");
    if (!window.confirm("Delete this profile?")) return;
    try {
      const res = await axios.post("http://localhost:3000/customer/delete", { email: form.email });
      alert(res.data.msg);
      setForm({ email:"", name:"", address:"", city:"", state:"", gender:"" });
      setProfileImage(null);
      setIsExisting(false);
    } catch { alert("Error deleting profile"); }
  };

  const inp = "w-full px-4 py-3 border border-[#e8e0d5] rounded-xl text-sm text-[#2c1e0f] bg-[#fdf8f3] focus:outline-none focus:border-[#8b7355] transition placeholder-[#c4b8a8]";
  const lbl = "block text-[10px] font-semibold text-[#6b5a42] uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-[#fdf8f3] py-10 px-4 relative" style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease both}
        input::placeholder,textarea::placeholder{color:#c4b8a8}
        select{appearance:none}
        input:focus,select:focus{outline:none}
        button:active{transform:scale(0.98)}
      `}</style>

      {/* Dot texture */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(139,115,85,0.05) 1px,transparent 1px)", backgroundSize:"24px 24px" }} />

      <div className="relative z-10 max-w-5xl mx-auto fade-up">
        <div className="bg-white rounded-3xl border border-[#ede5d8] overflow-hidden" style={{ boxShadow:"0 8px 48px rgba(139,115,85,0.1)" }}>

          <div className="flex flex-col lg:flex-row">

            {/* ── LEFT PANEL ── */}
            <div className="lg:w-5/12 flex flex-col items-center justify-center p-10 text-center" style={{
              background: "linear-gradient(160deg, #3d2e1e 0%, #5c4433 50%, #7a5c3f 100%)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Dot pattern */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(254,243,226,0.07) 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
              {/* Scissors */}
              <span className="absolute text-[#fef3e2] text-6xl opacity-[0.05] select-none" style={{ top:"8%", left:"6%", transform:"rotate(20deg)" }}>✂</span>
              <span className="absolute text-[#fef3e2] text-6xl opacity-[0.05] select-none" style={{ bottom:"10%", right:"5%", transform:"rotate(-30deg)" }}>✂</span>

              <div className="relative z-10">
                {/* Avatar */}
                <div className="relative inline-block mb-5">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 mx-auto" style={{ borderColor:"rgba(240,201,122,0.5)", boxShadow:"0 8px 24px rgba(0,0,0,0.2)" }}>
                    {profileImage
                      ? <img src={profileImage} className="w-full h-full object-cover" alt="profile" />
                      : <div className="w-full h-full flex flex-col items-center justify-center" style={{ background:"rgba(254,243,226,0.1)" }}>
                          <span style={{ fontSize:"36px", opacity:0.5 }}>👤</span>
                        </div>
                    }
                  </div>
                  <label className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-2 border-white/20"
                    style={{ background:"linear-gradient(135deg,#c9a84c,#8b7355)" }}>
                    <span style={{ fontSize:"14px" }}>📷</span>
                    <input type="file" hidden accept="image/*" onChange={handleImage} />
                  </label>
                </div>

                {/* Name */}
                <h3 style={{ fontFamily:"'Lora',serif", fontSize:"20px", fontWeight:600, color:"#fef3e2", marginBottom:"4px" }}>
                  {form.name || "Customer Name"}
                </h3>

                {/* Details */}
                <div style={{ marginBottom:"16px" }}>
                  {(form.city||form.state) && <p style={{ fontSize:"12px", color:"rgba(254,243,226,0.55)", marginBottom:"2px" }}>📍 {form.city}{form.city&&form.state?", ":""}{form.state}</p>}
                  {form.gender && <p style={{ fontSize:"12px", color:"rgba(254,243,226,0.55)", marginBottom:"2px" }}>👤 {form.gender}</p>}
                  {form.email && <p style={{ fontSize:"11px", color:"rgba(254,243,226,0.4)" }}>✉ {form.email}</p>}
                </div>

                {/* Status badge */}
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  padding:"5px 14px", borderRadius:"20px",
                  background:"rgba(254,243,226,0.1)", border:"1px solid rgba(254,243,226,0.2)",
                }}>
                  <span style={{ width:"7px", height:"7px", borderRadius:"50%", background: isExisting?"#4ade80":"#f0c97a", display:"block" }} />
                  <span style={{ fontSize:"11px", color: isExisting?"#4ade80":"#f0c97a", letterSpacing:"0.5px" }}>
                    {isExisting ? "Existing Client" : "New Client"}
                  </span>
                </div>

                <div style={{ marginTop:"20px", display:"flex", gap:"6px", justifyContent:"center", flexWrap:"wrap" }}>
                  {["🛍️ Client","✂️ Tailoring","⭐ Verified"].map(t=>(
                    <span key={t} style={{
                      fontSize:"11px", padding:"4px 12px", borderRadius:"20px",
                      background:"rgba(254,243,226,0.1)", border:"1px solid rgba(254,243,226,0.15)",
                      color:"rgba(254,243,226,0.7)",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="flex-1 p-8 lg:p-10 overflow-y-auto" style={{ maxHeight:"90vh" }}>
              <div style={{ marginBottom:"28px" }}>
                <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"3px", color:"#8b7355", textTransform:"uppercase", marginBottom:"6px" }}>Manage Profile</p>
                <h2 style={{ fontFamily:"'Lora',serif", fontSize:"28px", fontWeight:700, color:"#2c1e0f", marginBottom:"4px" }}>Customer Profile</h2>
                <p style={{ fontSize:"13px", color:"#a0917e" }}>Search existing or create a new customer record</p>
              </div>

              <div style={{ height:"1px", background:"#ede5d8", marginBottom:"24px" }} />

              {/* Email + Search */}
              <div style={{ marginBottom:"18px" }}>
                <label className={lbl}>Email Address</label>
                <div style={{ display:"flex", gap:"10px" }}>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="customer@example.com" className={`${inp} flex-1`} />
                  <button onClick={handleFind} style={{
                    padding:"10px 20px", background:"#8b7355", color:"#fef3e2",
                    border:"none", borderRadius:"12px", fontSize:"13px",
                    fontWeight:600, cursor:"pointer", whiteSpace:"nowrap",
                    transition:"background 0.2s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
                    onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
                    🔍 Search
                  </button>
                </div>
              </div>

              {/* Name */}
              <div style={{ marginBottom:"18px" }}>
                <label className={lbl}>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className={inp} />
              </div>

              {/* Address */}
              <div style={{ marginBottom:"18px" }}>
                <label className={lbl}>Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" className={inp} />
              </div>

              {/* City + State */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"18px" }}>
                <div>
                  <label className={lbl}>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inp} />
                </div>
                <div>
                  <label className={lbl}>State</label>
                  <div style={{ position:"relative" }}>
                    <select name="state" value={form.state} onChange={handleChange} className={inp} style={{ cursor:"pointer", paddingRight:"32px" }}>
                      <option value="">Select state...</option>
                      {STATES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                    <span style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", color:"#a0917e", pointerEvents:"none", fontSize:"12px" }}>▾</span>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div style={{ marginBottom:"28px" }}>
                <label className={lbl}>Gender</label>
                <div style={{ position:"relative" }}>
                  <select name="gender" value={form.gender} onChange={handleChange} className={inp} style={{ cursor:"pointer", paddingRight:"32px" }}>
                    <option value="">Select gender...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <span style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", color:"#a0917e", pointerEvents:"none", fontSize:"12px" }}>▾</span>
                </div>
              </div>

              {/* Action Buttons */}
              {!isExisting ? (
                <button onClick={handleSave} style={{
                  width:"100%", padding:"14px", background:"#8b7355", color:"#fef3e2",
                  border:"none", borderRadius:"12px", fontSize:"14px", fontWeight:700,
                  cursor:"pointer", transition:"background 0.2s", letterSpacing:"0.3px",
                }}
                  onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
                  onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
                  💾 Save Profile
                </button>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                  <button onClick={handleUpdate} style={{
                    padding:"13px", background:"#8b7355", color:"#fef3e2",
                    border:"none", borderRadius:"12px", fontSize:"14px", fontWeight:600,
                    cursor:"pointer", transition:"background 0.2s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
                    onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
                    ✏️ Update
                  </button>
                  <button onClick={handleDelete} style={{
                    padding:"13px", background:"rgba(239,68,68,0.08)",
                    color:"#ef4444", border:"1.5px solid rgba(239,68,68,0.25)",
                    borderRadius:"12px", fontSize:"14px", fontWeight:600, cursor:"pointer",
                    transition:"background 0.2s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.14)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.08)"}>
                    🗑 Delete
                  </button>
                </div>
              )}

              {/* Footer */}
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginTop:"28px" }}>
                <div style={{ flex:1, height:"1px", background:"#ede5d8" }} />
                <span style={{ fontFamily:"'Lora',serif", fontSize:"11px", color:"#c4b8a8", letterSpacing:"2px" }}>✂ STITCHFIND</span>
                <div style={{ flex:1, height:"1px", background:"#ede5d8" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
