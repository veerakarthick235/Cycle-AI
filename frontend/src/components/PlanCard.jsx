import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export default function PlanCard({ tier, name, price, period, features, limitations, highlighted, badge, cta, onSelect }) {
  return (
    <motion.div whileHover={{ y: -4 }}
      className={`relative rounded-lg p-6 flex flex-col ${
        highlighted ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-hover" : "glass-card"
      }`}>
      {badge && (
        <span className="absolute -top-3 right-4 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
          {badge}
        </span>
      )}
      {highlighted && (
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span className="text-xs font-medium text-pink-100">Most Popular</span>
        </div>
      )}
      <h3 className={`font-display text-xl font-bold ${highlighted ? "text-white" : "text-gray-900"}`}>{name}</h3>
      <div className="mt-3 mb-5">
        <span className={`text-4xl font-bold font-mono ${highlighted ? "text-white" : "text-gray-900"}`}>{price}</span>
        <span className={`text-sm ${highlighted ? "text-pink-100" : "text-gray-500"}`}>{period}</span>
      </div>
      <ul className="space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlighted ? "text-pink-200" : "text-emerald-500"}`} />
            <span className={highlighted ? "text-pink-50" : "text-gray-600"}>{f}</span>
          </li>
        ))}
        {limitations?.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm opacity-50">
            <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center">✕</span>
            <span className={highlighted ? "text-pink-100" : "text-gray-400"}>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => onSelect?.(tier)}
        className={`mt-6 w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
          highlighted
            ? "bg-white text-pink-600 hover:bg-pink-50 shadow-lg"
            : "btn-primary"
        }`} aria-label={`Select ${name} plan`}>
        {cta}
      </button>
    </motion.div>
  );
}
