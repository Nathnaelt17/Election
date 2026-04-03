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
  FaIdCard,
} from "react-icons/fa";
import { supabase } from "./supabaseClient";

function Signup() {
  const navigate = useNavigate();
  const minimumDob = new Date();
  minimumDob.setFullYear(minimumDob.getFullYear() - 18);
  const maxDob = minimumDob.toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [fayda, setFayda] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [kefleketema, setKefleketema] = useState("");
  const [woreda, setWoreda] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState([]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!name || !fayda || !phone || !city || !kefleketema || !woreda || !dob || !password) {
      errors.push("Please fill in all fields.");
    }

    const faydaPattern = /^\d{16}$/;
    const phonePattern = /^[0-9]{10}$/;
    const woredaPattern = /^\d{2}$/;

    if (!faydaPattern.test(fayda)) {
      errors.push("Fayda must be exactly 16 digits.");
    }
    if (!phonePattern.test(phone)) {
      errors.push("Phone must be 10 digits.");
    }
    if (!woredaPattern.test(woreda)) {
      errors.push("Woreda must be exactly 2 digits.");
    }

    const birthDate = new Date(dob);
    if (dob && birthDate > minimumDob) {
      errors.push("You must be at least 18 years old.");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must include at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must include at least one number.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must include at least one special character.");
    }

    const newUser = { name, fayda, phone, city, kefleketema, woreda, dob, password };
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.fayda === fayda)) {
      errors.push("Fayda already registered.");
    }

    if (errors.length > 0) {
      setSignupErrors(errors);
      return;
    }

    setSignupErrors([]);

    const signupPayload = {
      name,
      fayda,
      email: null,
      phone,
      city,
      kefleketema,
      woreda,
      dob,
      password,
    };

    console.log("Supabase signup payload:", signupPayload);
    const { data, error } = await supabase
      .from("users")
      .insert([signupPayload])
      .select();
    console.log("Supabase signup response:", { data, error });

    if (error) {
      console.error("Supabase signup error:", error);
      setSignupErrors([`Unable to save signup data: ${error.message}`]);
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

          {/* Phone */}
          <Input icon={<FaPhoneAlt />} placeholder="Phone" value={phone} onChange={setPhone} />

          {/* Fayda */}
          <Input
            icon={<FaIdCard />}
            type="number"
            placeholder="Fayda"
            value={fayda}
            onChange={(value) => setFayda(value.replace(/\D/g, "").slice(0, 16))}
            inputMode="numeric"
            maxLength={16}
          />

          {/* DOB */}
          <Input icon={<FaCalendarAlt />} type="date" value={dob} onChange={setDob} max={maxDob} />

          {/* City */}
          <Input icon={<FaMapMarkerAlt />}type="text" placeholder="City" value={city} onChange={setCity} />

          {/* Kefleketema */}
          <Input icon={<FaMapMarkerAlt />} type="text" placeholder="Kefleketema" value={kefleketema} onChange={setKefleketema} />

          {/* Woreda */}
          <Input
            icon={<FaMapMarkerAlt />}
            type="text"
            placeholder="Woreda"
            value={woreda}
            onChange={(value) => setWoreda(value.replace(/\D/g, "").slice(0, 2))}
            inputMode="numeric"
            maxLength={2}
          />

          {/* Password */}
          <PasswordInput value={password} onChange={setPassword} />

          {/* Error */}
          {signupErrors.length > 0 && (
            <div className="md:col-span-2 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg animate-shake">
              <ul className="text-red-600 text-sm space-y-1">
                {signupErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
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

function Input({ icon, type = "text", placeholder, value, onChange, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]">{icon}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
        className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none transition"
      />
    </div>
  );
}

function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49A]" />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Password"
        className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00C49A] focus:ring-4 focus:ring-[#00C49A]/20 outline-none"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#156064]"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

export default Signup;
