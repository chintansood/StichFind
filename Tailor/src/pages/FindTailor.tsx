import { useState, useEffect } from "react";
import axios from "axios";

const CATEGORIES = ["Men", "Women", "Children"];

interface Tailor {
  _id: string; fullName: string; profileImage: string; city: string;
  category: string; specialty: string; experience: string;
  workType: string; phone: string; avgRating: number; totalReviews: number;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map(s=>(
      <svg key={s} width="13" height="13" viewBox="0 0 24 24"
        fill={s<=Math.round(rating)?"#c9a84c":"none"}
        stroke={s<=Math.round(rating)?"#c9a84c":"#d4c4a8"} strokeWidth="1.8">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ))}
    <span className="text-xs text-[#a0917e] ml-1">{rating>0 ? rating.toFixed(1) : "No reviews"}</span>
  </div>
);

const TailorCard = ({ tailor, index }: { tailor: Tailor; index: number }) => (
  <div className="bg-white rounded-2xl border border-[#ede5d8] overflow-hidden transition-all duration-300 hover:-translate-y-1 card-appear"
    style={{boxShadow:"0 2px 16px rgba(139,115,85,0.08)", animationDelay:`${index*70}ms`}}>
    <div className="h-44 bg-[#fdf8f3] relative overflow-hidden">
      {tailor.profileImage && tailor.profileImage!=="nopic.jpg"
        ? <img src={tailor.profileImage} alt={tailor.fullName} className="w-full h-full object-cover" />
        : <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">✂️</div>}
      {tailor.workType && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 bg-white/80 text-[#8b7355] rounded-full border border-[#e8e0d5] backdrop-blur-sm">
          {tailor.workType}
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 style={{fontFamily:"'Lora',serif"}} className="font-semibold text-[#2c1e0f] text-base mb-0.5">{tailor.fullName}</h3>
      <p className="text-xs text-[#a0917e] mb-2">📍 {tailor.city}</p>
      <StarRating rating={tailor.avgRating||0} />
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {tailor.category && <span className="px-2.5 py-0.5 text-[11px] font-medium bg-[#fdf8f3] text-[#8b7355] rounded-full border border-[#e8e0d5]">{tailor.category}</span>}
        {tailor.specialty && <span className="px-2.5 py-0.5 text-[11px] font-medium bg-[#fef9f0] text-[#a0804a] rounded-full border border-[#f0e4c8]">{tailor.specialty}</span>}
      </div>
      {tailor.experience && <p className="text-xs text-[#c4b8a8] mt-1.5">🧵 Since {tailor.experience}</p>}
      <a href={`tel:${tailor.phone}`}
        className="block text-center mt-3 py-2 rounded-xl text-sm font-semibold text-[#fef3e2] transition-all"
        style={{background:"#8b7355"}}
        onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.background="#6b5a42"}
        onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.background="#8b7355"}>
        📞 Call Tailor
      </a>
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

useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get("http://localhost:3000/tailor/cities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    if (res.data.status) setCities(res.data.cities);
  });
}, []);

