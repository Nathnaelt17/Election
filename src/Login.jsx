import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loginIdentifier = username.trim();

    const foundUser = users.find(
      (user) =>
        (user.username === loginIdentifier ||
          user.email === loginIdentifier ||
          user.phone === loginIdentifier) &&
        user.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/Home");
    } else {
      setError("Invalid username/email/phone or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-4">

      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] bg-[#F8E16C] opacity-20 rounded-full -top-40 -left-40 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 animate-fadeIn">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#156064]">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
          <div className="w-16 h-1 bg-[#F8E16C] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]" />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Username / Email / Phone"
              className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#156064]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-[#00C49A] font-medium hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-lg animate-shake">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#00C49A] to-[#156064] hover:shadow-lg hover:shadow-[#00C49A]/40 transform hover:-translate-y-1 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#00C49A] font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-shake { animation: shake 0.3s ease; }
      `}</style>
    </div>
  );
}

export default Login;