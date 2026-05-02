import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  trend: TrendingUp,
};

const colorMap = {
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-500", text: "text-blue-800" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500", text: "text-amber-800" },
  success: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-500", text: "text-emerald-800" },
  trend: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-500", text: "text-purple-800" },
};

export default function InsightCard({ type = "info", title, body, index = 0 }) {
  const Icon = iconMap[type] || Info;
  const colors = colorMap[type] || colorMap.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`${colors.bg} ${colors.border} border rounded-lg p-4 flex gap-3`}
    >
      <div className={`flex-shrink-0 mt-0.5 ${colors.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className={`font-semibold text-sm ${colors.text}`}>{title}</h4>
        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}
