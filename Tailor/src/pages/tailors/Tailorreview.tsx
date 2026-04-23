import { useState } from "react";
import axios from "axios";

type Stage = "form" | "success";

const TailorReview = () => {
  const [stage, setStage] = useState<Stage>("form");
  const [form, setForm] = useState({ phone:"", tailorName:"", rating:0, review:"" });
  const [ui, setUI] = useState({ tailorFound:false, phoneError:"", submitError:"", loading:false, searching:false });
  const [hovered, setHovered] = useState(0);

  const handlePhoneLookup = async (value: string) => {
  setForm(f => ({ ...f, phone: value }));
  setUI(u => ({ ...u, phoneError: "", tailorFound: false }));

  if (value.length !== 10) return;

  setUI(u => ({ ...u, searching: true }));

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/review/find-by-phone",
      { phone: value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.status) {
      setForm(f => ({ ...f, tailorName: res.data.name }));
      setUI(u => ({ ...u, tailorFound: true }));
    } else {
      setUI(u => ({ ...u, phoneError: "No tailor found with this number" }));
    }
  } catch {
    setUI(u => ({ ...u, phoneError: "No tailor found with this number" }));
  } finally {
    setUI(u => ({ ...u, searching: false }));
  }
};

const handleSubmit = async () => {
  setUI(u => ({ ...u, submitError: "" }));

  if (!ui.tailorFound) {
    return setUI(u => ({ ...u, submitError: "Enter a valid tailor phone number" }));
  }

  if (form.rating === 0) {
    return setUI(u => ({ ...u, submitError: "Please select a rating" }));
  }

  if (!form.review.trim()) {
    return setUI(u => ({ ...u, submitError: "Please write a review" }));
  }

  setUI(u => ({ ...u, loading: true }));

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/review/add",
      {
        phone: form.phone,
        rating: form.rating,
        review: form.review
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.status) {
      setStage("success");
    } else {
      setUI(u => ({ ...u, submitError: "Failed to publish" }));
    }
  } catch {
    setUI(u => ({ ...u, submitError: "Failed to publish" }));
  } finally {
    setUI(u => ({ ...u, loading: false }));
  }
};

  const reset = () => {
    setStage("form");
    setForm({ phone:"", tailorName:"", rating:0, review:"" });
    setUI({ tailorFound:false, phoneError:"", submitError:"", loading:false, searching:false });
    setHovered(0);
  };

  return (
    <div style={s.page}>
      <style>{css}</style>
      {/* Subtle texture */}
      <div style={s.texture} />

      <div style={s.card} className="fade-up">
        {stage === "form" && (
          <>
            <div style={s.header}>
              <span style={s.icon}>✂️</span>
              <h1 style={s.title}>Tailor Review</h1>
              <p style={s.subtitle}>SHARE YOUR EXPERIENCE</p>
              <div style={s.divider} />
            </div>

            {/* Phone */}
            <div style={s.field}>
              <label style={s.label}>Tailor's Mobile Number</label>
              <input
                style={{...s.input, borderColor: ui.tailorFound?"#8b7355":ui.phoneError?"#c0392b":"#e8e0d5"}}
                placeholder="Enter 10-digit number"
                maxLength={10}
                value={form.phone}
                onChange={e=>handlePhoneLookup(e.target.value.replace(/\D/g,""))}
                onFocus={e=>e.target.style.borderColor="#8b7355"}
                onBlur={e=>e.target.style.borderColor=ui.tailorFound?"#8b7355":ui.phoneError?"#c0392b":"#e8e0d5"}
              />
              {ui.searching && <p style={s.hint}>Searching...</p>}
              {ui.tailorFound && <p style={s.found}>✓ {form.tailorName}</p>}
              {ui.phoneError && <p style={s.err}>{ui.phoneError}</p>}
            </div>

            {/* Stars */}
            <div style={s.field}>
              <label style={s.label}>Rate Your Experience</label>
              <div style={s.stars}>
                {[1,2,3,4,5].map(star=>(
                  <button key={star} style={s.starBtn}
                    onMouseEnter={()=>setHovered(star)} onMouseLeave={()=>setHovered(0)}
                    onClick={()=>setForm(f=>({...f,rating:star}))}>
                    <svg width="34" height="34" viewBox="0 0 24 24"
                      fill={star<=(hovered||form.rating)?"#c9a84c":"none"}
                      stroke={star<=(hovered||form.rating)?"#c9a84c":"#d4c4a8"}
                      strokeWidth="1.5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div style={s.field}>
              <label style={s.label}>Write Your Review</label>
              <textarea style={s.textarea}
                placeholder="Tell others about your experience with this tailor..."
                maxLength={300}
                value={form.review}
                onChange={e=>setForm(f=>({...f,review:e.target.value}))}
              />
              <p style={s.charCount}>{form.review.length}/300</p>
            </div>

            {ui.submitError && <p style={{...s.err, marginBottom:"12px"}}>{ui.submitError}</p>}

            <button style={{...s.btn, opacity:ui.loading?0.7:1}}
              onClick={handleSubmit} disabled={ui.loading}
              onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
              onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
              {ui.loading ? "Publishing..." : "Publish Review"}
            </button>
          </>
        )}

        {stage === "success" && (
          <div style={s.success} className="fade-up">
            <div style={s.confettiIcon}>🎉</div>
            <h2 style={{...s.title, marginBottom:"8px"}}>Review Published!</h2>
            <p style={s.subtitle}>Thank you for reviewing</p>
            <p style={{fontFamily:"'Lora',serif", fontSize:"18px", color:"#2c1e0f", fontWeight:600, margin:"4px 0 20px"}}>{form.tailorName}</p>
            <div style={s.stars}>
              {[1,2,3,4,5].map(s2=>(
                <svg key={s2} width="28" height="28" viewBox="0 0 24 24"
                  fill={s2<=form.rating?"#c9a84c":"none"}
                  stroke={s2<=form.rating?"#c9a84c":"#d4c4a8"} strokeWidth="1.5">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              ))}
            </div>
            <p style={s.reviewPreview}>"{form.review}"</p>
            <button style={s.btn} onClick={reset}
              onMouseEnter={e=>e.currentTarget.style.background="#6b5a42"}
              onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
              Write Another Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeUp 0.5s ease both}
  input::placeholder,textarea::placeholder{color:#c4b8a8}
  input:focus,textarea:focus{outline:none}
  button:active{transform:scale(0.98)}
  textarea{resize:none;font-family:'DM Sans',sans-serif}
`;

const s: Record<string,React.CSSProperties> = {
  page:{ minHeight:"100vh", background:"#fdf8f3", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'DM Sans',sans-serif", position:"relative" },
  texture:{ position:"fixed", inset:0, backgroundImage:"radial-gradient(circle,rgba(139,115,85,0.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" },
  card:{ width:"100%", maxWidth:"460px", background:"#ffffff", borderRadius:"24px", padding:"40px", boxShadow:"0 8px 48px rgba(139,115,85,0.12)", border:"1px solid #ede5d8", position:"relative", zIndex:1 },
  header:{ textAlign:"center" as const, marginBottom:"28px" },
  icon:{ fontSize:"36px", display:"block", marginBottom:"10px" },
  title:{ fontFamily:"'Lora',serif", fontSize:"24px", color:"#2c1e0f", fontWeight:600, margin:"0 0 4px" },
  subtitle:{ color:"#a0917e", fontSize:"11px", letterSpacing:"2.5px", margin:0 },
  divider:{ width:"36px", height:"2px", background:"linear-gradient(90deg,#8b7355,#c9a84c)", borderRadius:"2px", margin:"14px auto 0" },
  field:{ marginBottom:"22px" },
  label:{ display:"block", fontSize:"11px", fontWeight:600, color:"#6b5a42", marginBottom:"8px", letterSpacing:"1px", textTransform:"uppercase" as const },
  input:{ width:"100%", padding:"12px 14px", border:"1.5px solid #e8e0d5", borderRadius:"10px", fontSize:"14px", color:"#2c1e0f", background:"#fdf8f3", boxSizing:"border-box" as const, transition:"border-color 0.2s" },
  textarea:{ width:"100%", padding:"12px 14px", border:"1.5px solid #e8e0d5", borderRadius:"10px", fontSize:"14px", color:"#2c1e0f", background:"#fdf8f3", boxSizing:"border-box" as const, height:"110px" },
  stars:{ display:"flex", justifyContent:"center", gap:"6px" },
  starBtn:{ background:"none", border:"none", cursor:"pointer", padding:"2px", transition:"transform 0.15s" },
  hint:{ color:"#a0917e", fontSize:"12px", marginTop:"6px" },
  found:{ color:"#8b7355", fontSize:"13px", fontWeight:600, marginTop:"6px" },
  err:{ color:"#c0392b", fontSize:"11px", marginTop:"4px" },
  charCount:{ textAlign:"right" as const, fontSize:"11px", color:"#c4b8a8", marginTop:"4px" },
  btn:{ width:"100%", padding:"14px", background:"#8b7355", color:"#fef3e2", border:"none", borderRadius:"12px", fontSize:"14px", fontWeight:600, cursor:"pointer", transition:"background 0.2s", letterSpacing:"0.3px" },
  success:{ textAlign:"center" as const },
  confettiIcon:{ fontSize:"52px", marginBottom:"16px" },
  reviewPreview:{ color:"#a0917e", fontSize:"13px", fontStyle:"italic", margin:"16px 0 24px", lineHeight:1.6 },
};

export default TailorReview;
