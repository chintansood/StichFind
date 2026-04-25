import { Link } from "react-router-dom";

const features = [
  { icon: "🔍", title: "Find Tailors Near You", desc: "Search by city and category to discover skilled tailors instantly." },
  { icon: "✂️", title: "Verified Professionals", desc: "Every tailor is verified with Aadhaar. Know who you're hiring." },
  { icon: "⭐", title: "Real Customer Reviews", desc: "Read honest ratings from real customers before you book." },
  { icon: "📞", title: "Direct Contact", desc: "Call your tailor directly — no middlemen, no commission." },
  { icon: "👗", title: "All Categories", desc: "Men, Women, Children — from suits to bridal wear." },
  { icon: "🏠", title: "Home or Shop", desc: "Choose tailors who work from home or have a shop." },
];

const steps = [
  { step: "01", title: "Select Your City", desc: "Pick your city to see available tailors near you." },
  { step: "02", title: "Filter by Category", desc: "Choose Men, Women, or Children to find the right specialist." },
  { step: "03", title: "View & Call", desc: "Browse profiles with ratings and call your preferred tailor." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/10 text-white/90 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 mb-6 tracking-wide">🧵 India's Tailoring Platform</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Lora',serif" }}>
            Find Skilled Tailors<br />
            <span className="text-yellow-300 italic">Near You</span>
          </h1>
          <p className="text-indigo-100 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Discover trusted local tailors, compare profiles, and connect instantly. No booking fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/find-tailor" className="px-8 py-3.5 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm sm:text-base">
              Find Tailors →
            </Link>
            <Link to="/signup" className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors text-sm sm:text-base">
              Join as Tailor
            </Link>
          </div>
          {/* Stats */}
          <div className="flex gap-8 sm:gap-12 justify-center mt-14 flex-wrap">
            {[["500+", "Tailors"], ["8", "Cities"], ["2000+", "Reviews"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300" style={{ fontFamily: "'Lora',serif" }}>{num}</div>
                <div className="text-xs text-indigo-200 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>How StitchFind Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-indigo-100 mb-3" style={{ fontFamily: "'Lora',serif" }}>{step}</div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAILOR CTA ── */}
      <section className="py-16 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-5">✂️</div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Lora',serif" }}>Are You a Tailor?</h2>
          <p className="text-indigo-100 text-base leading-relaxed mb-8 max-w-md mx-auto">
            Create your free profile, showcase your work, and get discovered by thousands of customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup" className="px-8 py-3.5 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm">
              Join as Tailor →
            </Link>
            <Link to="/login" className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors text-sm">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 py-8 px-4 text-center">
        <p className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "'Lora',serif" }}>✂ StitchFind</p>
        <p className="text-xs text-gray-400">© 2026 StitchFind. Connecting customers with skilled tailors across India.</p>
      </footer>
    </div>
  );
}