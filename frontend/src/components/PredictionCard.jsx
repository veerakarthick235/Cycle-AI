import { motion } from "framer-motion";
import { Calendar, Shield } from "lucide-react";

export default function PredictionCard({ nextDate, confidence, lower, upper }) {
  const confidencePct = Math.round((confidence || 0) * 100);
  return (
    <motion.div whileHover={{ y: -2 }} className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-gray-900">Next Period</h3>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          <Shield className="w-3 h-3" />{confidencePct}% confidence
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p className="text-2xl font-bold font-mono text-gray-900">{nextDate || "—"}</p>
          <p className="text-xs text-gray-500">Window: {lower || "—"} – {upper || "—"}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Prediction Confidence</span>
          <span className="font-mono font-medium">{confidencePct}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${confidencePct}%` }}
            transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #FF6F91, #9D4EDD)" }} />
        </div>
      </div>
    </motion.div>
  );
}
