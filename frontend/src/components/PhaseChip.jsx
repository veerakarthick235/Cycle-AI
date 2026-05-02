import { PHASE_CONFIG } from "@/utils/constants";
import { Droplets, Sprout, Sun, Moon } from "lucide-react";

const iconMap = {
  droplets: Droplets,
  sprout: Sprout,
  sun: Sun,
  moon: Moon,
};

export default function PhaseChip({ phase, size = "md" }) {
  const config = PHASE_CONFIG[phase];
  if (!config) return null;

  const Icon = iconMap[config.icon];
  const sizeClasses = size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-1.5 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses} ${config.bgLight} ${config.textClass}`}
    >
      {Icon && <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />}
      {config.label}
    </span>
  );
}
