import { useState, useEffect } from "react";
import api from "../api/axios";

const CATEGORIES = ["Men", "Women", "Children"];

interface Tailor {
  _id: string; fullName: string; profileImage: string; city: string;
  category: string; specialty: string; experience: string;
  workType: string; phone: string; avgRating: number; totalReviews: number;
}

const theme = {
  light: {
    pageBg: "#fdf8f3", headerBg: "#fff", cardBg: "#fff", sidebarBg: "#fff",
    cardBorder: "#ede5d8", title: "#2c1e0f", sub: "#a0917e",
    inputBg: "#fdf8f3", inputText: "#2c1e0f", inputBorder: "#e8e0d5",
    accent: "#8b7355", accentHover: "#6b5a42",
    toggleBg: "#fff", toggleColor: "#3d2e1e", toggleBorder: "#e8e0d5",
    emptyColor: "#c4b8a8",
  },
  dark: {
    pageBg: "#1a1209", headerBg: "#1e150a", cardBg: "#231a0f", sidebarBg: "#231a0f",
    cardBorder: "#3d2e1e", title: "#fef3e2", sub: "#8b7355",
    inputBg: "#2c1e0f", inputText: "#fef3e2", inputBorder: "#3d2e1e",
    accent: "#c4a882", accentHover: "#d4b892",
    toggleBg: "#2c1e0f", toggleColor: "#fef3e2", toggleBorder: "#3d2e1e",
    emptyColor: "#6b5a42",
  },
};

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="13" height="13" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? "#c9a84c" : "none"}
        stroke={s <= Math.round(rating) ? "#c9a84c" : "#d4c4a8"} strokeWidth="1.8">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
    <span style={{ fontSize: "12px", color: "#a0917e", marginLeft: "4px" }}>
      {rating > 0 ? rating.toFixed(1) : "No reviews"}
    </span>
  </div>
);

