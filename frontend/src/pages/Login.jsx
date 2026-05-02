import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    const res = await login(email, password);
    if (res.success) { toast.success("Welcome back!"); navigate("/dashboard"); }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
            style={{ background: "linear-gradient(135deg, #FF6F91, #9D4EDD)" }}>C</div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your CycleAI account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" className="input-field pl-10" aria-label="Email" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input type={showPw ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" className="input-field pl-10 pr-10" aria-label="Password" />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600" aria-label="Toggle password">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full gap-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-600 hover:text-pink-700 font-semibold">Sign Up</Link>
        </div>
      </motion.div>
    </div>
  );
}
