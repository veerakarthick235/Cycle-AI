import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check, X } from "lucide-react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Lowercase", pass: /[a-z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-400", "bg-amber-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"];
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < score ? colors[score] : "bg-gray-200"}`} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <span key={c.label} className={`text-xs flex items-center gap-1 ${c.pass ? "text-emerald-600" : "text-gray-400"}`}>
            {c.pass ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email) { toast.error("Please fill all fields"); return; }
      setStep(2);
      return;
    }
    if (password.length < 8) { toast.error("Password must be 8+ characters"); return; }
    if (password !== confirmPw) { toast.error("Passwords don't match"); return; }
    const res = await register({ full_name: name, email, password });
    if (res.success) { toast.success("Account created!"); navigate("/onboarding"); }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
            style={{ background: "linear-gradient(135deg, #FF6F91, #9D4EDD)" }}>C</div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start your personalized cycle journey</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-500"
              }`}>{s}</div>
              <span className={`text-xs font-medium ${step >= s ? "text-pink-600" : "text-gray-400"}`}>
                {s === 1 ? "Info" : "Security"}
              </span>
              {s < 2 && <div className={`flex-1 h-0.5 ${step > s ? "bg-pink-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full name" className="input-field pl-10" aria-label="Full name" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" className="input-field pl-10" aria-label="Email" />
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input type={showPw ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" className="input-field pl-10 pr-10" aria-label="Password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-3.5 text-gray-400" aria-label="Toggle password">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && <PasswordStrength password={password} />}
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input type="password" value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Confirm password" className="input-field pl-10" aria-label="Confirm password" />
              </div>
            </motion.div>
          )}
          <div className="flex gap-3">
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
            )}
            <button type="submit" disabled={isLoading} className="btn-primary flex-1 gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {step === 1 ? "Continue" : isLoading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:text-pink-700 font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
