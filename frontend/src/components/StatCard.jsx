import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, trend, suffix = "" }) {
  const trendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor = trend > 0 ? "text-emerald-500" : trend < 0 ? "text-red-400" : "text-gray-400";
  const TrendIcon = trendIcon;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 40px rgba(255,111,145,0.15)" }}
      className="glass-card p-4 flex items-start gap-3 transition-shadow"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
        {Icon && <Icon className="w-5 h-5 text-pink-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-xl font-bold text-gray-900 font-mono">{value}</span>
          {suffix && <span className="text-xs text-gray-500">{suffix}</span>}
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span>{Math.abs(trend)}</span>
        </div>
      )}
    </motion.div>
  );
}
