import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

interface FormData { emailid: string; pwd: string; }
interface Errors { emailid?: string; pwd?: string; }

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ emailid: "", pwd: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    let e: Errors = {};
    if (!formData.emailid.trim()) e.emailid = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.emailid)) e.emailid = "Invalid email format";
    if (!formData.pwd) e.pwd = "Password is required";
    else if (formData.pwd.length < 6) e.pwd = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/user/login", formData);
      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", res.data.user.userType);
        navigate(res.data.user.userType === "customer" ? "/customer/CustomerDashboard" : "/tailor/TailorDashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      <div className="flex flex-1 flex-col lg:flex-row">

        {/* Left branding panel — hidden on mobile */}
        <div className="hidden lg:flex lg:w-5/12 bg-indigo-600 flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10 text-center max-w-xs">
            <div className="text-6xl mb-6 opacity-80">✂️</div>
            <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Lora',serif" }}>StitchFind</h1>
            <p className="text-indigo-100 text-base leading-relaxed">Connect with skilled tailors and bring your fashion ideas to life.</p>
            <div className="mt-8 flex gap-2 justify-center flex-wrap">
              {["✂ Tailors", "📍 Local", "⭐ Rated", "🧵 Verified"].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-600" style={{ fontFamily: "'Lora',serif" }}>✂ StitchFind</h1>
              <p className="text-gray-500 text-sm mt-1">Your tailoring platform</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-9">
              <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Lora',serif" }}>Welcome back</h2>
              <p className="text-gray-500 text-sm mb-7">Sign in to your StitchFind account</p>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email Address</label>
                  <input
                    name="emailid" type="email" value={formData.emailid}
                    onChange={handleChange} placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.emailid ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                  />
                  {errors.emailid && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠ {errors.emailid}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Password</label>
                  <input
                    name="pwd" type="password" value={formData.pwd}
                    onChange={handleChange} placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.pwd ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                  />
                  {errors.pwd && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠ {errors.pwd}</p>}
                </div>

                {/* Submit */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Signing in...
                    </>
                  ) : "Sign In →"}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <Link to="/" className="text-indigo-600 font-semibold hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;