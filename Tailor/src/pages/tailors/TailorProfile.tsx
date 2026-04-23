import { useState } from "react";
import api from "../../api/axios";

type Tab = "personal" | "professional" | "contact";

const TailorProfile = () => {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [searchEmail, setSearchEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string|null>(null);
  const [profileFile, setProfileFile] = useState<File|null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File|null>(null);
  const [aadhaarError, setAadhaarError] = useState("");
  const [personal, setPersonal] = useState({ fullName:"", aadhaar:"", dob:"", gender:"" });
  const [professional, setProfessional] = useState({ category:"", specialty:"", experience:"", website:"", workType:"", shopAddress:"", shopCity:"" });
  const [contact, setContact] = useState({ phone:"", city:"", address:"" });

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setProfileFile(file); setProfileImage(URL.createObjectURL(file));
  };

  const token = localStorage.getItem("token");

const authConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const handleAadhaarImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; 
  if (!file) return;

  setAadhaarError("");

  if (!["image/jpeg","image/png"].includes(file.type)) {
    setAadhaarError("Only JPG or PNG allowed");
    e.target.value = "";
    return;
  }

  setAadhaarFile(file);

  const fd = new FormData();
  fd.append("aadhaarcard", file);

  try {
    const res = await api.post(
      "/tailor/aadhaar-ocr",
      fd,
      authConfig
    );

    if (res.data.status) {
      setPersonal(p => ({
        ...p,
        aadhaar: res.data.data.aadhaar || "",
        dob: res.data.data.dob || "",
        gender: res.data.data.gender || ""
      }));
    } else {
      setAadhaarError("Unable to extract Aadhaar details");
    }
  } catch {
    setAadhaarError("Aadhaar OCR failed");
  }
};

const handleSearch = async () => {
  if (!searchEmail.trim()) return alert("Enter email to search");

  try {
    const res = await api.post(
      "/tailor/search",
      { email: searchEmail },
      authConfig
    );

    if (res.data.status) {
      const d = res.data.data;

      setPersonal({
        fullName: d.fullName || "",
        aadhaar: d.aadhaar || "",
        dob: d.dob || "",
        gender: d.gender || ""
      });

      setProfessional({
        category: d.category || "",
        specialty: d.specialty || "",
        experience: d.experience || "",
        website: d.website || "",
        workType: d.workType || "",
        shopAddress: d.shopAddress || "",
        shopCity: d.shopCity || ""
      });

      setContact({
        phone: d.phone || "",
        city: d.city || "",
        address: d.address || ""
      });

      if (d.profileImage) setProfileImage(d.profileImage);
    }
  } catch {
    alert("Record not found");
  }
};

