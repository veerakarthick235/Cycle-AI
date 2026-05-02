import { FLOW_OPTIONS } from "@/utils/constants";

export default function FlowPicker({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {FLOW_OPTIONS.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
            value === opt.value
              ? "bg-pink-500 text-white shadow-md scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-pink-50"
          }`} aria-label={`Flow: ${opt.label}`}>
          <span className="text-base">{opt.emoji}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
