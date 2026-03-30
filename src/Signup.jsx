import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !username || !email || !phone || !address || !dob || !password) {
      setSignupError("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    const phonePattern = /^[0-9]{10}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!emailPattern.test(email)) {
      setSignupError("Use gmail.com or yahoo.com");
      return;
    }

    if (!phonePattern.test(phone)) {
      setSignupError("Phone must be 10 digits");
      return;
    }

    if (!passwordPattern.test(password)) {
      setSignupError("Weak password");
      return;
    }

    const newUser = {
      name,
      username,
      email,
      phone,
      address,
      dob,
      password,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) {
      setSignupError("Email already registered");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#156064] via-[#00C49A] to-[#156064] relative overflow-hidden px-4">

      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] bg-[#F8E16C] opacity-20 rounded-full -top-40 -left-40 blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00C49A] opacity-20 rounded-full -bottom-40 -right-40 blur-3xl"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 animate-fadeIn overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#156064]">Create Account</h1>
          <p className="text-gray-500 text-sm">Join us and start your journey</p>
          <div className="w-16 h-1 bg-[#F8E16C] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Name */}
          <Input icon={<FaUserAlt />} placeholder="Full Name" value={name} onChange={setName} />

          {/* Username */}
          <Input icon={<FaUserAlt />} placeholder="Username" value={username} onChange={setUsername} />

          {/* Email */}
          <Input icon={<FaEnvelope />} type="email" placeholder="Email" value={email} onChange={setEmail} />

          {/* Phone */}
          <Input icon={<FaPhoneAlt />} placeholder="Phone" value={phone} onChange={setPhone} />

          {/* Address */}
          <div className="md:col-span-2">
            <Input icon={<FaMapMarkerAlt />} placeholder="Address" value={address} onChange={setAddress} />
          </div>

          {/* DOB */}
          <Input icon={<FaCalendarAlt />} type="date" value={dob} onChange={setDob} />

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#156064]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error */}
          {signupError && (
            <div className="md:col-span-2 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg animate-shake">
              <p className="text-red-600 text-sm">{signupError}</p>
            </div>
          )}

          {/* Button */}
          <div className="md:col-span-2">
            <button className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#00C49A] to-[#156064] hover:shadow-lg hover:shadow-[#00C49A]/40 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Sign Up <FaArrowRight size={14} />
            </button>
          </div>

          {/* Footer */}
          <div className="md:col-span-2 text-center mt-2">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00C49A] font-semibold">Sign In</Link>
            </p>
          </div>
        </form>
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

/* Reusable Input Component */
function Input({ icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none transition"
      />
    </div>
  );
}

export default Signup;