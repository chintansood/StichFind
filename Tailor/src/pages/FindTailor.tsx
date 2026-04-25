import { useState, useEffect } from "react";
import api from "../api/axios";

const CATEGORIES = ["Men", "Women", "Children"];

interface Tailor {
  _id: string; fullName: string; profileImage: string; city: string;
  category: string; specialty: string; experience: string;
  workType: string; phone: string; avgRating: number; totalReviews: number;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="13" height="13" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
        stroke={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"} strokeWidth="1.8">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
    <span className="text-xs text-gray-400 ml-1">{rating > 0 ? rating.toFixed(1) : "No reviews"}</span>
  </div>
);

export default function FindTailor() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get("/tailor/cities", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.data.status) setCities(res.data.cities); });
  }, []);

  const handleFind = async (p = 1) => {
    if (!selectedCity) return alert("Please select a city");
    setLoading(true); setSearched(true); setFilterOpen(false);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/tailor/find",
        { city: selectedCity, category: selectedCategory, page: p, limit: 6 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) { setTailors(res.data.tailors); setTotalPages(res.data.totalPages); setPage(p); }
      else setTailors([]);
    } catch { setTailors([]); }
    finally { setLoading(false); }
  };

  const FilterPanel = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 text-base mb-5" style={{ fontFamily: "'Lora',serif" }}>Filters</h2>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">City</label>
        <div className="relative">
          <select
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">Select city...</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Category</label>
        <div className="space-y-2">
          {["", ...CATEGORIES].map(cat => (
            <label key={cat || "all"} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
              <input type="radio" name="cat" checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="accent-indigo-600 w-4 h-4" />
              {cat || "All Categories"}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleFind(1)}
        disabled={loading}
        className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Searching..." : "Find Tailors"}
      </button>

      {searched && !loading && (
        <p className="text-center text-xs text-gray-400 mt-3">
          {tailors.length > 0 ? `${tailors.length} tailor${tailors.length > 1 ? "s" : ""} found` : "No results"}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@300;400;500;600&display=swap'); @keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin 0.8s linear infinite}`}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Find Tailors</h1>
          <p className="text-gray-500 text-sm mt-1">Filter by city and category to discover the right fit</p>
        </div>

        {/* Mobile filter toggle */}
        <button
          className="sm:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2" />
          </svg>
          {filterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Sidebar */}
          <div className={`w-full sm:w-56 sm:sticky sm:top-20 flex-shrink-0 ${filterOpen ? "block" : "hidden sm:block"}`}>
            <FilterPanel />
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {!searched && !loading && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-5xl mb-4 opacity-20">✂️</div>
                <p className="text-gray-400 text-sm">Select a city and click "Find Tailors" to get started</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full spin mb-3" />
                <p className="text-gray-400 text-sm">Finding tailors for you...</p>
              </div>
            )}

            {!loading && searched && tailors.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-5xl mb-4 opacity-20">🔍</div>
                <p className="text-gray-700 font-semibold mb-1">No tailors found</p>
                <p className="text-gray-400 text-sm">Try another city or category.</p>
              </div>
            )}

            {!loading && tailors.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tailors.map((tailor) => (
                    <div key={tailor._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <div className="h-40 bg-gray-50 relative overflow-hidden">
                        {tailor.profileImage && tailor.profileImage !== "nopic.jpg"
                          ? <img src={tailor.profileImage} alt={tailor.fullName} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">✂️</div>}
                        {tailor.workType && (
                          <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 bg-white text-indigo-600 rounded-full border border-indigo-100 shadow-sm">{tailor.workType}</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-sm mb-0.5" style={{ fontFamily: "'Lora',serif" }}>{tailor.fullName}</h3>
                        <p className="text-xs text-gray-400 mb-2">📍 {tailor.city}</p>
                        <StarRating rating={tailor.avgRating || 0} />
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {tailor.category && <span className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">{tailor.category}</span>}
                          {tailor.specialty && <span className="px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">{tailor.specialty}</span>}
                        </div>
                        {tailor.experience && <p className="text-xs text-gray-400 mt-1.5">🧵 Since {tailor.experience}</p>}
                        <a href={`tel:${tailor.phone}`}
                          className="block text-center mt-3 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                          📞 Call Tailor
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => handleFind(p)}
                        className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${p === page ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                        {p}
                      </button>
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