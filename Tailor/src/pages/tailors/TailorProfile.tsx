import { useState } from "react";
import api from "../../api/axios";

type Tab = "personal" | "professional" | "contact";

const theme = {
  light: {
    pageBg: "#fdf8f3", cardBg: "#ffffff", cardBorder: "#ede5d8",
    title: "#2c1e0f", sub: "#a0917e", label: "#6b5a42",
    inputBg: "#fdf8f3", inputText: "#2c1e0f", inputBorder: "#e8e0d5",
    accent: "#8b7355", accentHover: "#6b5a42",
    tabActive: "#8b7355", tabInactive: "#a0917e",
    tabActiveBg: "#fdf8f3", tabBorder: "#ede5d8",
    shopBoxBg: "#fdf8f3", shopBoxBorder: "#e8e0d5",
    aadhaarBoxBg: "#fdf8f3", aadhaarBoxBorder: "#e8e0d5",
    profileCircleBorder: "#e8e0d5", profileCircleBg: "#fdf8f3",
    profilePlaceholder: "#c4b8a8",
    toggleBg: "#fff", toggleColor: "#3d2e1e", toggleBorder: "#e8e0d5",
  },
  dark: {
    pageBg: "#1a1209", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    title: "#fef3e2", sub: "#8b7355", label: "#c4a882",
    inputBg: "#2c1e0f", inputText: "#fef3e2", inputBorder: "#3d2e1e",
    accent: "#c4a882", accentHover: "#d4b892",
    tabActive: "#c4a882", tabInactive: "#6b5a42",
    tabActiveBg: "#2c1e0f", tabBorder: "#3d2e1e",
    shopBoxBg: "#2c1e0f", shopBoxBorder: "#3d2e1e",
    aadhaarBoxBg: "#2c1e0f", aadhaarBoxBorder: "#3d2e1e",
    profileCircleBorder: "#3d2e1e", profileCircleBg: "#2c1e0f",
    profilePlaceholder: "#6b5a42",
    toggleBg: "#2c1e0f", toggleColor: "#fef3e2", toggleBorder: "#3d2e1e",
  },
};

