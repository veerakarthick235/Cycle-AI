import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Target, Bell, ArrowRight, ArrowLeft, Check } from "lucide-react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const stepMeta = [
  { icon: User, title: "About You", subtitle: "Basic info" },
  { icon: Calendar, title: "Cycle History", subtitle: "Your patterns" },
  { icon: Target, title: "Your Goals", subtitle: "What matters" },
  { icon: Bell, title: "Notifications", subtitle: "Stay informed" },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", dob: "", timezone: "Asia/Kolkata", avgCycle: 28, lastPeriod: "", goals: [], notifications: true });
  const { completeOnboarding } = useAuthStore();
  const navigate = useNavigate();

  const goalOptions = [
    { id: "tracking", label: "🩸 Period Tracking", desc: "Know when your period is coming" },
    { id: "conception", label: "🤰 Trying to Conceive", desc: "Track fertility windows" },
    { id: "health", label: "💪 Health Awareness", desc: "Understand your body better" },
    { id: "pcos", label: "🎗️ PCOS Management", desc: "Monitor irregular cycles" },
  ];

  const toggleGoal = (id) => {
    setData((d) => ({ ...d, goals: d.goals.includes(id) ? d.goals.filter((g) => g !== id) : [...d.goals, id] }));
  };

  const handleFinish = () => {
    completeOnboarding({ avg_cycle_length: data.avgCycle, date_of_birth: data.dob, full_name: data.name });
    toast.success("You're all set! 🎉");
    navigate("/dashboard");
  };

  const canNext = () => {
    if (step === 0) return data.name && data.dob;
    if (step === 1) return data.avgCycle && data.lastPeriod;
    if (step === 2) return data.goals.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 pt-20 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass-card p-8">
        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {stepMeta.map((s, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-pink-500" : "bg-gray-200"}`} />
              <p className={`text-xs mt-1.5 font-medium ${i <= step ? "text-pink-600" : "text-gray-400"}`}>{s.subtitle}</p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-gray-900">Let's get to know you</h2>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                  <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Your name" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Date of Birth</label>
                  <input type="date" value={data.dob} onChange={(e) => setData({ ...data, dob: e.target.value })}
                    className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Timezone</label>
                  <select value={data.timezone} onChange={(e) => setData({ ...data, timezone: e.target.value })}
                    className="input-field">
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-gray-900">Your Cycle History</h2>
                <p className="text-sm text-gray-500">This helps our AI make better predictions right away.</p>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Average Cycle Length (days)</label>
                  <input type="number" min={18} max={45} value={data.avgCycle}
                    onChange={(e) => setData({ ...data, avgCycle: +e.target.value })}
                    className="input-field font-mono" />
                  <p className="text-xs text-gray-400 mt-1">Normal range: 21–35 days</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Last Period Start Date</label>
                  <input type="date" value={data.lastPeriod}
                    onChange={(e) => setData({ ...data, lastPeriod: e.target.value })}
                    className="input-field" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-gray-900">What are your goals?</h2>
                <p className="text-sm text-gray-500">Select all that apply. This personalizes your experience.</p>
                <div className="space-y-3">
                  {goalOptions.map((g) => (
                    <button key={g.id} onClick={() => toggleGoal(g.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                        data.goals.includes(g.id) ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-200"
                      }`}>
                      <span className="text-2xl">{g.label.split(" ")[0]}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{g.label.split(" ").slice(1).join(" ")}</p>
                        <p className="text-xs text-gray-500">{g.desc}</p>
                      </div>
                      {data.goals.includes(g.id) && <Check className="w-5 h-5 text-pink-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-gray-900">Stay Informed</h2>
                <div className="glass-card p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Period Reminders</p>
                    <p className="text-xs text-gray-500">Get notified 2 days before predicted period</p>
                  </div>
                  <button onClick={() => setData({ ...data, notifications: !data.notifications })}
                    className={`w-12 h-7 rounded-full transition-colors relative ${data.notifications ? "bg-pink-500" : "bg-gray-300"}`}
                    aria-label="Toggle notifications">
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-transform ${
                      data.notifications ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                </div>
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-display text-xl font-bold text-gray-900">You're all set!</h3>
                  <p className="text-sm text-gray-500 mt-2">Let's start tracking your cycle.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="btn-secondary flex-1 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canNext()}
              className="btn-primary flex-1 gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleFinish} className="btn-primary flex-1 gap-2">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
