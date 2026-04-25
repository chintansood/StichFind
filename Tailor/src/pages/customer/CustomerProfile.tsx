import { useState } from "react";
import api from "../../api/axios";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal","Delhi",
];

export default function CustomerProfile() {
  const [isExisting, setIsExisting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", state: "", gender: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setProfileFile(file); setProfileImage(URL.createObjectURL(file));
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
      const res = await api.post("/customer/find", { email: form.email });
      if (res.data.status) {
        const d = res.data.doc;
        setForm({ email: d.email, name: d.name, address: d.address, city: d.city, state: d.state, gender: d.gender });
        if (d.profilePic) setProfileImage(d.profilePic);
        setIsExisting(true);
      } else { alert("Customer not found"); setIsExisting(false); }
    } catch { alert("Error finding customer"); }
  };

  const handleSave = async () => {
    const err = validate(); if (err) return alert(err);
    setSaving(true);
    try {
      const res = await api.post("/customer/create", buildFormData());
      alert(res.data.msg); setIsExisting(true);
    } catch { alert("Error saving profile"); }
    finally { setSaving(false); }
  };

  const handleUpdate = async () => {
    const err = validate(); if (err) return alert(err);
    setSaving(true);
    try {
      const res = await api.post("/customer/update", buildFormData());
      alert(res.data.msg);
    } catch { alert("Error updating profile"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!form.email) return alert("Enter email to delete");
    if (!window.confirm("Delete this profile?")) return;
    try {
      const res = await api.post("/customer/delete", { email: form.email });
      alert(res.data.msg);
      setForm({ email: "", name: "", address: "", city: "", state: "", gender: "" });
      setProfileImage(null); setIsExisting(false);
    } catch { alert("Error deleting profile"); }
  };

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-300";
  const lbl = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@300;400;500;600&display=swap'); select{appearance:none}`}</style>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left panel */}
            <div className="lg:w-5/12 bg-gradient-to-b from-indigo-600 to-indigo-800 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="relative z-10">
                {/* Avatar */}
                <div className="relative inline-block mb-5">
                  <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 mx-auto shadow-lg">
                    {profileImage
                      ? <img src={profileImage} className="w-full h-full object-cover" alt="profile" />
                      : <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">👤</div>}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-yellow-300 transition-colors">
                    <span className="text-sm">📷</span>
                    <input type="file" hidden accept="image/*" onChange={handleImage} />
                  </label>
                </div>

                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Lora',serif" }}>{form.name || "Your Name"}</h3>
                <div className="space-y-1 mb-4">
                  {(form.city || form.state) && <p className="text-indigo-200 text-xs">📍 {[form.city, form.state].filter(Boolean).join(", ")}</p>}
                  {form.gender && <p className="text-indigo-200 text-xs">👤 {form.gender}</p>}
                  {form.email && <p className="text-indigo-200/70 text-xs">✉ {form.email}</p>}
                </div>

                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${isExisting ? "bg-green-500/20 border-green-400/30 text-green-300" : "bg-yellow-400/20 border-yellow-400/30 text-yellow-300"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isExisting ? "bg-green-400" : "bg-yellow-400"}`} />
                  {isExisting ? "Existing Client" : "New Client"}
                </div>

                <div className="flex gap-2 justify-center flex-wrap mt-5">
                  {["🛍️ Client", "✂️ Tailoring", "⭐ Verified"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/15">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
              <div className="mb-6">
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Manage Profile</p>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Customer Profile</h2>
                <p className="text-gray-400 text-sm mt-0.5">Search existing or create a new customer record</p>
              </div>

              <div className="h-px bg-gray-100 mb-5" />

              {/* Email + Search */}
              <div className="mb-4">
                <label className={lbl}>Email Address</label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="customer@example.com"
                    className={`${inp} flex-1`} />
                  <button onClick={handleFind}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap flex items-center gap-1.5 justify-center">
                    🔍 Search
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label className={lbl}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className={inp} />
                </div>
                <div>
                  <label className={lbl}>Address</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" className={inp} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>City</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>State</label>
                    <div className="relative">
                      <select name="state" value={form.state} onChange={handleChange} className={`${inp} cursor-pointer pr-9`}>
                        <option value="">Select state...</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={lbl}>Gender</label>
                  <div className="relative">
                    <select name="gender" value={form.gender} onChange={handleChange} className={`${inp} cursor-pointer pr-9`}>
                      <option value="">Select gender...</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-7">
                {!isExisting ? (
                  <button onClick={handleSave} disabled={saving}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {saving ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Saving...</> : "💾 Save Profile"}
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleUpdate} disabled={saving}
                      className="py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5">
                      {saving ? "Saving..." : "✏️ Update"}
                    </button>
                    <button onClick={handleDelete}
                      className="py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors">
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mt-7">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-300 tracking-widest font-medium">✂ STITCHFIND</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}