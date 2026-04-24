import { useState } from "react";
import api from "../../api/axios";
import { DarkToggleNav } from "../../pages/DarkToggleNav";

type Stage = "form" | "success";

const theme = {
  light: {
    pageBg: "#fdf8f3", cardBg: "#ffffff", cardBorder: "#ede5d8",
    title: "#2c1e0f", sub: "#a0917e", label: "#6b5a42",
    inputBg: "#fdf8f3", inputText: "#2c1e0f", inputBorder: "#e8e0d5",
    accent: "#8b7355", accentHover: "#6b5a42",
    hint: "#a0917e", found: "#8b7355", charCount: "#c4b8a8",
  },
  dark: {
    pageBg: "#1a1209", cardBg: "#231a0f", cardBorder: "#3d2e1e",
    title: "#fef3e2", sub: "#8b7355", label: "#c4a882",
    inputBg: "#2c1e0f", inputText: "#fef3e2", inputBorder: "#3d2e1e",
    accent: "#c4a882", accentHover: "#d4b892",
    hint: "#6b5a42", found: "#c4a882", charCount: "#6b5a42",
  },
};

const TailorReview = () => {
  const [dark, setDark] = useState(false);
  const t = dark ? theme.dark : theme.light;
  const [stage, setStage] = useState<Stage>("form");
  const [form, setForm] = useState({ phone: "", tailorName: "", rating: 0, review: "" });
  const [ui, setUI] = useState({ tailorFound: false, phoneError: "", submitError: "", loading: false, searching: false });
  const [hovered, setHovered] = useState(0);

  const handlePhoneLookup = async (value: string) => {
    setForm(f => ({ ...f, phone: value }));
    setUI(u => ({ ...u, phoneError: "", tailorFound: false }));
    if (value.length !== 10) return;
    setUI(u => ({ ...u, searching: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/review/find-by-phone", { phone: value }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.status) { setForm(f => ({ ...f, tailorName: res.data.name })); setUI(u => ({ ...u, tailorFound: true })); }
      else setUI(u => ({ ...u, phoneError: "No tailor found with this number" }));
    } catch { setUI(u => ({ ...u, phoneError: "No tailor found with this number" })); }
    finally { setUI(u => ({ ...u, searching: false })); }
  };

  const handleSubmit = async () => {
    setUI(u => ({ ...u, submitError: "" }));
    if (!ui.tailorFound) return setUI(u => ({ ...u, submitError: "Enter a valid tailor phone number" }));
    if (form.rating === 0) return setUI(u => ({ ...u, submitError: "Please select a rating" }));
    if (!form.review.trim()) return setUI(u => ({ ...u, submitError: "Please write a review" }));
    setUI(u => ({ ...u, loading: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/review/add", { phone: form.phone, rating: form.rating, review: form.review }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.status) setStage("success");
      else setUI(u => ({ ...u, submitError: "Failed to publish" }));
    } catch { setUI(u => ({ ...u, submitError: "Failed to publish" })); }
    finally { setUI(u => ({ ...u, loading: false })); }
  };

  const reset = () => {
    setStage("form"); setForm({ phone: "", tailorName: "", rating: 0, review: "" });
    setUI({ tailorFound: false, phoneError: "", submitError: "", loading: false, searching: false }); setHovered(0);
  };

  const inp: React.CSSProperties = { width: "100%", padding: "12px 14px", border: `1.5px solid ${t.inputBorder}`, borderRadius: "10px", fontSize: "14px", color: t.inputText, background: t.inputBg, boxSizing: "border-box", transition: "border-color 0.2s", outline: "none" };
  const lbl: React.CSSProperties = { display: "block", fontSize: "11px", fontWeight: 600, color: t.label, marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" };

  return (
    <div style={{ minHeight: "100vh", background: t.pageBg, fontFamily: "'DM Sans',sans-serif", transition: "background 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease both; }
        input::placeholder, textarea::placeholder { color: #c4b8a8; }
        textarea { resize: none; font-family: 'DM Sans',sans-serif; }
        button:active { transform: scale(0.98); }
        @media (max-width: 480px) {
          .review-card { padding: 20px !important; margin: 12px !important; }
        }
      `}</style>

      <DarkToggleNav dark={dark} onToggle={() => setDark(!dark)} title="Write a Review" />

      {/* Texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle,rgba(139,115,85,0.05) 1px,transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", position: "relative", zIndex: 1 }}>
        <div className="review-card fade-up" style={{ width: "100%", maxWidth: "460px", background: t.cardBg, borderRadius: "24px", padding: "36px", boxShadow: "0 8px 48px rgba(139,115,85,0.12)", border: `1px solid ${t.cardBorder}`, transition: "background 0.3s" }}>
          {stage === "form" && (
            <>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <span style={{ fontSize: "36px", display: "block", marginBottom: "10px" }}>✂️</span>
                <h1 style={{ fontFamily: "'Lora',serif", fontSize: "22px", color: t.title, fontWeight: 600, margin: "0 0 4px" }}>Tailor Review</h1>
                <p style={{ color: t.sub, fontSize: "11px", letterSpacing: "2.5px" }}>SHARE YOUR EXPERIENCE</p>
                <div style={{ width: "36px", height: "2px", background: "linear-gradient(90deg,#8b7355,#c9a84c)", borderRadius: "2px", margin: "12px auto 0" }} />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={lbl}>Tailor's Mobile Number</label>
                <input style={{ ...inp, borderColor: ui.tailorFound ? t.accent : ui.phoneError ? "#e05555" : t.inputBorder }}
                  placeholder="Enter 10-digit number" maxLength={10} value={form.phone}
                  onChange={e => handlePhoneLookup(e.target.value.replace(/\D/g, ""))}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = ui.tailorFound ? t.accent : ui.phoneError ? "#e05555" : t.inputBorder} />
                {ui.searching && <p style={{ color: t.hint, fontSize: "12px", marginTop: "5px" }}>Searching...</p>}
                {ui.tailorFound && <p style={{ color: t.found, fontSize: "13px", fontWeight: 600, marginTop: "5px" }}>✓ {form.tailorName}</p>}
                {ui.phoneError && <p style={{ color: "#e05555", fontSize: "11px", marginTop: "4px" }}>{ui.phoneError}</p>}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={lbl}>Rate Your Experience</label>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  {[1,2,3,4,5].map(star => (
                    <button key={star} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", transition: "transform 0.15s" }}
                      onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
                      onClick={() => setForm(f => ({ ...f, rating: star }))}>
                      <svg width="32" height="32" viewBox="0 0 24 24"
                        fill={star <= (hovered || form.rating) ? "#c9a84c" : "none"}
                        stroke={star <= (hovered || form.rating) ? "#c9a84c" : "#d4c4a8"} strokeWidth="1.5">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={lbl}>Write Your Review</label>
                <textarea style={{ ...inp, height: "100px" }}
                  placeholder="Tell others about your experience..."
                  maxLength={300} value={form.review}
                  onChange={e => setForm(f => ({ ...f, review: e.target.value }))} />
                <p style={{ textAlign: "right", fontSize: "11px", color: t.charCount, marginTop: "3px" }}>{form.review.length}/300</p>
              </div>

              {ui.submitError && <p style={{ color: "#e05555", fontSize: "12px", marginBottom: "12px" }}>{ui.submitError}</p>}

              <button style={{ width: "100%", padding: "13px", background: t.accent, color: "#fef3e2", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s", opacity: ui.loading ? 0.7 : 1 }}
                onClick={handleSubmit} disabled={ui.loading}
                onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                onMouseLeave={e => e.currentTarget.style.background = t.accent}>
                {ui.loading ? "Publishing..." : "Publish Review"}
              </button>
            </>
          )}

          {stage === "success" && (
            <div className="fade-up" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h2 style={{ fontFamily: "'Lora',serif", fontSize: "22px", color: t.title, fontWeight: 600, marginBottom: "8px" }}>Review Published!</h2>
              <p style={{ color: t.sub, fontSize: "11px", letterSpacing: "2.5px" }}>Thank you for reviewing</p>
              <p style={{ fontFamily: "'Lora',serif", fontSize: "17px", color: t.title, fontWeight: 600, margin: "4px 0 16px" }}>{form.tailorName}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "12px" }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="26" height="26" viewBox="0 0 24 24" fill={s <= form.rating ? "#c9a84c" : "none"} stroke={s <= form.rating ? "#c9a84c" : "#d4c4a8"} strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p style={{ color: t.sub, fontSize: "13px", fontStyle: "italic", margin: "0 0 24px", lineHeight: 1.6 }}>"{form.review}"</p>
              <button style={{ width: "100%", padding: "13px", background: t.accent, color: "#fef3e2", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                onClick={reset}
                onMouseEnter={e => e.currentTarget.style.background = t.accentHover}
                onMouseLeave={e => e.currentTarget.style.background = t.accent}>
                Write Another Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TailorReview;