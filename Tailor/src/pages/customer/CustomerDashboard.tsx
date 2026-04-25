import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ name: string; profilePic: string } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const email = localStorage.getItem("email") || "";

  useEffect(() => {
    if (!email) { setLoadingProfile(false); return; }
    api.post("/customer/find", { email })
      .then(res => { if (res.data.status) setProfile({ name: res.data.doc.name, profilePic: res.data.doc.profilePic }); })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, [email]);

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  const quickActions = [
    { icon: "🔍", title: "Find Tailor", desc: "Search by city & category", to: "/find-tailor", bg: "bg-blue-50", iconBg: "bg-blue-100 text-blue-600" },
    { icon: "⭐", title: "Write a Review", desc: "Share your experience", to: "/tailor/review", bg: "bg-amber-50", iconBg: "bg-amber-100 text-amber-600" },
    { icon: "👤", title: "My Profile", desc: "Update your details", to: "/customer/profile", bg: "bg-indigo-50", iconBg: "bg-indigo-100 text-indigo-600" },
    { icon: "🏠", title: "Browse All", desc: "Explore all tailors", to: "/find-tailor", bg: "bg-green-50", iconBg: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 px-4 sm:px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Greeting */}
            <div>
              <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 mb-4">👋 Welcome back</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Lora',serif" }}>
                {profile?.name
                  ? <>Hello, <span className="text-yellow-300 italic">{profile.name}</span></>
                  : <>Your <span className="text-yellow-300 italic">Dashboard</span></>}
              </h1>
              <p className="text-indigo-100 text-sm mt-2 max-w-xs leading-relaxed">
                Find skilled tailors, write reviews, and manage your tailoring journey.
              </p>
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="mt-4 text-xs font-semibold px-4 py-1.5 rounded-lg bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Profile card */}
            {loadingProfile ? (
              <div className="w-52 h-20 rounded-2xl bg-white/10 border border-white/20 animate-pulse" />
            ) : profile ? (
              <Link to="/customer/profile" className="block no-underline">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-colors min-w-[200px]">
                  <div className="w-12 h-12 rounded-full border-2 border-yellow-300/60 overflow-hidden flex-shrink-0">
                    {profile.profilePic && profile.profilePic !== "nopic.jpg"
                      ? <img src={profile.profilePic} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-white/10 flex items-center justify-center text-xl">👤</div>}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{profile.name}</p>
                    <p className="text-indigo-200 text-xs">Customer Account</p>
                    <span className="text-xs font-medium text-green-300 mt-0.5 block">● Complete</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/customer/profile" className="block no-underline">
                <div className="bg-white/10 border-2 border-dashed border-white/25 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors min-w-[180px]">
                  <div className="text-3xl mb-2 opacity-50">👤</div>
                  <p className="text-white/70 text-sm font-semibold mb-1">No Profile Yet</p>
                  <span className="text-xs font-bold px-3 py-1 bg-yellow-400 text-gray-900 rounded-lg">+ Add Profile</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Quick Actions</p>
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(({ icon, title, desc, to, bg, iconBg }) => (
              <Link key={title} to={to} className="no-underline">
                <div className={`${bg} rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all flex gap-4 items-start cursor-pointer`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${iconBg}`}>{icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Get Started</p>
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora',serif" }}>Three Simple Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Complete Your Profile", desc: "Add your name, city, and photo so tailors can recognize you." },
              { step: "02", title: "Find & Call a Tailor", desc: "Filter by city and category, then call your preferred tailor directly." },
              { step: "03", title: "Leave a Review", desc: "Help others by sharing your honest experience after each visit." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-indigo-100 mb-3" style={{ fontFamily: "'Lora',serif" }}>{step}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2" style={{ fontFamily: "'Lora',serif" }}>{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center bg-indigo-600">
        <div className="text-4xl mb-4">✂️</div>
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Lora',serif" }}>Ready to Find Your Tailor?</h2>
        <p className="text-indigo-100 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
          Browse verified professionals in your city and get the perfect fit every time.
        </p>
        <Link to="/find-tailor" className="inline-block px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm">
          Browse Tailors →
        </Link>
      </section>
    </div>
  );
}