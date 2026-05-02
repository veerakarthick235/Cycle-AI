import { SYMPTOM_CATEGORIES } from "@/utils/constants";

export default function SymptomSelector({ selected = [], onChange }) {
  const toggle = (symptom) => {
    const exists = selected.find((s) => s.id === symptom.id);
    if (exists) {
      onChange(selected.filter((s) => s.id !== symptom.id));
    } else {
      onChange([...selected, { ...symptom, severity: 1 }]);
    }
  };
  const isSelected = (id) => selected.some((s) => s.id === id);
  return (
    <div className="space-y-4">
      {Object.entries(SYMPTOM_CATEGORIES).map(([key, cat]) => (
        <div key={key}>
          <h4 className="text-xs font-semibold uppercase text-gray-400 mb-2">{cat.label}</h4>
          <div className="flex flex-wrap gap-2">
            {cat.symptoms.map((sym) => (
              <button key={sym.id} onClick={() => toggle(sym)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  isSelected(sym.id)
                    ? "bg-pink-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                }`} aria-label={`Toggle ${sym.name}`}>
                <span className="mr-1">{sym.icon}</span>{sym.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
