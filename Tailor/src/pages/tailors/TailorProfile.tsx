import { useState } from "react";
import api from "../../api/axios";

type Tab = "personal" | "professional" | "contact";

const TailorProfile = () => {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [searchEmail, setSearchEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [aadhaarError, setAadhaarError] = useState("");
  const [saving, setSaving] = useState(false);
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
    if (!["image/jpeg", "image/png"].includes(file.type)) { setAadhaarError("Only JPG or PNG allowed"); e.target.value = ""; return; }
    setAadhaarFile(file);
    const fd = new FormData(); fd.append("aadhaarcard", file);
    try {
      const res = await api.post("/tailor/aadhaar-ocr", fd, authConfig);
      if (res.data.status) setPersonal(p => ({ ...p, aadhaar: res.data.data.aadhaar || "", dob: res.data.data.dob || "", gender: res.data.data.gender || "" }));
      else setAadhaarError("Unable to extract Aadhaar details");
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
    if ((professional.workType === "Shop" || professional.workType === "Both") && (!professional.shopAddress || !professional.shopCity)) { alert("Shop address & city required"); return false; }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
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
    finally { setSaving(false); }
  };

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-300";
  const lbl = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

  const tabs: Tab[] = ["personal", "professional", "contact"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@300;400;500;600&display=swap'); textarea{resize:none;font-family:'Inter',sans-serif} select{appearance:none}`}</style>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Header */}
          <div className="p-5 sm:p-7 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>✂ Tailor Profile</h1>
                <p className="text-gray-500 text-sm mt-0.5">Manage your professional details</p>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <input type="email" placeholder="Search by email..." value={searchEmail}
                  onChange={e => setSearchEmail(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-52 placeholder-gray-300" />
                <button onClick={handleSearch}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
                  Find Record
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "text-indigo-600 border-indigo-600 bg-indigo-50/50" : "text-gray-500 border-transparent hover:text-gray-700"}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-7">

            {/* PERSONAL */}
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
                    {profileImage
                      ? <img src={profileImage} className="w-full h-full object-cover" />
                      : <span className="text-gray-300 text-xs text-center px-3">Profile Photo</span>}
                  </div>
                  <label className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition-colors">
                    Browse Photo <input type="file" hidden accept="image/*" onChange={handleProfileImage} />
                  </label>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                  <div><label className={lbl}>Full Name *</label><input className={inp} placeholder="Ram Jain" value={personal.fullName} onChange={e => setPersonal(p => ({ ...p, fullName: e.target.value }))} /></div>
                  <div><label className={lbl}>Aadhaar Number</label><input className={inp} placeholder="XXXX XXXX XXXX" value={personal.aadhaar} onChange={e => setPersonal(p => ({ ...p, aadhaar: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={lbl}>Date of Birth</label><input className={inp} placeholder="DD/MM/YYYY" value={personal.dob} onChange={e => setPersonal(p => ({ ...p, dob: e.target.value }))} /></div>
                    <div><label className={lbl}>Gender</label><input className={inp} placeholder="Male / Female" value={personal.gender} onChange={e => setPersonal(p => ({ ...p, gender: e.target.value }))} /></div>
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
                    <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-indigo-700 transition-colors inline-block">
                      Upload Aadhaar (JPG/PNG) <input type="file" hidden accept="image/jpeg,image/png" onChange={handleAadhaarImage} />
                    </label>
                    <p className="text-gray-400 text-xs mt-2">Auto-fills Aadhaar, DOB & Gender via OCR</p>
                    {aadhaarError && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {aadhaarError}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* PROFESSIONAL */}
            {activeTab === "professional" && (
              <div className="space-y-4 max-w-lg">
                {[["Category *", "category", ["Men", "Women", "Both"]], ["Work Type *", "workType", ["Home", "Shop", "Both"]]] .map(([label, key, opts]) => (
                  <div key={key as string}>
                    <label className={lbl}>{label as string}</label>
                    <div className="relative">
                      <select className={`${inp} cursor-pointer pr-9`}
                        value={professional[key as keyof typeof professional]}
                        onChange={e => setProfessional(p => ({ ...p, [key as string]: e.target.value }))}>
                        <option value="">Select...</option>
                        {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                    </div>
                  </div>
                ))}
                {[["Specialty", "specialty", "e.g. Bridal, Suits, Kurta"], ["Experience (Since Year)", "experience", "e.g. 2010"], ["Website / Instagram", "website", "https://..."]]
                  .map(([label, key, ph]) => (
                    <div key={key as string}>
                      <label className={lbl}>{label as string}</label>
                      <input className={inp} placeholder={ph as string}
                        value={professional[key as keyof typeof professional]}
                        onChange={e => setProfessional(p => ({ ...p, [key as string]: e.target.value }))} />
                    </div>
                  ))}
                {(professional.workType === "Shop" || professional.workType === "Both") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                    <div><label className={lbl}>Shop Address</label><input className={inp} placeholder="Street, Area" value={professional.shopAddress} onChange={e => setProfessional(p => ({ ...p, shopAddress: e.target.value }))} /></div>
                    <div><label className={lbl}>Shop City</label><input className={inp} placeholder="City name" value={professional.shopCity} onChange={e => setProfessional(p => ({ ...p, shopCity: e.target.value }))} /></div>
                  </div>
                )}
              </div>
            )}

            {/* CONTACT */}
            {activeTab === "contact" && (
              <div className="space-y-4 max-w-lg">
                <div><label className={lbl}>Phone Number *</label><input className={inp} placeholder="10-digit number" value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} /></div>
                <div><label className={lbl}>City</label><input className={inp} placeholder="Your city" value={contact.city} onChange={e => setContact(c => ({ ...c, city: e.target.value }))} /></div>
                <div>
                  <label className={lbl}>Full Address</label>
                  <textarea className={`${inp} h-24`} placeholder="Street, Area, City, PIN" value={contact.address} onChange={e => setContact(c => ({ ...c, address: e.target.value }))} />
                </div>
              </div>
            )}

            {/* Submit */}
            <button onClick={handleSubmit} disabled={saving}
              className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {saving ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Saving...</>
              ) : "💾 Create / Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;