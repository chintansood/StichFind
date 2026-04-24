import { useState, useEffect } from "react";
import api from "../api/axios";
import { DarkToggleNav } from "../pages/DarkToggleNav";

const CATEGORIES = ["Men", "Women", "Children"];

interface Tailor {
  _id: string; fullName: string; profileImage: string; city: string;
  category: string; specialty: string; experience: string;
  workType: string; phone: string; avgRating: number; totalReviews: number;
}

const theme = {
  light: {
    pageBg: "#fdf8f3", sidebarBg: "#fff", cardBg: "#fff", cardBorder: "#ede5d8",
    title: "#2c1e0f", sub: "#a0917e",
    inputBg: "#fdf8f3", inputText: "#2c1e0f", inputBorder: "#e8e0d5",
    accent: "#8b7355", accentHover: "#6b5a42", empty: "#c4b8a8",
  },
  dark: {
    pageBg: "#1a1209", sidebarBg: "#231a0f", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    title: "#fef3e2", sub: "#8b7355",
    inputBg: "#2c1e0f", inputText: "#fef3e2", inputBorder: "#3d2e1e",
    accent: "#c4a882", accentHover: "#d4b892", empty: "#6b5a42",
  },
};

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="13" height="13" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? "#c9a84c" : "none"}
        stroke={s <= Math.round(rating) ? "#c9a84c" : "#d4c4a8"} strokeWidth="1.8">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
    <span style={{ fontSize: "11px", color: "#a0917e", marginLeft: "3px" }}>
      {rating > 0 ? rating.toFixed(1) : "No reviews"}
    </span>
  </div>
);