const TailorCard = ({ tailor, index, t }: { tailor: Tailor; index: number; t: typeof theme.light }) => (
  <div className="card-appear card-hover" style={{
    background: t.cardBg, borderRadius: "16px", border: `1px solid ${t.cardBorder}`,
    overflow: "hidden", boxShadow: "0 2px 16px rgba(139,115,85,0.08)",
    animationDelay: `${index * 70}ms`, transition: "background 0.3s",
  }}>
    <div style={{ height: "160px", background: t.pageBg, position: "relative", overflow: "hidden" }}>
      {tailor.profileImage && tailor.profileImage !== "nopic.jpg"
        ? <img src={tailor.profileImage} alt={tailor.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", opacity: 0.2 }}>✂️</div>}
      {tailor.workType && (
        <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "10px", fontWeight: 600, padding: "4px 10px", background: "rgba(255,255,255,0.85)", color: "#8b7355", borderRadius: "20px", border: "1px solid #e8e0d5" }}>{tailor.workType}</span>
      )}
    </div>
    <div style={{ padding: "16px" }}>
      <h3 style={{ fontFamily: "'Lora',serif", fontWeight: 600, color: t.title, fontSize: "15px", marginBottom: "2px" }}>{tailor.fullName}</h3>
      <p style={{ fontSize: "12px", color: t.sub, marginBottom: "8px" }}>📍 {tailor.city}</p>
      <StarRating rating={tailor.avgRating || 0} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
        {tailor.category && <span style={{ padding: "2px 10px", fontSize: "11px", fontWeight: 500, background: t.pageBg, color: t.accent, borderRadius: "20px", border: `1px solid ${t.cardBorder}` }}>{tailor.category}</span>}
        {tailor.specialty && <span style={{ padding: "2px 10px", fontSize: "11px", fontWeight: 500, background: "#fef9f0", color: "#a0804a", borderRadius: "20px", border: "1px solid #f0e4c8" }}>{tailor.specialty}</span>}
      </div>
      {tailor.experience && <p style={{ fontSize: "12px", color: t.emptyColor, marginTop: "6px" }}>🧵 Since {tailor.experience}</p>}
      <a href={`tel:${tailor.phone}`} style={{ display: "block", textAlign: "center", marginTop: "12px", padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, color: "#fef3e2", background: t.accent, textDecoration: "none", transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = t.accentHover}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = t.accent}>
        📞 Call Tailor
      </a>
    </div>
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

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", border: `1.5px solid ${t.inputBorder}`, borderRadius: "10px", fontSize: "14px", color: t.inputText, background: t.inputBg, boxSizing: "border-box", transition: "border-color 0.2s", outline: "none", appearance: "none" as any };

  return (
    <div style={{ minHeight: "100vh", background: t.pageBg, fontFamily: "'DM Sans',sans-serif", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes cardUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .card-appear { animation: cardUp 0.4s ease both; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease !important; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(139,115,85,0.15) !important; }
        select option { background: #fdf8f3; color: #2c1e0f; }
        button:active { transform: scale(0.98); }
        @media (max-width: 768px) {
          .find-layout { grid-template-columns: 1fr !important; }
          .sidebar { position: static !important; }
          .results-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Dark toggle */}
      <button onClick={() => setDark(!dark)} style={{ position: "fixed", top: "16px", right: "16px", zIndex: 200, padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: t.toggleBg, color: t.toggleColor, border: `1px solid ${t.toggleBorder}` }}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Header */}
      <header style={{ background: t.headerBg, borderBottom: `1px solid ${t.cardBorder}`, boxShadow: "0 1px 12px rgba(139,115,85,0.06)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "24px" }}>✂️</span>
          <div>
            <span style={{ fontFamily: "'Lora',serif", fontSize: "20px", fontWeight: 600, color: t.title }}>StitchFind</span>
            <p style={{ fontSize: "12px", color: t.sub }}>Discover skilled tailors near you</p>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 600, color: t.title }}>Find Tailors</h1>
          <p style={{ color: t.sub, fontSize: "14px", marginTop: "4px" }}>Filter by city and category to discover the right fit</p>
        </div>

        <div className="find-layout" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px", alignItems: "start" }}>
          {/* Sidebar */}
          <div className="sidebar" style={{ background: t.sidebarBg, borderRadius: "16px", border: `1px solid ${t.cardBorder}`, padding: "24px", position: "sticky", top: "24px", boxShadow: "0 2px 20px rgba(139,115,85,0.07)", transition: "background 0.3s" }}>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "18px", fontWeight: 600, color: t.title, marginBottom: "20px" }}>Filters</h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: t.sub, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>City</label>
              <div style={{ position: "relative" }}>
                <select style={inp} value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                  <option value="">Select city...</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: t.sub, pointerEvents: "none", fontSize: "12px" }}>▾</span>
              </div>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: t.sub, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Category</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["", ...CATEGORIES].map(cat => (
                  <label key={cat || "all"} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: t.sub, cursor: "pointer" }}>
                    <input type="radio" name="cat" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: t.accent, width: "16px", height: "16px" }} />
                    {cat || "All"}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={() => handleFind(1)} disabled={loading} style={{ width: "100%", padding: "11px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, color: "#fef3e2", background: t.accent, border: "none", cursor: "pointer", transition: "background 0.2s", opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = t.accentHover)}
              onMouseLeave={e => (e.currentTarget.style.background = t.accent)}>
              {loading ? "Searching..." : "Find Tailors"}
            </button>
            {searched && !loading && (
              <p style={{ textAlign: "center", fontSize: "12px", color: t.sub, marginTop: "12px" }}>
                {tailors.length > 0 ? `${tailors.length} tailor${tailors.length > 1 ? "s" : ""} found` : "No results"}
              </p>
            )}
          </div>

          {/* Results */}
          <div>
            {!searched && !loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "280px", textAlign: "center" }}>
                <span style={{ fontSize: "56px", marginBottom: "16px", opacity: 0.2 }}>✂️</span>
                <p style={{ color: t.emptyColor, fontSize: "14px" }}>Select a city and click "Find Tailors"</p>
              </div>
            )}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "280px" }}>
                <div style={{ width: "40px", height: "40px", border: `4px solid ${t.accent}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: "16px" }} />
                <p style={{ color: t.sub, fontSize: "14px" }}>Finding tailors for you...</p>
              </div>
            )}
            {!loading && searched && tailors.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "280px", textAlign: "center" }}>
                <span style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.2 }}>🔍</span>
                <p style={{ color: t.emptyColor, fontSize: "14px" }}>No tailors found. Try a different city or category.</p>
              </div>
            )}
            {!loading && tailors.length > 0 && (
              <>
                <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                  {tailors.map((tailor, i) => <TailorCard key={tailor._id} tailor={tailor} index={i} t={t} />)}
                </div>
                {totalPages > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => handleFind(p)} style={{ width: "36px", height: "36px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: `1px solid ${t.cardBorder}`, background: p === page ? t.accent : t.cardBg, color: p === page ? "#fef3e2" : t.accent, transition: "all 0.2s" }}>{p}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}