const TailorProfile = () => {
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;

  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [searchEmail, setSearchEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [aadhaarError, setAadhaarError] = useState("");
  const [personal, setPersonal] = useState({ fullName: "", aadhaar: "", dob: "", gender: "" });
  const [professional, setProfessional] = useState({ category: "", specialty: "", experience: "", website: "", workType: "", shopAddress: "", shopCity: "" });
  const [contact, setContact] = useState({ phone: "", city: "", address: "" });

  const token = localStorage.getItem("token");
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setProfileFile(file); setProfileImage(URL.createObjectURL(file));
  };

  const handleAadhaarImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setAadhaarError("");
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setAadhaarError("Only JPG or PNG allowed"); e.target.value = ""; return;
    }
    setAadhaarFile(file);
    const fd = new FormData(); fd.append("aadhaarcard", file);
    try {
      const res = await api.post("/tailor/aadhaar-ocr", fd, authConfig);
      if (res.data.status) {
        setPersonal(p => ({ ...p, aadhaar: res.data.data.aadhaar || "", dob: res.data.data.dob || "", gender: res.data.data.gender || "" }));
      } else setAadhaarError("Unable to extract Aadhaar details");
    } catch { setAadhaarError("Aadhaar OCR failed"); }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) return alert("Enter email to search");
    try {
      const res = await api.post("/tailor/search", { email: searchEmail }, authConfig);
      if (res.data.status) {
        const d = res.data.data;
        setPersonal({ fullName: d.fullName || "", aadhaar: d.aadhaar || "", dob: d.dob || "", gender: d.gender || "" });
        setProfessional({ category: d.category || "", specialty: d.specialty || "", experience: d.experience || "", website: d.website || "", workType: d.workType || "", shopAddress: d.shopAddress || "", shopCity: d.shopCity || "" });
        setContact({ phone: d.phone || "", city: d.city || "", address: d.address || "" });
        if (d.profileImage) setProfileImage(d.profileImage);
      }
    } catch { alert("Record not found"); }
  };

  const validate = () => {
    if (!searchEmail.trim()) { alert("Email required"); return false; }
    if (!personal.fullName.trim()) { alert("Full name required"); return false; }
    if (!professional.category) { alert("Category required"); return false; }
    if (!contact.phone || contact.phone.length !== 10) { alert("Valid 10-digit phone required"); return false; }
    if ((professional.workType === "Shop" || professional.workType === "Both") && (!professional.shopAddress || !professional.shopCity)) {
      alert("Shop address & city required"); return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const fd = new FormData();
    fd.append("email", searchEmail);
    Object.entries(personal).forEach(([k, v]) => fd.append(k, v));
    Object.entries(professional).forEach(([k, v]) => fd.append(k, v));
    Object.entries(contact).forEach(([k, v]) => fd.append(k, v));
    if (profileFile) fd.append("profilepic", profileFile);
    if (aadhaarFile) fd.append("aadhaarcard", aadhaarFile);
    try {
      const res = await api.post("/tailor/save-profile", fd, authConfig);
      if (res.data.status) alert("Profile saved ✅");
      else alert(res.data.msg);
    } catch { alert("Error saving profile"); }
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", border: `1.5px solid ${t.inputBorder}`,
    borderRadius: "12px", fontSize: "14px", color: t.inputText, background: t.inputBg,
    boxSizing: "border-box", transition: "border-color 0.2s", outline: "none",
    appearance: "none" as any,
  };

  const lbl: React.CSSProperties = {
    display: "block", fontSize: "11px", fontWeight: 600, color: t.label,
    textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
  };

  return (
    <div style={{ minHeight: "100vh", background: t.pageBg, padding: "40px 16px", fontFamily: "'DM Sans',sans-serif", position: "relative", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        input::placeholder, textarea::placeholder { color: #c4b8a8; }
        select { appearance: none; }
        button:active { transform: scale(0.99); }
        textarea { resize: none; font-family: 'DM Sans', sans-serif; }

        @media (max-width: 768px) {
          .profile-header { flex-direction: column !important; align-items: flex-start !important; }
          .search-row { flex-direction: column !important; width: 100% !important; }
          .search-row input { width: 100% !important; }
          .personal-grid { grid-template-columns: 1fr !important; }
          .shop-grid { grid-template-columns: 1fr !important; }
          .dob-grid { grid-template-columns: 1fr !important; }
          .tabs-row { overflow-x: auto; }
          .profile-card { padding: 24px !important; }
        }
        @media (max-width: 480px) {
          .tabs-row button { padding: 10px 12px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* Texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle,rgba(139,115,85,0.06) 1px,transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

      {/* Dark toggle */}
      <button onClick={() => setDark(!dark)} style={{ position: "fixed", top: "16px", right: "16px", zIndex: 200, padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: t.toggleBg, color: t.toggleColor, border: `1px solid ${t.toggleBorder}` }}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10 }} className="fade-up">
        <div className="profile-card" style={{ background: t.cardBg, borderRadius: "24px", border: `1px solid ${t.cardBorder}`, padding: "40px", boxShadow: "0 8px 48px rgba(139,115,85,0.1)", transition: "background 0.3s" }}>

          {/* HEADER */}
          <div className="profile-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "32px" }}>
            <div>
              <h1 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 600, color: t.title }}>✂ Tailor Profile</h1>
              <p style={{ color: t.sub, fontSize: "14px", marginTop: "4px" }}>Manage your professional details</p>
            </div>
            <div className="search-row" style={{ display: "flex", gap: "10px" }}>
              <input
                type="email" placeholder="Search by email..."
                value={searchEmail} onChange={e => setSearchEmail(e.target.value)}
                style={{ ...inp, width: "220px" }}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.inputBorder}
              />
              <button onClick={handleSearch} style={{ padding: "10px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, color: "#fef3e2", background: t.accent, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                onMouseLeave={e => e.currentTarget.style.background = t.accent}>
                Find Record
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="tabs-row" style={{ display: "flex", gap: "4px", borderBottom: `1px solid ${t.tabBorder}`, marginBottom: "32px" }}>
            {(["personal", "professional", "contact"] as Tab[]).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "12px 20px", fontSize: "14px", fontWeight: 500,
                borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer",
                textTransform: "capitalize", transition: "all 0.2s",
                background: activeTab === tab ? t.tabActiveBg : "transparent",
                color: activeTab === tab ? t.tabActive : t.tabInactive,
                borderBottom: activeTab === tab ? `2px solid ${t.tabActive}` : "2px solid transparent",
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* PERSONAL TAB */}
          {activeTab === "personal" && (
            <div className="personal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              {/* Profile photo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "160px", height: "160px", borderRadius: "50%", border: `4px solid ${t.profileCircleBorder}`, overflow: "hidden", background: t.profileCircleBg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(139,115,85,0.15)" }}>
                  {profileImage
                    ? <img src={profileImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ color: t.profilePlaceholder, fontSize: "13px", textAlign: "center", padding: "0 16px" }}>Profile Photo</span>}
                </div>
                <label style={{ marginTop: "16px", padding: "10px 24px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: "#fef3e2", background: t.accent, transition: "background 0.2s" }}
                  onMouseEnter={(e: any) => e.currentTarget.style.background = t.accentHover}
                  onMouseLeave={(e: any) => e.currentTarget.style.background = t.accent}>
                  Browse Photo
                  <input type="file" hidden accept="image/*" onChange={handleProfileImage} />
                </label>
              </div>

              {/* Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input style={inp} placeholder="Ram Jain" value={personal.fullName}
                    onChange={e => setPersonal(p => ({ ...p, fullName: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = t.inputBorder} />
                </div>
                <div>
                  <label style={lbl}>Aadhaar Number</label>
                  <input style={inp} placeholder="XXXX XXXX XXXX" value={personal.aadhaar}
                    onChange={e => setPersonal(p => ({ ...p, aadhaar: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = t.inputBorder} />
                </div>
                <div className="dob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={lbl}>Date of Birth</label>
                    <input style={inp} placeholder="DD/MM/YYYY" value={personal.dob}
                      onChange={e => setPersonal(p => ({ ...p, dob: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = t.accent}
                      onBlur={e => e.target.style.borderColor = t.inputBorder} />
                  </div>
                  <div>
                    <label style={lbl}>Gender</label>
                    <input style={inp} placeholder="Male / Female" value={personal.gender}
                      onChange={e => setPersonal(p => ({ ...p, gender: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = t.accent}
                      onBlur={e => e.target.style.borderColor = t.inputBorder} />
                  </div>
                </div>
                <div style={{ border: `2px dashed ${t.aadhaarBoxBorder}`, borderRadius: "12px", padding: "16px", background: t.aadhaarBoxBg }}>
                  <label style={{ padding: "8px 16px", borderRadius: "8px", cursor: "pointer", display: "inline-block", fontSize: "13px", fontWeight: 600, color: "#fef3e2", background: t.accent, transition: "background 0.2s" }}
                    onMouseEnter={(e: any) => e.currentTarget.style.background = t.accentHover}
                    onMouseLeave={(e: any) => e.currentTarget.style.background = t.accent}>
                    Upload Aadhaar (JPG/PNG)
                    <input type="file" hidden accept="image/jpeg,image/png" onChange={handleAadhaarImage} />
                  </label>
                  <p style={{ color: t.profilePlaceholder, fontSize: "12px", marginTop: "8px" }}>Aadhaar, DOB & Gender will be auto-filled via OCR</p>
                  {aadhaarError && <p style={{ color: "#e05555", fontSize: "12px", marginTop: "6px" }}>{aadhaarError}</p>}
                </div>
              </div>
            </div>
          )}

          {/* PROFESSIONAL TAB */}
          {activeTab === "professional" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "520px" }}>
              {([["Category *", "category", ["Men", "Women", "Both"]], ["Work Type *", "workType", ["Home", "Shop", "Both"]]] as [string, string, string[]][]).map(([label, key, opts]) => (
                <div key={key}>
                  <label style={lbl}>{label}</label>
                  <div style={{ position: "relative" }}>
                    <select style={{ ...inp, cursor: "pointer", paddingRight: "36px" }}
                      value={professional[key as keyof typeof professional]}
                      onChange={e => setProfessional(p => ({ ...p, [key]: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = t.accent}
                      onBlur={e => e.target.style.borderColor = t.inputBorder}>
                      <option value="">Select...</option>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: t.sub, pointerEvents: "none", fontSize: "12px" }}>▾</span>
                  </div>
                </div>
              ))}

              {([["Specialty", "specialty", "e.g. Bridal, Suits, Kurta"], ["Experience (Since Year)", "experience", "e.g. 2010"], ["Website / Instagram", "website", "https://..."]] as [string, string, string][]).map(([label, key, ph]) => (
                <div key={key}>
                  <label style={lbl}>{label}</label>
                  <input style={inp} placeholder={ph}
                    value={professional[key as keyof typeof professional]}
                    onChange={e => setProfessional(p => ({ ...p, [key]: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = t.accent}
                    onBlur={e => e.target.style.borderColor = t.inputBorder} />
                </div>
              ))}

              {(professional.workType === "Shop" || professional.workType === "Both") && (
                <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", background: t.shopBoxBg, border: `1px solid ${t.shopBoxBorder}`, padding: "20px", borderRadius: "12px" }}>
                  <div>
                    <label style={lbl}>Shop Address</label>
                    <input style={inp} placeholder="Street, Area" value={professional.shopAddress}
                      onChange={e => setProfessional(p => ({ ...p, shopAddress: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = t.accent}
                      onBlur={e => e.target.style.borderColor = t.inputBorder} />
                  </div>
                  <div>
                    <label style={lbl}>Shop City</label>
                    <input style={inp} placeholder="City name" value={professional.shopCity}
                      onChange={e => setProfessional(p => ({ ...p, shopCity: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = t.accent}
                      onBlur={e => e.target.style.borderColor = t.inputBorder} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "520px" }}>
              <div>
                <label style={lbl}>Phone Number *</label>
                <input style={inp} placeholder="10-digit number" value={contact.phone}
                  onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder} />
              </div>
              <div>
                <label style={lbl}>City</label>
                <input style={inp} placeholder="Your city" value={contact.city}
                  onChange={e => setContact(c => ({ ...c, city: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder} />
              </div>
              <div>
                <label style={lbl}>Full Address</label>
                <textarea style={{ ...inp, height: "110px" }}
                  placeholder="Street, Area, City, PIN"
                  value={contact.address}
                  onChange={e => setContact(c => ({ ...c, address: e.target.value }))} />
              </div>
            </div>
          )}

          {/* SUBMIT */}
          <button onClick={handleSubmit} style={{ marginTop: "40px", width: "100%", padding: "14px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", color: "#fef3e2", background: t.accent, border: "none", cursor: "pointer", letterSpacing: "0.5px", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
            onMouseLeave={e => e.currentTarget.style.background = t.accent}>
            CREATE / UPDATE PROFILE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;