export default function FindTailor() {
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get("/tailor/cities", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.data.status) setCities(res.data.cities); });
  }, []);

  const handleFind = async (p = 1) => {
    if (!selectedCity) return alert("Please select a city");
    setLoading(true); setSearched(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/tailor/find", { city: selectedCity, category: selectedCategory, page: p, limit: 6 }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.status) { setTailors(res.data.tailors); setTotalPages(res.data.totalPages); setPage(p); }
      else setTailors([]);
    } catch { setTailors([]); }
    finally { setLoading(false); }
  };

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", border: `1.5px solid ${t.inputBorder}`, borderRadius: "10px", fontSize: "14px", color: t.inputText, background: t.inputBg, boxSizing: "border-box", outline: "none", appearance: "none" as any, transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "100vh", background: t.pageBg, fontFamily: "'DM Sans',sans-serif", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes cardUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .card-appear { animation: cardUp 0.4s ease both; }
        .card-hover { transition: transform 0.25s, box-shadow 0.25s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(139,115,85,0.15)!important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .find-layout { grid-template-columns: 1fr !important; }
          .results-grid { grid-template-columns: 1fr 1fr !important; }
          .sidebar { position: static !important; }
        }
        @media (max-width: 480px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <DarkToggleNav dark={dark} onToggle={() => setDark(!dark)} title="Find Tailors" />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: 600, color: t.title }}>Find Tailors</h1>
          <p style={{ color: t.sub, fontSize: "13px", marginTop: "4px" }}>Filter by city and category to discover the right fit</p>
        </div>

        <div className="find-layout" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "20px", alignItems: "start" }}>
          {/* Sidebar */}
          <div className="sidebar" style={{ background: t.sidebarBg, borderRadius: "16px", border: `1px solid ${t.cardBorder}`, padding: "20px", position: "sticky", top: "80px", transition: "background 0.3s" }}>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "17px", fontWeight: 600, color: t.title, marginBottom: "18px" }}>Filters</h2>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: t.sub, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>City</label>
              <div style={{ position: "relative" }}>
                <select style={inp} value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder}>
                  <option value="">Select city...</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: t.sub, pointerEvents: "none", fontSize: "11px" }}>▾</span>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: t.sub, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Category</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["", ...CATEGORIES].map(cat => (
                  <label key={cat || "all"} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: t.sub, cursor: "pointer" }}>
                    <input type="radio" name="cat" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: t.accent, width: "15px", height: "15px" }} />
                    {cat || "All"}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={() => handleFind(1)} disabled={loading}
              style={{ width: "100%", padding: "11px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, color: "#fef3e2", background: t.accent, border: "none", cursor: "pointer", transition: "background 0.2s", opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = t.accentHover)}
              onMouseLeave={e => (e.currentTarget.style.background = t.accent)}>
              {loading ? "Searching..." : "Find Tailors"}
            </button>
            {searched && !loading && (
              <p style={{ textAlign: "center", fontSize: "12px", color: t.sub, marginTop: "10px" }}>
                {tailors.length > 0 ? `${tailors.length} tailor${tailors.length > 1 ? "s" : ""} found` : "No results"}
              </p>
            )}
          </div>

          {/* Results */}
          <div>
            {!searched && !loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "260px", textAlign: "center" }}>
                <span style={{ fontSize: "52px", marginBottom: "14px", opacity: 0.2 }}>✂️</span>
                <p style={{ color: t.empty, fontSize: "14px" }}>Select a city and click "Find Tailors"</p>
              </div>
            )}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "260px" }}>
                <div style={{ width: "36px", height: "36px", border: `3px solid ${t.accent}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: "14px" }} />
                <p style={{ color: t.sub, fontSize: "14px" }}>Finding tailors...</p>
              </div>
            )}
            {!loading && searched && tailors.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "260px", textAlign: "center" }}>
                <span style={{ fontSize: "44px", marginBottom: "14px", opacity: 0.2 }}>🔍</span>
                <p style={{ color: t.empty, fontSize: "14px" }}>No tailors found. Try a different city or category.</p>
              </div>
            )}
            {!loading && tailors.length > 0 && (
              <>
                <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                  {tailors.map((tailor, i) => (
                    <div key={tailor._id} className="card-appear card-hover" style={{ background: t.cardBg, borderRadius: "14px", border: `1px solid ${t.cardBorder}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(139,115,85,0.07)", animationDelay: `${i * 60}ms`, transition: "background 0.3s" }}>
                      <div style={{ height: "150px", background: t.pageBg, position: "relative", overflow: "hidden" }}>
                        {tailor.profileImage && tailor.profileImage !== "nopic.jpg"
                          ? <img src={tailor.profileImage} alt={tailor.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "44px", opacity: 0.2 }}>✂️</div>}
                        {tailor.workType && <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "10px", fontWeight: 600, padding: "3px 9px", background: "rgba(255,255,255,0.88)", color: "#8b7355", borderRadius: "20px", border: "1px solid #e8e0d5" }}>{tailor.workType}</span>}
                      </div>
                      <div style={{ padding: "14px" }}>
                        <h3 style={{ fontFamily: "'Lora',serif", fontWeight: 600, color: t.title, fontSize: "14px", marginBottom: "2px" }}>{tailor.fullName}</h3>
                        <p style={{ fontSize: "12px", color: t.sub, marginBottom: "8px" }}>📍 {tailor.city}</p>
                        <StarRating rating={tailor.avgRating || 0} />
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "8px" }}>
                          {tailor.category && <span style={{ padding: "2px 9px", fontSize: "11px", fontWeight: 500, background: t.pageBg, color: t.accent, borderRadius: "20px", border: `1px solid ${t.cardBorder}` }}>{tailor.category}</span>}
                          {tailor.specialty && <span style={{ padding: "2px 9px", fontSize: "11px", background: "#fef9f0", color: "#a0804a", borderRadius: "20px", border: "1px solid #f0e4c8" }}>{tailor.specialty}</span>}
                        </div>
                        {tailor.experience && <p style={{ fontSize: "11px", color: t.empty, marginTop: "6px" }}>🧵 Since {tailor.experience}</p>}
                        <a href={`tel:${tailor.phone}`} style={{ display: "block", textAlign: "center", marginTop: "10px", padding: "9px", borderRadius: "9px", fontSize: "13px", fontWeight: 600, color: "#fef3e2", background: t.accent, textDecoration: "none", transition: "background 0.2s" }}
                          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = t.accentHover}
                          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = t.accent}>
                          📞 Call Tailor
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => handleFind(p)} style={{ width: "34px", height: "34px", borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `1px solid ${t.cardBorder}`, background: p === page ? t.accent : t.cardBg, color: p === page ? "#fef3e2" : t.accent, transition: "all 0.2s" }}>{p}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}