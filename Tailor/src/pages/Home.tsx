import { Link } from "react-router-dom";

const features = [
  { icon: "🔍", title: "Find Tailors Near You", desc: "Search by city and category to discover skilled tailors instantly." },
  { icon: "✅", title: "Aadhaar Verified", desc: "Every tailor is verified with Aadhaar so you always know who you're hiring." },
  { icon: "⭐", title: "Genuine Reviews", desc: "Real ratings from real customers. Make informed decisions every time." },
  { icon: "📞", title: "Direct Contact", desc: "Call your tailor directly — no middlemen, no commission, no delays." },
  { icon: "👗", title: "All Categories", desc: "Men, Women, Children — from casual wear to bridal outfits." },
  { icon: "🏠", title: "Home or Shop", desc: "Filter by work type — home visits or shop-based tailors." },
];

const steps = [
  { step: "01", title: "Select Your City", desc: "Choose your city to instantly see verified tailors near you." },
  { step: "02", title: "Filter & Browse", desc: "Filter by category, rating, and work type to find your perfect match." },
  { step: "03", title: "Call & Get Stitched", desc: "Contact your tailor directly and get the perfect fit." },
];

const testimonials = [
  { name: "Priya Sharma", city: "Ludhiana", text: "Found an amazing tailor in 2 minutes. The bridal lehenga was perfect!", rating: 5, avatar: "👩" },
  { name: "Rahul Verma", city: "Chandigarh", text: "Super easy to use. Called the tailor directly and got my suit in 3 days.", rating: 5, avatar: "👨" },
  { name: "Anjali Singh", city: "Delhi", text: "Love that all tailors are verified. Felt safe and the work was excellent.", rating: 4, avatar: "👩‍🦱" },
];

