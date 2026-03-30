import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("registeredUser");
    const storedUser = savedUser ? JSON.parse(savedUser) : null;

    const loginIdentifier = username.trim();

    const isRegisteredUser =
      storedUser &&
      storedUser.password === password &&
      (storedUser.username === loginIdentifier ||
        storedUser.email === loginIdentifier ||
        storedUser.phone === loginIdentifier);

    if (isRegisteredUser) {
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(storedUser));
      } else {
        sessionStorage.setItem("user", JSON.stringify(storedUser));
      }
      navigate("/home");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden">

      {/* Decorative Blobs */}
      <div className="absolute w-96 h-96 bg-[#F8E16C] opacity-20 rounded-full -top-32 -left-32 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 animate-fadeIn">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#156064] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to continue
          </p>
          <div className="w-20 h-1 bg-[#F8E16C] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Username */}
          <div>
            <label className="text-sm font-semibold text-[#156064]">
              Username / Email / Phone
            </label>
            <div className="relative mt-2">
              <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                required
                placeholder="Enter your username, email, or phone"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-[#156064]">
              Password
            </label>
            <div className="relative mt-2">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#156064] hover:text-[#00C49A]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-[#156064]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember me
            </label>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-[#00C49A] hover:text-[#156064] font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-lg animate-shake">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#00C49A] to-[#156064] hover:shadow-lg hover:shadow-[#00C49A]/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t pt-5">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#00C49A] font-semibold hover:text-[#156064]">
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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Login;