const validate = () => {
  if (!searchEmail.trim()) { alert("Email required"); return false; }
  if (!personal.fullName.trim()) { alert("Full name required"); return false; }
  if (!professional.category) { alert("Category required"); return false; }
  if (!contact.phone || contact.phone.length !== 10) { alert("Valid 10-digit phone required"); return false; }
  if ((professional.workType==="Shop" || professional.workType==="Both") && (!professional.shopAddress || !professional.shopCity)) {
    alert("Shop address & city required");
    return false;
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
    const res = await api.post(
      "/tailor/save-profile",
      fd,
      authConfig
    );

    if (res.data.status) alert("Profile saved ✅");
    else alert(res.data.msg);
  } catch {
    alert("Error saving profile");
  }
};

  const inp = "w-full px-4 py-3 border border-[#e8e0d5] rounded-xl text-sm text-[#2c1e0f] bg-[#fdf8f3] focus:outline-none focus:border-[#8b7355] transition placeholder-[#c4b8a8]";
  const lbl = "block text-[11px] font-semibold text-[#6b5a42] uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-[#fdf8f3] py-10 px-4 relative" style={{fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease both}
        input::placeholder,textarea::placeholder{color:#c4b8a8}
        select{appearance:none}
        button:active{transform:scale(0.99)}
      `}</style>

      {/* Dot texture */}
      <div className="fixed inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle,rgba(139,115,85,0.06) 1px,transparent 1px)",backgroundSize:"24px 24px"}} />

      <div className="relative z-10 max-w-5xl mx-auto fade-up">
        <div className="bg-white rounded-3xl shadow-xl border border-[#ede5d8] p-8" style={{boxShadow:"0 8px 48px rgba(139,115,85,0.1)"}}>

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 style={{fontFamily:"'Lora',serif"}} className="text-3xl font-semibold text-[#2c1e0f]">✂ Tailor Profile</h1>
              <p className="text-[#a0917e] text-sm mt-1">Manage your professional details</p>
            </div>
            <div className="flex gap-3">
              <input type="email" placeholder="Search by email..." value={searchEmail}
                onChange={e=>setSearchEmail(e.target.value)}
                className={`${inp} w-60`} />
              <button onClick={handleSearch}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#fef3e2] whitespace-nowrap transition-all"
                style={{background:"#8b7355"}}
                onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
                onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
                Find Record
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-1 border-b border-[#ede5d8] mb-8">
            {(["personal","professional","contact"] as Tab[]).map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)}
                className={`px-5 py-3 capitalize text-sm font-medium rounded-t-lg transition-all ${activeTab===tab ? "text-[#8b7355] border-b-2 border-[#8b7355] bg-[#fdf8f3]" : "text-[#a0917e] hover:text-[#6b5a42]"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* PERSONAL */}
          {activeTab==="personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-4 border-[#e8e0d5] overflow-hidden bg-[#fdf8f3] flex items-center justify-center" style={{boxShadow:"0 4px 20px rgba(139,115,85,0.15)"}}>
                  {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <span className="text-[#c4b8a8] text-sm text-center px-4">Profile Photo</span>}
                </div>
                <label className="mt-4 px-6 py-2.5 rounded-xl cursor-pointer text-sm font-semibold text-[#fef3e2] transition-all"
                  style={{background:"#8b7355"}}
                  onMouseEnter={(e:any)=>e.currentTarget.style.background="#6b5a42"}
                  onMouseLeave={(e:any)=>e.currentTarget.style.background="#8b7355"}>
                  Browse Photo
                  <input type="file" hidden accept="image/*" onChange={handleProfileImage} />
                </label>
              </div>

              <div className="space-y-4">
                <div><label className={lbl}>Full Name *</label><input className={inp} placeholder="Ram Jain" value={personal.fullName} onChange={e=>setPersonal(p=>({...p,fullName:e.target.value}))} /></div>
                <div><label className={lbl}>Aadhaar Number</label><input className={inp} placeholder="XXXX XXXX XXXX" value={personal.aadhaar} onChange={e=>setPersonal(p=>({...p,aadhaar:e.target.value}))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={lbl}>Date of Birth</label><input className={inp} placeholder="DD/MM/YYYY" value={personal.dob} onChange={e=>setPersonal(p=>({...p,dob:e.target.value}))} /></div>
                  <div><label className={lbl}>Gender</label><input className={inp} placeholder="Male / Female" value={personal.gender} onChange={e=>setPersonal(p=>({...p,gender:e.target.value}))} /></div>
                </div>
                <div className="border-2 border-dashed border-[#e8e0d5] rounded-xl p-4 bg-[#fdf8f3]">
                  <label className="px-4 py-2 rounded-lg cursor-pointer inline-block text-sm font-semibold text-[#fef3e2]" style={{background:"#8b7355"}}>
                    Upload Aadhaar (JPG/PNG)
                    <input type="file" hidden accept="image/jpeg,image/png" onChange={handleAadhaarImage} />
                  </label>
                  <p className="text-[#c4b8a8] text-xs mt-2">Aadhaar, DOB & Gender will be auto-filled via OCR</p>
                  {aadhaarError && <p className="text-red-500 text-xs mt-2">{aadhaarError}</p>}
                </div>
              </div>
            </div>
          )}

          {/* PROFESSIONAL */}
          {activeTab==="professional" && (
            <div className="space-y-5 max-w-xl">
              {[["Category *","category",["Men","Women","Both"],true],["Work Type *","workType",["Home","Shop","Both"],true]].map(([label,key,opts,isSelect])=>(
                <div key={key as string}>
                  <label className={lbl}>{label as string}</label>
                  <div className="relative">
                    <select className={`${inp} cursor-pointer pr-10`}
                      value={professional[key as keyof typeof professional]}
                      onChange={e=>setProfessional(p=>({...p,[key as string]:e.target.value}))}>
                      <option value="">Select...</option>
                      {(opts as string[]).map(o=><option key={o}>{o}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0917e] pointer-events-none">▾</span>
                  </div>
                </div>
              ))}
              {[["Specialty","specialty","e.g. Bridal, Suits, Kurta"],["Experience (Since Year)","experience","e.g. 2010"],["Website / Instagram","website","https://..."]].map(([label,key,ph])=>(
                <div key={key as string}>
                  <label className={lbl}>{label as string}</label>
                  <input className={inp} placeholder={ph as string}
                    value={professional[key as keyof typeof professional]}
                    onChange={e=>setProfessional(p=>({...p,[key as string]:e.target.value}))} />
                </div>
              ))}
              {(professional.workType==="Shop"||professional.workType==="Both") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#fdf8f3] border border-[#e8e0d5] p-5 rounded-xl">
                  <div><label className={lbl}>Shop Address</label><input className={inp} placeholder="Street, Area" value={professional.shopAddress} onChange={e=>setProfessional(p=>({...p,shopAddress:e.target.value}))} /></div>
                  <div><label className={lbl}>Shop City</label><input className={inp} placeholder="City name" value={professional.shopCity} onChange={e=>setProfessional(p=>({...p,shopCity:e.target.value}))} /></div>
                </div>
              )}
            </div>
          )}

          {/* CONTACT */}
          {activeTab==="contact" && (
            <div className="space-y-5 max-w-xl">
              <div><label className={lbl}>Phone Number *</label><input className={inp} placeholder="10-digit number" value={contact.phone} onChange={e=>setContact(c=>({...c,phone:e.target.value}))} /></div>
              <div><label className={lbl}>City</label><input className={inp} placeholder="Your city" value={contact.city} onChange={e=>setContact(c=>({...c,city:e.target.value}))} /></div>
              <div>
                <label className={lbl}>Full Address</label>
                <textarea className={`${inp} h-28 resize-none`} placeholder="Street, Area, City, PIN" value={contact.address} onChange={e=>setContact(c=>({...c,address:e.target.value}))} />
              </div>
            </div>
          )}

          <button onClick={handleSubmit}
            className="mt-10 w-full py-3.5 rounded-xl font-semibold text-[#fef3e2] tracking-wide transition-all"
            style={{background:"#8b7355"}}
            onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
            onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
            CREATE / UPDATE PROFILE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;