const handleFind = async (p = 1) => {
  if (!selectedCity) return alert("Please select a city");

  setLoading(true);
  setSearched(true);

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/tailor/find",
      {
        city: selectedCity,
        category: selectedCategory,
        page: p,
        limit: 6
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

  const inp = "w-full px-3 py-2.5 border border-[#e8e0d5] rounded-xl text-sm text-[#2c1e0f] bg-[#fdf8f3] focus:outline-none focus:border-[#8b7355] transition";

  return (
    <div className="min-h-screen bg-[#fdf8f3]" style={{fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cardUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .card-appear{animation:cardUp 0.4s ease both}
        select option{background:#fdf8f3;color:#2c1e0f}
        select{appearance:none}
        button:active{transform:scale(0.98)}
      `}</style>

      {/* Dot texture */}
      <div className="fixed inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle,rgba(139,115,85,0.05) 1px,transparent 1px)",backgroundSize:"24px 24px"}} />

      {/* Header */}
      <header className="relative z-10 bg-white border-b border-[#ede5d8]" style={{boxShadow:"0 1px 12px rgba(139,115,85,0.06)"}}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">✂️</span>
          <div>
            <span style={{fontFamily:"'Lora',serif"}} className="text-xl font-semibold text-[#2c1e0f]">StitchFind</span>
            <p className="text-xs text-[#a0917e]">Discover skilled tailors near you</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 style={{fontFamily:"'Lora',serif"}} className="text-3xl font-semibold text-[#2c1e0f]">Find Tailors</h1>
          <p className="text-[#a0917e] text-sm mt-1">Filter by city and category to discover the right fit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl border border-[#ede5d8] p-6 sticky top-6" style={{boxShadow:"0 2px 20px rgba(139,115,85,0.07)"}}>
            <h2 style={{fontFamily:"'Lora',serif"}} className="text-lg font-semibold text-[#2c1e0f] mb-5">Filters</h2>

            {/* City */}
            <div className="mb-5">
              <label className="block text-[10px] font-semibold text-[#6b5a42] uppercase tracking-widest mb-2">City</label>
              <div className="relative">
                <select className={inp} value={selectedCity} onChange={e=>setSelectedCity(e.target.value)}>
                  <option value="">Select city...</option>
                  {cities.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0917e] pointer-events-none text-xs">▾</span>
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-[10px] font-semibold text-[#6b5a42] uppercase tracking-widest mb-3">Category</label>
              <div className="space-y-2.5">
                {["", ...CATEGORIES].map(cat=>(
                  <label key={cat||"all"} className="flex items-center gap-3 text-sm text-[#6b5a42] cursor-pointer hover:text-[#2c1e0f] transition">
                    <input type="radio" name="cat" checked={selectedCategory===cat} onChange={()=>setSelectedCategory(cat)} className="w-4 h-4 accent-[#8b7355]" />
                    {cat || "All"}
                  </label>
                ))}
              </div>
            </div>

            <button onClick={()=>handleFind(1)} disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-[#fef3e2] transition-all disabled:opacity-50"
              style={{background:"#8b7355"}}
              onMouseEnter={e=>!loading&&(e.currentTarget.style.background="#6b5a42")}
              onMouseLeave={e=>e.currentTarget.style.background="#8b7355"}>
              {loading ? "Searching..." : "Find Tailors"}
            </button>

            {searched && !loading && (
              <p className="text-center text-xs text-[#a0917e] mt-3">
                {tailors.length>0 ? `${tailors.length} tailor${tailors.length>1?"s":""} found` : "No results"}
              </p>
            )}
          </div>

          {/* RESULTS */}
          <div className="md:col-span-3">
            {!searched && !loading && (
              <div className="flex flex-col items-center justify-center h-72 text-center">
                <span className="text-6xl mb-4 opacity-20">✂️</span>
                <p className="text-[#c4b8a8] text-sm">Select a city and click "Find Tailors"</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-72">
                <div className="w-10 h-10 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#a0917e] text-sm">Finding tailors for you...</p>
              </div>
            )}

            {!loading && searched && tailors.length===0 && (
              <div className="flex flex-col items-center justify-center h-72 text-center">
                <span className="text-5xl mb-4 opacity-20">🔍</span>
                <p className="text-[#c4b8a8] text-sm">No tailors found. Try a different city or category.</p>
              </div>
            )}

            {!loading && tailors.length>0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tailors.map((t,i)=><TailorCard key={t._id} tailor={t} index={i} />)}
                </div>

                {totalPages>1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                      <button key={p} onClick={()=>handleFind(p)}
                        className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${p===page ? "text-[#fef3e2]" : "bg-white border border-[#e8e0d5] text-[#8b7355] hover:bg-[#fdf8f3]"}`}
                        style={p===page ? {background:"#8b7355"} : {}}>
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
