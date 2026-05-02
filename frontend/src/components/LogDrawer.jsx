import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import FlowPicker from "./FlowPicker";
import SymptomSelector from "./SymptomSelector";
import useCycleStore from "@/store/cycleStore";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/dates";

export default function LogDrawer({ date, isOpen, onClose }) {
  const { getLogByDate, upsertLog } = useCycleStore();
  const existing = getLogByDate(date);
  const [flow, setFlow] = useState(existing?.flow || "none");
  const [mood, setMood] = useState(existing?.mood_score || 5);
  const [energy, setEnergy] = useState(existing?.energy_level || 5);
  const [pain, setPain] = useState(existing?.pain_level || 1);
  const [sleep, setSleep] = useState(existing?.sleep_hours || 7.5);
  const [symptoms, setSymptoms] = useState(existing?.symptoms || []);
  const [notes, setNotes] = useState(existing?.notes || "");

  const handleSave = () => {
    upsertLog(date, {
      flow, mood_score: mood, energy_level: energy,
      pain_level: pain, sleep_hours: sleep, symptoms, notes,
    });
    toast.success("Log saved!");
    onClose();
  };

  const SliderField = ({ label, value, onChange, min = 1, max = 10, emoji }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-mono font-medium text-gray-900">{emoji} {value}</span>
      </div>
      <input type="range" min={min} max={max} step={label === "Sleep" ? 0.5 : 1}
        value={value} onChange={(e) => onChange(+e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-pink-500" />
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 px-5 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">
                Log for {formatDate(date, "EEEE, MMM d")}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Flow</label>
                <FlowPicker value={flow} onChange={setFlow} />
              </div>
              <SliderField label="Mood" value={mood} onChange={setMood} emoji="😊" />
              <SliderField label="Energy" value={energy} onChange={setEnergy} emoji="⚡" />
              <SliderField label="Pain" value={pain} onChange={setPain} emoji="💢" />
              <SliderField label="Sleep" value={sleep} onChange={setSleep} min={3} max={12} emoji="💤" />
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Symptoms</label>
                <SymptomSelector selected={symptoms} onChange={setSymptoms} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling today?"
                  className="input-field h-20 resize-none" />
              </div>
              <button onClick={handleSave} className="btn-primary w-full gap-2">
                <Save className="w-4 h-4" /> Save Log
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
