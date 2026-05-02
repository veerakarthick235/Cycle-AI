import { useState } from "react";
import ReactCalendar from "react-calendar";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Plus, Droplets, Sun, Leaf } from "lucide-react";
import useCycleStore from "@/store/cycleStore";
import LogDrawer from "@/components/LogDrawer";
import { getCyclePhase, isPeriodDay, isFertileDay, isOvulationDay } from "@/utils/dates";
import { CYCLE_PHASES } from "@/utils/constants";
import toast from "react-hot-toast";

export default function CalendarPage() {
  const { lastPeriodStart, avgCycleLength, dailyLogs, startCycle } = useCycleStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const avgPeriodLength = 5;

  const handleDayClick = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    setSelectedDate(dateStr);
    setShowDrawer(true);
  };

  const handleAddPeriod = () => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    startCycle(todayStr);
    toast.success("New period started today!");
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    const classes = [];
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const dateStr = format(date, "yyyy-MM-dd");
    if (dateStr === todayStr) classes.push("!ring-2 !ring-pink-500");
    return classes.join(" ");
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateStr = format(date, "yyyy-MM-dd");
    const period = isPeriodDay(date, lastPeriodStart, avgCycleLength, avgPeriodLength);
    const fertile = isFertileDay(date, lastPeriodStart, avgCycleLength);
    const ovulation = isOvulationDay(date, lastPeriodStart, avgCycleLength);
    const hasLog = dailyLogs.some((l) => l.log_date === dateStr);

    return (
      <div className="flex flex-col items-center gap-0.5 mt-0.5">
        {period && <Droplets className="w-3.5 h-3.5 text-red-500" />}
        {ovulation && <Sun className="w-3.5 h-3.5 text-amber-500" />}
        {fertile && !ovulation && <Leaf className="w-3.5 h-3.5 text-teal-500" />}
        {hasLog && !period && !fertile && (
          <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-gray-900">Cycle Calendar</h1>
          <button onClick={handleAddPeriod} className="btn-primary !py-2 !px-4 gap-2 text-sm"
            aria-label="Add period">
            <Plus className="w-4 h-4" /> Log Period
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="glass-card p-6">
          <ReactCalendar
            onClickDay={handleDayClick}
            tileClassName={tileClassName}
            tileContent={tileContent}
            locale="en-US"
            prev2Label={null}
            next2Label={null}
          />

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Droplets className="w-3.5 h-3.5 text-red-500" /> Period
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Ovulation
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Leaf className="w-3.5 h-3.5 text-teal-500" /> Fertile
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block" /> Logged
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-4 h-4 rounded border-2 border-pink-500 inline-block" /> Today
            </span>
          </div>
        </motion.div>
      </div>

      <LogDrawer date={selectedDate} isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
    </div>
  );
}