// ── Premium Tailor Card Visual ──
const TailorCardPreview = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Ambient glow layers */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #fbbf24, transparent)" }} />

    {/* Main tailor profile card */}
    <div className="relative z-10 flex flex-col gap-4 w-full max-w-sm">

      {/* ── Floating badge — top right ── */}
      <div
        className="absolute -top-4 -right-4 z-20 flex items-center gap-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/40"
        style={{ animation: "floatUp 4s ease-in-out infinite" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Aadhaar Verified
      </div>

      {/* Main card */}
      <div
        className="bg-white rounded-2xl shadow-2xl shadow-indigo-900/20 overflow-hidden border border-gray-100"
        style={{ animation: "floatUp 5s ease-in-out 0.3s infinite" }}
      >
        {/* Card header */}
        <div className="px-5 pt-5 pb-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
            ✂️
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <p className="font-bold text-gray-900 text-base leading-tight">Rajan Kumar</p>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">₹300/suit</span>
            </div>
            <p className="text-gray-400 text-xs flex items-center gap-1">
              <span>📍</span> Ludhiana, Punjab
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">5.0 · 128 reviews</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-5" />

        {/* Specialties */}
        <div className="px-5 py-3 flex flex-wrap gap-2">
          {["Men's Suits", "Sherwani", "Alterations"].map(tag => (
            <span key={tag} className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">{tag}</span>
          ))}
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">🏠 Home Visits</span>
        </div>

        {/* CTA strip */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between bg-indigo-600 rounded-xl px-4 py-2.5 cursor-pointer hover:bg-indigo-700 transition-colors">
            <span className="text-white text-sm font-semibold">View Profile</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Mini card — new review ── */}
      <div
        className="bg-white rounded-xl shadow-lg shadow-indigo-900/10 px-4 py-3 flex items-center gap-3 border border-gray-100 self-end w-fit"
        style={{ animation: "floatUp 6s ease-in-out 1s infinite" }}
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-base flex-shrink-0">👩</div>
        <div>
          <p className="text-gray-800 text-xs font-semibold">Priya gave 5 stars ★</p>
          <p className="text-gray-400 text-[10px] mt-0.5">"Lehenga was absolutely perfect!"</p>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1 flex-shrink-0 animate-pulse" />
      </div>

      {/* ── Search bar card ── */}
      <div
        className="bg-white rounded-xl shadow-lg shadow-indigo-900/10 px-4 py-3 flex items-center gap-3 border border-gray-100 self-start"
        style={{ animation: "floatUp 4.5s ease-in-out 0.7s infinite" }}
      >
        <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <p className="text-gray-800 text-xs font-semibold">Chandigarh</p>
          <p className="text-gray-400 text-[10px]">12 tailors found nearby</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .hero-bg {
          background: linear-gradient(150deg, #0f0c29 0%, #1a1760 35%, #312e81 65%, #3730a3 100%);
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeSlideUp 0.6s ease both; }
        .anim-2 { animation: fadeSlideUp 0.6s 0.12s ease both; }
        .anim-3 { animation: fadeSlideUp 0.6s 0.24s ease both; }
        .anim-4 { animation: fadeSlideUp 0.6s 0.36s ease both; }
        .anim-5 { animation: fadeSlideUp 0.6s 0.48s ease both; }

        .btn-primary {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          box-shadow: 0 8px 32px rgba(251,191,36,0.35), 0 2px 8px rgba(251,191,36,0.2);
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 40px rgba(251,191,36,0.45), 0 4px 12px rgba(251,191,36,0.25);
        }
        .btn-primary:active { transform: translateY(0) scale(0.99); }

        .btn-secondary {
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.14);
          transform: translateY(-2px);
        }

        .stat-item { border-right: 1px solid rgba(255,255,255,0.1); }
        .stat-item:last-child { border-right: none; }

        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.10); }

        .hero-grid-dots {
          background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero-bg relative overflow-hidden">

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-60" />

        {/* Dot grid */}
        <div className="absolute inset-0 hero-grid-dots pointer-events-none" />

        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 20%, rgba(99,102,241,0.25) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 30% 80%, rgba(79,70,229,0.18) 0%, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(67,56,202,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-0">

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[88vh]">

            {/* ── LEFT: Copy ── */}
            <div className="flex flex-col justify-center py-16 lg:py-0">

              {/* Trust pill */}
              <div className="anim-1 inline-flex items-center gap-2 w-fit mb-8 px-4 py-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-white/80 text-sm font-medium tracking-tight">500+ Verified Tailors Across India</span>
              </div>

              {/* Headline */}
              <h1 className="anim-2 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
                <span className="block text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] leading-[1.06] text-white tracking-tight">
                  Find Skilled Tailors
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] leading-[1.06] italic text-amber-300 tracking-tight">
                  Near You, Instantly
                </span>
              </h1>

              {/* Subtext */}
              <p className="anim-3 text-indigo-200/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg font-light">
                Discover trusted local tailors, read genuine reviews, and connect&nbsp;directly —
                <span className="text-white font-medium"> no booking fees, ever.</span>
              </p>

              {/* CTA buttons */}
              <div className="anim-4 flex flex-col sm:flex-row gap-3 mb-12">
                <Link
                  to="/find-tailor"
                  className="btn-primary group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-gray-900 font-bold rounded-2xl text-[15px]"
                >
                  Find Tailors Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/signup"
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl text-[15px]"
                >
                  <span>✂</span> Join as Tailor
                </Link>
              </div>

              {/* Stats row */}
              <div className="anim-5 flex divide-x divide-white/10">
                {[
                  { num: "500+", label: "Verified Tailors", icon: "✂️" },
                  { num: "8", label: "Cities", icon: "📍" },
                  { num: "2,000+", label: "Happy Customers", icon: "❤️" },
                  { num: "4.8★", label: "Avg Rating", icon: "⭐" },
                ].map(({ num, label }) => (
                  <div key={label} className="flex-1 first:pl-0 pl-6 pr-6 last:pr-0">
                    <div className="text-xl sm:text-2xl font-bold text-white mb-0.5" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      {num}
                    </div>
                    <div className="text-indigo-300/70 text-[11px] sm:text-xs font-medium uppercase tracking-wider leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Card preview ── */}
            <div className="hidden lg:flex items-end justify-center relative pb-0" style={{ minHeight: "520px" }}>
              <TailorCardPreview />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="relative z-10">
          <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 72L1440 72L1440 32C1300 8 1080 0 720 0C360 0 140 8 0 32L0 72Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10">
            <p className="text-gray-300 text-sm font-medium uppercase tracking-widest">Available in</p>
            {["Ludhiana", "Chandigarh", "Delhi", "Mumbai", "Jaipur", "Amritsar", "Surat", "Pune"].map(city => (
              <span key={city} className="text-gray-400 font-semibold text-sm hover:text-indigo-500 transition-colors cursor-default">📍 {city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full mb-4">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Get stitched in
              <span className="block italic text-indigo-600 mt-1">3 simple steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center group card-hover bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:bg-indigo-700 transition-all duration-300">
                  <span className="text-3xl font-bold" style={{ fontFamily: "'DM Serif Display',serif" }}>{step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full mb-4">Why StitchFind</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Everything you need,
              <span className="block italic text-indigo-600 mt-1">nothing you don't</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="card-hover bg-white rounded-3xl p-8 border border-gray-100 shadow-sm group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center text-2xl mb-6 transition-colors duration-300">{icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full mb-4">Customer Stories</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Loved by customers
              <span className="block italic text-indigo-600 mt-1">across India</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map(({ name, city, text, rating, avatar }) => (
              <div key={name} className="card-hover bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center text-xl">{avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">📍 {city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAILOR CTA ── */}
      <section className="py-20 sm:py-28 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-dots opacity-50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Are you a Tailor?
            <span className="block italic text-amber-300 mt-2">Grow your business with us</span>
          </h2>
          <p className="text-indigo-200/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join 500+ tailors already on StitchFind. Create your free profile and get discovered by thousands of customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 text-gray-900 font-bold rounded-2xl text-base">
              Create Free Profile →
            </Link>
            <Link to="/login" className="btn-secondary inline-flex items-center justify-center px-10 py-4 text-white font-semibold rounded-2xl text-base">
              Already a member? Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            <div>
              <p className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>✂ StitchFind</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">India's most trusted platform for finding verified, skilled tailors near you.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Platform</p>
              <div className="space-y-2.5">
                {[["Find Tailors", "/find-tailor"], ["Join as Tailor", "/signup"], ["Login", "/login"]].map(([label, to]) => (
                  <div key={label}><Link to={to} className="text-gray-400 hover:text-white text-sm transition-colors">{label}</Link></div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Cities</p>
              <div className="flex flex-wrap gap-2">
                {["Ludhiana", "Chandigarh", "Delhi", "Mumbai", "Jaipur"].map(city => (
                  <span key={city} className="text-xs text-gray-400 bg-gray-800 px-2.5 py-1 rounded-lg">📍 {city}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">© 2026 StitchFind. All rights reserved.</p>
            <p className="text-gray-500 text-xs">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
