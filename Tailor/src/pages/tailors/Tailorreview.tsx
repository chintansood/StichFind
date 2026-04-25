import { useState } from "react";
import api from "../../api/axios";

type Stage = "form" | "success";

const TailorReview = () => {
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
    if (form.rating === 0) return setUI(u => ({ ...u, submitError: "Please select a star rating" }));
    if (!form.review.trim()) return setUI(u => ({ ...u, submitError: "Please write a review" }));
    setUI(u => ({ ...u, loading: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/review/add",
        { phone: form.phone, rating: form.rating, review: form.review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) setStage("success");
      else setUI(u => ({ ...u, submitError: res.data.msg || "Failed to publish" }));
    } catch { setUI(u => ({ ...u, submitError: "Failed to publish review" })); }
    finally { setUI(u => ({ ...u, loading: false })); }
  };

  const reset = () => {
    setStage("form");
    setForm({ phone: "", tailorName: "", rating: 0, review: "" });
    setUI({ tailorFound: false, phoneError: "", submitError: "", loading: false, searching: false });
    setHovered(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@300;400;500;600&display=swap'); textarea{resize:none;font-family:'Inter',sans-serif}`}</style>

      <div className="w-full max-w-md">

        {stage === "form" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9">
            {/* Header */}
            <div className="text-center mb-7">
              <div className="text-4xl mb-3">✂️</div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Write a Review</h1>
              <p className="text-gray-400 text-sm mt-1">Share your experience with your tailor</p>
              <div className="w-10 h-0.5 bg-indigo-500 rounded mx-auto mt-3" />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tailor's Mobile Number</label>
              <input
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${ui.tailorFound ? "border-green-400 bg-green-50" : ui.phoneError ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                placeholder="Enter 10-digit number" maxLength={10} value={form.phone}
                onChange={e => handlePhoneLookup(e.target.value.replace(/\D/g, ""))} />
              {ui.searching && <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1"><svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Searching...</p>}
              {ui.tailorFound && <p className="text-green-600 text-xs font-semibold mt-1.5 flex items-center gap-1">✓ Found: {form.tailorName}</p>}
              {ui.phoneError && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {ui.phoneError}</p>}
            </div>

            {/* Stars */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Rating</label>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map(star => (
                  <button key={star} className="p-1 transition-transform hover:scale-110"
                    onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
                    onClick={() => setForm(f => ({ ...f, rating: star }))}>
                    <svg width="32" height="32" viewBox="0 0 24 24"
                      fill={star <= (hovered || form.rating) ? "#f59e0b" : "none"}
                      stroke={star <= (hovered || form.rating) ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  </button>
                ))}
              </div>
              {form.rating > 0 && (
                <p className="text-center text-xs text-amber-500 font-medium mt-1.5">
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][form.rating]}
                </p>
              )}
            </div>

            {/* Review text */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Your Review</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 placeholder-gray-300"
                placeholder="Tell others about your experience..."
                maxLength={300} value={form.review}
                onChange={e => setForm(f => ({ ...f, review: e.target.value }))} />
              <p className="text-right text-xs text-gray-300 mt-0.5">{form.review.length}/300</p>
            </div>

            {ui.submitError && (
              <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium flex items-center gap-2">
                ⚠ {ui.submitError}
              </div>
            )}

            <button
              onClick={handleSubmit} disabled={ui.loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {ui.loading ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Publishing...</>
              ) : "Publish Review →"}
            </button>
          </div>
        )}

        {stage === "success" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-9 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Lora',serif" }}>Review Published!</h2>
            <p className="text-gray-400 text-sm mb-4">Thank you for reviewing</p>
            <p className="font-semibold text-gray-900 text-lg mb-4" style={{ fontFamily: "'Lora',serif" }}>{form.tailorName}</p>
            <div className="flex justify-center gap-1 mb-5">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="24" height="24" viewBox="0 0 24 24"
                  fill={s <= form.rating ? "#f59e0b" : "none"}
                  stroke={s <= form.rating ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <p className="text-gray-400 text-sm italic mb-7 px-4">"{form.review}"</p>
            <button onClick={reset}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
              Write Another Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TailorReview;