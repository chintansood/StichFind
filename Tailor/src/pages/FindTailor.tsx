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
    <span className="text-xs text-gray-400 ml-1">
      {rating > 0 ? rating.toFixed(1) : "New"}
    </span>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="h-8 bg-gray-200 rounded-xl mt-3" />
    </div>
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

  // ✅ Load cities AND all tailors on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // Load cities
    api.get("/tailor/cities", { headers })
      .then(res => { if (res.data.status) setCities(res.data.cities); })
      .catch(console.error);

    // ✅ Load all tailors by default
    handleFind(1, "", "");
  }, []);

  const handleFind = async (p = 1, city = selectedCity, category = selectedCategory) => {
    setLoading(true);
    setSearched(true);
    setFilterOpen(false);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/tailor/find",
        { city, category, page: p, limit: 6 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) {
        setTailors(res.data.tailors);
        setTotalPages(res.data.totalPages);
        setPage(p);
      } else {
        setTailors([]);
      }
    } catch {
      setTailors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => handleFind(1, selectedCity, selectedCategory);

  const handleClearCity = () => {
    setSelectedCity("");
    handleFind(1, "", selectedCategory);
  };

  const handleClearCategory = () => {
    setSelectedCategory("");
    handleFind(1, selectedCity, "");
  };

  const FilterPanel = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 text-base mb-5" style={{ fontFamily: "'Lora',serif" }}>Filters</h2>

      {/* City */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">City</label>
        <div className="relative">
          <select
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            value={selectedCity}
            onChange={e => {
              setSelectedCity(e.target.value);
              handleFind(1, e.target.value, selectedCategory);
            }}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Category</label>
        <div className="space-y-2">
          {["", ...CATEGORIES].map(cat => (
            <label key={cat || "all"} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
              <input
                type="radio" name="cat"
                checked={selectedCategory === cat}
                onChange={() => {
                  setSelectedCategory(cat);
                  handleFind(1, selectedCity, cat);
                }}
                className="accent-indigo-600 w-4 h-4" />
              {cat || "All Categories"}
            </label>
          ))}
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Searching..." : "Search Tailors"}
      </button>

      {/* Clear filters */}
      {(selectedCity || selectedCategory) && (
        <button
          onClick={() => {
            setSelectedCity("");
            setSelectedCategory("");
            handleFind(1, "", "");
          }}
          className="w-full mt-2 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
          ✕ Clear all filters
        </button>
      )}

      {searched && !loading && (
        <p className="text-center text-xs text-gray-400 mt-3">
          {tailors.length > 0
            ? `${tailors.length} tailor${tailors.length > 1 ? "s" : ""} found`
            : "No results"}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform:rotate(360deg) } }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.3s ease both; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>
            {selectedCity ? `Tailors in ${selectedCity}` : "All Tailors"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {searched && !loading
              ? tailors.length > 0
                ? `${tailors.length} tailor${tailors.length > 1 ? "s" : ""} found${selectedCategory ? ` · ${selectedCategory}` : ""}`
                : "No tailors found"
              : "Discover verified tailors near you"}
          </p>
        </div>

        {/* Active filter chips */}
        {(selectedCity || selectedCategory) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {selectedCity && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
                📍 {selectedCity}
                <button onClick={handleClearCity} className="text-indigo-400 hover:text-indigo-600 ml-0.5">✕</button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-100">
                👗 {selectedCategory}
                <button onClick={handleClearCategory} className="text-amber-400 hover:text-amber-600 ml-0.5">✕</button>
              </span>
            )}
          </div>
        )}

        {/* Mobile filter toggle */}
        <button
          className="sm:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
          onClick={() => setFilterOpen(!filterOpen)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2" />
          </svg>
          {filterOpen ? "Hide Filters" : "Show Filters"}
          {(selectedCity || selectedCategory) && (
            <span className="ml-auto w-2 h-2 bg-indigo-500 rounded-full" />
          )}
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Sidebar */}
          <div className={`w-full sm:w-56 sm:sticky sm:top-20 flex-shrink-0 ${filterOpen ? "block" : "hidden sm:block"}`}>
            <FilterPanel />
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">

            {/* Loading skeletons */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && searched && tailors.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center text-3xl mb-5">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "'Lora',serif" }}>No tailors found</h3>
                <p className="text-gray-400 text-sm mb-5">Try a different city or remove the category filter.</p>
                <button
                  onClick={() => { setSelectedCity(""); setSelectedCategory(""); handleFind(1, "", ""); }}
                  className="px-5 py-2 border-2 border-indigo-200 text-indigo-600 font-semibold rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                  Show All Tailors
                </button>
              </div>
            )}

            {/* Tailor cards */}
            {!loading && tailors.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tailors.map((tailor, i) => (
                    <div key={tailor._id}
                      className="fade-in bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                      style={{ animationDelay: `${i * 50}ms` }}>

                      {/* Image */}
                      <div className="h-44 bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden">
                        {tailor.profileImage && tailor.profileImage !== "nopic.jpg" ? (
                          <img src={tailor.profileImage} alt={tailor.fullName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-5xl opacity-20">✂️</span>
                          </div>
                        )}
                        {/* Work type */}
                        {tailor.workType && (
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full shadow-sm">
                            {tailor.workType === "Home" ? "🏠 Home" : tailor.workType === "Shop" ? "🏪 Shop" : "🏠🏪 Both"}
                          </span>
                        )}
                        {/* Rating badge */}
                        {tailor.avgRating > 0 && (
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full shadow-sm">
                            ★ {tailor.avgRating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-sm mb-0.5" style={{ fontFamily: "'Lora',serif" }}>
                          {tailor.fullName}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {tailor.city}
                        </p>

                        <StarRating rating={tailor.avgRating || 0} />

                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {tailor.category && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full">{tailor.category}</span>
                          )}
                          {tailor.specialty && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-amber-50 text-amber-600 rounded-full">{tailor.specialty}</span>
                          )}
                          {tailor.experience && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-green-50 text-green-600 rounded-full">Since {tailor.experience}</span>
                          )}
                        </div>

                        <a href={`tel:${tailor.phone}`}
                          className="flex items-center justify-center gap-1.5 w-full mt-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Call Tailor
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button onClick={() => handleFind(page - 1, selectedCity, selectedCategory)} disabled={page === 1}
                      className="w-9 h-9 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                      ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => handleFind(p, selectedCity, selectedCategory)}
                        className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${p === page ? "bg-indigo-600 text-white shadow-md" : "border-2 border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                        {p}
                      </button>
                    ))}
                    <button onClick={() => handleFind(page + 1, selectedCity, selectedCategory)} disabled={page === totalPages}
                      className="w-9 h-9 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                      →
                    </button>
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