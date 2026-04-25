import { Link } from "react-router-dom";

const quickActions = [
  { icon: "📋", title: "New Orders", desc: "Manage incoming orders", to: "/tailor/TailorDashboard/orders", color: "bg-blue-50 text-blue-600" },
  { icon: "⭐", title: "Customer Reviews", desc: "View & respond to reviews", to: "/tailor/TailorDashboard/reviews", color: "bg-amber-50 text-amber-600" },
  { icon: "💰", title: "Earnings", desc: "Track your monthly earnings", to: "/tailor/TailorDashboard/earnings", color: "bg-green-50 text-green-600" },
  { icon: "👤", title: "My Profile", desc: "Update shop details", to: "/tailor/TailorDashboard/profile", color: "bg-indigo-50 text-indigo-600" },
];

const stats = [
  { num: "24", label: "Total Orders", icon: "📋" },
  { num: "4.9", label: "Avg Rating", icon: "⭐" },
  { num: "₹28,500", label: "This Month", icon: "💰" },
];

export default function TailorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 px-4 sm:px-6 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 mb-5">✂ Welcome Back</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Lora',serif" }}>
            Tailor <span className="italic text-yellow-300">Dashboard</span>
          </h1>
          <p className="text-indigo-100 text-base max-w-md mx-auto mb-10">
            Manage orders, respond to customers, track earnings, and grow your business.
          </p>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            {stats.map(({ num, label, icon }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300" style={{ fontFamily: "'Lora',serif" }}>{num}</div>
                <div className="text-xs text-indigo-200 uppercase tracking-widest mt-1">{icon} {label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Quick Actions</h2>
            <p className="text-gray-500 text-sm mt-1">Everything you need, one click away</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActions.map(({ icon, title, desc, to, color }) => (
              <Link key={title} to={to}
                className="flex flex-col items-start gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color} bg-opacity-20`}>{icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-12 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-4xl mb-4">⭐</div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Lora',serif" }}>Upgrade to Premium</h2>
          <p className="text-indigo-100 text-sm leading-relaxed mb-7">
            Get priority customer matching, advanced analytics, and exclusive promotions.
          </p>
          <Link to="/tailor/TailorDashboard/profile"
            className="inline-block px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm">
            Upgrade Now — ₹199/month
          </Link>
        </div>
      </section>
    </div>
  );
}