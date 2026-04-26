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

// ── Tailor Scene SVG Illustration ──
const TailorIllustration = () => (
  <svg viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(-6px)} 50%{transform:translateY(6px)} }
        @keyframes floatC { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(8px)} }
        @keyframes spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes dash   { to{stroke-dashoffset:-40} }
        .fa { animation: floatA 5s ease-in-out infinite; transform-origin: center; }
        .fb { animation: floatB 6s ease-in-out infinite; transform-origin: center; }
        .fc { animation: floatC 4s ease-in-out 0.5s infinite; transform-origin: center; }
        .fd { animation: floatA 7s ease-in-out 1s infinite; transform-origin: center; }
        .thread-anim { animation: dash 2s linear infinite; }
      `}</style>
    </defs>

    {/* ── Background circles (depth) ── */}
    <circle cx="260" cy="240" r="210" fill="rgba(255,255,255,0.04)" />
    <circle cx="260" cy="240" r="160" fill="rgba(255,255,255,0.04)" />
    <circle cx="260" cy="240" r="110" fill="rgba(255,255,255,0.06)" />

    {/* ── MANNEQUIN (center piece) ── */}
    <g className="fa">
      {/* Body */}
      <ellipse cx="260" cy="310" rx="48" ry="70" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      {/* Neck */}
      <rect x="251" y="238" width="18" height="20" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      {/* Head */}
      <circle cx="260" cy="225" r="18" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      {/* Stand pole */}
      <rect x="257" y="378" width="6" height="48" rx="3" fill="rgba(255,255,255,0.3)"/>
      {/* Base */}
      <ellipse cx="260" cy="428" rx="28" ry="7" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* Shirt lines on mannequin */}
      <path d="M230 280 Q260 270 290 280" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      <path d="M225 300 Q260 290 295 300" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      <path d="M227 320 Q260 310 293 320" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      {/* Shoulder seam marks */}
      <line x1="214" y1="268" x2="230" y2="272" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="306" y1="268" x2="290" y2="272" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    </g>

    {/* ── SCISSORS (top left) ── */}
    <g className="fb" style={{ transformOrigin: "110px 120px" }}>
      {/* Handle 1 */}
      <ellipse cx="95" cy="108" rx="14" ry="9" fill="rgba(255,215,0,0.25)" stroke="rgba(255,215,0,0.8)" strokeWidth="1.5" transform="rotate(-35 95 108)"/>
      {/* Handle 2 */}
      <ellipse cx="125" cy="135" rx="14" ry="9" fill="rgba(255,215,0,0.25)" stroke="rgba(255,215,0,0.8)" strokeWidth="1.5" transform="rotate(-35 125 135)"/>
      {/* Pivot */}
      <circle cx="110" cy="122" r="4" fill="rgba(255,215,0,0.9)" stroke="rgba(255,215,0,1)" strokeWidth="1"/>
      {/* Blade 1 */}
      <path d="M110 122 L158 80" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
      {/* Blade 2 */}
      <path d="M110 122 L162 98" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
      {/* Blade tips sparkle */}
      <circle cx="158" cy="80" r="2.5" fill="rgba(255,255,255,0.9)"/>
      <circle cx="162" cy="98" r="2.5" fill="rgba(255,255,255,0.9)"/>
    </g>

    {/* ── MEASURING TAPE (bottom left) ── */}
    <g className="fc" style={{ transformOrigin: "100px 380px" }}>
      <rect x="72" y="362" width="56" height="22" rx="11" fill="rgba(255,215,0,0.2)" stroke="rgba(255,215,0,0.7)" strokeWidth="1.5"/>
      {/* Tape strip */}
      <path d="M128 373 Q180 340 230 360 Q270 375 300 355" stroke="rgba(255,215,0,0.8)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Tick marks on tape */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i}
          x1={135 + i * 24} y1={370 - i * 2.5}
          x2={135 + i * 24} y2={363 - i * 2.5}
          stroke="rgba(255,215,0,0.6)" strokeWidth="1"/>
      ))}
      <text x="88" y="378" fontSize="9" fill="rgba(255,215,0,0.9)" textAnchor="middle" fontFamily="monospace">cm</text>
    </g>

    {/* ── NEEDLE & THREAD (top right) ── */}
    <g className="fd" style={{ transformOrigin: "400px 130px" }}>
      {/* Needle */}
      <rect x="386" y="88" width="5" height="62" rx="2.5" fill="rgba(255,255,255,0.85)" transform="rotate(20 386 88)"/>
      {/* Eye of needle */}
      <ellipse cx="392" cy="93" rx="3" ry="5" fill="none" stroke="rgba(100,149,237,0.9)" strokeWidth="1.5" transform="rotate(20 392 93)"/>
      {/* Thread */}
      <path
        d="M392 93 Q420 110 410 145 Q400 175 430 190 Q455 205 440 235 Q425 260 450 275"
        stroke="rgba(99,102,241,0.85)" strokeWidth="2" fill="none"
        strokeDasharray="6,4" strokeLinecap="round"
        className="thread-anim"
        style={{ strokeDashoffset: 0 }}
      />
      {/* Thread spool */}
      <ellipse cx="456" cy="278" rx="14" ry="10" fill="rgba(99,102,241,0.3)" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5"/>
      <ellipse cx="456" cy="278" rx="8" ry="6" fill="rgba(99,102,241,0.5)" stroke="rgba(99,102,241,0.8)" strokeWidth="1"/>
      <line x1="442" y1="278" x2="470" y2="278" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5"/>
    </g>

    {/* ── FABRIC SWATCHES (bottom right) ── */}
    <g className="fb" style={{ transformOrigin: "410px 370px" }}>
      {/* Swatch 1 — deep indigo */}
      <rect x="370" y="345" width="55" height="65" rx="6" fill="rgba(79,70,229,0.5)" stroke="rgba(99,102,241,0.8)" strokeWidth="1.5"/>
      {/* Plaid lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="370" y1={355 + i*14} x2="425" y2={355 + i*14} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      ))}
      {[0,1,2,3].map(i => (
        <line key={i} x1={380 + i*14} y1="345" x2={380 + i*14} y2="410" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      ))}

      {/* Swatch 2 — gold */}
      <rect x="405" y="358" width="55" height="65" rx="6" fill="rgba(202,138,4,0.4)" stroke="rgba(255,215,0,0.7)" strokeWidth="1.5"/>
      {/* Diagonal pattern */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={405 + i*14} y1="358" x2="405" y2={358 + i*14} stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      ))}

      {/* Swatch 3 — white */}
      <rect x="390" y="375" width="55" height="55" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>

      {/* Fold corner on top swatch */}
      <path d="M415 345 L425 345 L415 358 Z" fill="rgba(255,255,255,0.3)"/>
    </g>

    {/* ── FLOATING UI CARD — Tailor profile ── */}
    <g className="fa" style={{ transformOrigin: "80px 240px" }}>
      <rect x="18" y="210" width="148" height="78" rx="14" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* Avatar */}
      <circle cx="44" cy="240" r="14" fill="#e0e7ff"/>
      <text x="44" y="245" fontSize="14" textAnchor="middle" fill="#4f46e5">✂</text>
      {/* Name */}
      <text x="64" y="233" fontSize="11" fontWeight="600" fill="#1e1b4b" fontFamily="Inter,sans-serif">Rajan Tailor</text>
      <text x="64" y="246" fontSize="9" fill="#6b7280" fontFamily="Inter,sans-serif">📍 Ludhiana, Punjab</text>
      {/* Stars */}
      <text x="64" y="259" fontSize="10" fill="#f59e0b" fontFamily="Inter,sans-serif">★★★★★</text>
      <text x="110" y="259" fontSize="9" fill="#9ca3af" fontFamily="Inter,sans-serif">5.0</text>
      {/* Badges */}
      <rect x="20" y="268" width="30" height="13" rx="6" fill="#e0e7ff"/>
      <text x="35" y="278" fontSize="8" textAnchor="middle" fill="#4f46e5" fontFamily="Inter,sans-serif">Men</text>
      <rect x="54" y="268" width="36" height="13" rx="6" fill="#fef3c7"/>
      <text x="72" y="278" fontSize="8" textAnchor="middle" fill="#92400e" fontFamily="Inter,sans-serif">Bridal</text>
      <rect x="94" y="268" width="34" height="13" rx="6" fill="#d1fae5"/>
      <text x="111" y="278" fontSize="8" textAnchor="middle" fill="#065f46" fontFamily="Inter,sans-serif">Suits</text>
    </g>

    {/* ── FLOATING UI CARD — Verified badge ── */}
    <g className="fc" style={{ transformOrigin: "390px 195px" }}>
      <rect x="340" y="168" width="110" height="54" rx="14" fill="rgba(34,197,94,0.9)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <text x="395" y="193" fontSize="20" textAnchor="middle" fill="white">✓</text>
      <text x="395" y="210" fontSize="10" fontWeight="600" textAnchor="middle" fill="white" fontFamily="Inter,sans-serif">Aadhaar Verified</text>
    </g>

    {/* ── FLOATING UI CARD — New booking ── */}
    <g className="fb" style={{ transformOrigin: "400px 70px" }}>
      <rect x="330" y="42" width="148" height="56" rx="14" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <circle cx="352" cy="64" r="8" fill="#ede9fe"/>
      <text x="352" y="68" fontSize="10" textAnchor="middle" fill="#7c3aed">★</text>
      <text x="368" y="60" fontSize="10" fontWeight="600" fill="#1e1b4b" fontFamily="Inter,sans-serif">New Review!</text>
      <text x="368" y="72" fontSize="9" fill="#6b7280" fontFamily="Inter,sans-serif">Priya rated 5 stars</text>
      <text x="368" y="88" fontSize="8" fill="#10b981" fontFamily="Inter,sans-serif">● Just now</text>
    </g>

    {/* ── PINS / stitch dots decorative ── */}
    {[[155, 165], [175, 155], [195, 162], [215, 158]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="2.5" fill="rgba(255,215,0,0.8)"/>
        <line x1={x} y1={y} x2={x - 2} y2={y + 10} stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      </g>
    ))}

    {/* ── Floating sparkles ── */}
    {[[350, 140, 0], [130, 320, 1], [290, 150, 0.5], [170, 390, 1.5]].map(([x, y, d], i) => (
      <g key={i} style={{ animation: `floatA ${3 + i * 0.7}s ease-in-out ${d}s infinite`, transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.4)"/>
      </g>
    ))}
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,500&family=Inter:wght@300;400;500;600;700&display=swap');
        .hero-gradient { background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 40%, #4f46e5 70%, #6366f1 100%); }
        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after { content:''; position:absolute; top:-50%; left:-60%; width:40%; height:200%; background:rgba(255,255,255,0.15); transform:skewX(-20deg); transition:left 0.5s; }
        .btn-shine:hover::after { left:120%; }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full" style={{ background: "rgba(139,92,246,0.2)", filter: "blur(80px)" }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full" style={{ background: "rgba(59,130,246,0.15)", filter: "blur(80px)" }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[85vh]">

            {/* Left — text */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 w-fit">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">500+ Verified Tailors Across India</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Lora',serif" }}>
                Find Your
                <span className="block italic text-yellow-300 drop-shadow-lg">Perfect Tailor</span>
                <span className="block text-3xl sm:text-4xl font-normal text-white/60 mt-3">Near You, Instantly</span>
              </h1>

              <p className="text-lg text-indigo-100 leading-relaxed mb-10 max-w-md">
                Discover trusted local tailors, compare profiles and ratings, and connect instantly — no booking fees, ever.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/find-tailor"
                  className="btn-shine group inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-2xl text-base transition-all shadow-2xl shadow-yellow-400/40">
                  Find Tailors Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl text-base border border-white/25 transition-all">
                  Join as Tailor ✂
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
                {[["500+", "Verified Tailors"], ["8", "Cities"], ["2000+", "Happy Customers"], ["4.8★", "Avg Rating"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-yellow-300" style={{ fontFamily: "'Lora',serif" }}>{num}</div>
                    <div className="text-xs text-indigo-300 mt-0.5 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — custom illustration */}
            <div className="hidden lg:flex items-center justify-center relative h-[520px]">
              {/* Soft glow behind illustration */}
              <div className="absolute inset-0 rounded-full scale-75" style={{ background: "rgba(99,102,241,0.2)", filter: "blur(60px)" }} />
              <div className="relative w-full h-full">
                <TailorIllustration />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white" />
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>
              Get stitched in
              <span className="block italic text-indigo-600 mt-1">3 simple steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center group card-hover bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:bg-indigo-700 transition-all duration-300">
                  <span className="text-3xl font-bold" style={{ fontFamily: "'Lora',serif" }}>{step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>
              Everything you need,
              <span className="block italic text-indigo-600 mt-1">nothing you don't</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="card-hover bg-white rounded-3xl p-8 border border-gray-100 shadow-sm group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center text-2xl mb-6 transition-colors duration-300">{icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>
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
      <section className="py-20 sm:py-28 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Lora',serif" }}>
            Are you a Tailor?
            <span className="block italic text-yellow-300 mt-2">Grow your business with us</span>
          </h2>
          <p className="text-indigo-100 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join 500+ tailors already on StitchFind. Create your free profile and get discovered by thousands of customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-shine inline-flex items-center justify-center gap-2 px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-2xl text-base transition-all shadow-2xl shadow-yellow-400/30">
              Create Free Profile →
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/25 transition-all">
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
              <p className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Lora',serif" }}>✂ StitchFind</p>
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