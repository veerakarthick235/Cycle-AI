import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays } from "date-fns";
import { Calendar, Activity, Droplets, Brain, Clock, Heart, Zap, Moon } from "lucide-react";
import useCycleStore from "@/store/cycleStore";
import useAuthStore from "@/store/authStore";
import PhaseChip from "@/components/PhaseChip";
import HealthScoreGauge from "@/components/HealthScoreGauge";
import InsightCard from "@/components/InsightCard";
import StatCard from "@/components/StatCard";
import PredictionCard from "@/components/PredictionCard";
import LogDrawer from "@/components/LogDrawer";
import { getCyclePhase, getDaysUntilPeriod, formatDate, formatRelative } from "@/utils/dates";
import { PHASE_CONFIG } from "@/utils/constants";

export default function Dashboard() {
  const { prediction, lastPeriodStart, avgCycleLength, cycles, dailyLogs } = useCycleStore();
  const { user } = useAuthStore();
  const [logDrawerDate, setLogDrawerDate] = useState(null);

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const currentPhase = getCyclePhase(today, lastPeriodStart, avgCycleLength);
  const daysUntil = getDaysUntilPeriod(lastPeriodStart, avgCycleLength);
  const phaseConfig = PHASE_CONFIG[currentPhase];
  const todayLog = dailyLogs.find((l) => l.log_date === todayStr);

  // Mini calendar — current week + next week
  const calDays = Array.from({ length: 14 }, (_, i) => {
    const d = addDays(today, i - 3);
    return { date: d, str: format(d, "yyyy-MM-dd"), phase: getCyclePhase(d, lastPeriodStart, avgCycleLength) };
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Phase Banner ─────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-6 mb-8 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${phaseConfig.color}CC, ${phaseConfig.color}88)` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white/80 mb-1">Hello, {user?.full_name?.split(" ")[0] || "there"} 👋</p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">{phaseConfig.label}</h1>
              <p className="text-sm text-white/80 mt-1">{phaseConfig.description}</p>
            </div>
            <div className="glass-card !bg-white/20 !border-white/30 px-5 py-3 text-center">
              <p className="text-3xl font-bold font-mono">{Math.max(0, daysUntil)}</p>
              <p className="text-xs text-white/80">days until period</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left Column (2/3) ──────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mini Calendar Strip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {calDays.map((d) => {
                  const isToday = d.str === todayStr;
                  const pConf = PHASE_CONFIG[d.phase];
                  return (
                    <button key={d.str} onClick={() => setLogDrawerDate(d.str)}
                      className={`flex-shrink-0 flex flex-col items-center gap-1 w-12 py-2 rounded-lg transition-all hover:bg-pink-50 ${
                        isToday ? "ring-2 ring-pink-500 bg-pink-50" : ""
                      }`} aria-label={`Log for ${format(d.date, "MMM d")}`}>
                      <span className="text-xs text-gray-400">{format(d.date, "EEE")}</span>
                      <span className={`text-sm font-bold ${isToday ? "text-pink-600" : "text-gray-700"}`}>
                        {format(d.date, "d")}
                      </span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pConf?.color || "#ccc" }} />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Today's Quick Log */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-gray-900">Today's Log</h3>
                <button onClick={() => setLogDrawerDate(todayStr)} className="text-sm text-pink-600 font-medium hover:text-pink-700">
                  {todayLog ? "Edit" : "Log Now →"}
                </button>
              </div>
              {todayLog ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Droplets className="w-4 h-4 text-red-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Flow</p>
                    <p className="font-semibold text-sm capitalize">{todayLog.flow}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Heart className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Mood</p>
                    <p className="font-semibold text-sm">{todayLog.mood_score}/10</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Energy</p>
                    <p className="font-semibold text-sm">{todayLog.energy_level}/10</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Moon className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Sleep</p>
                    <p className="font-semibold text-sm">{todayLog.sleep_hours}h</p>
                  </div>
                </div>
              ) : (
                <button onClick={() => setLogDrawerDate(todayStr)}
                  className="w-full py-8 border-2 border-dashed border-pink-200 rounded-lg text-pink-400 hover:bg-pink-50 hover:border-pink-300 transition-colors">
                  + Tap to log today
                </button>
              )}
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" /> AI Insights
              </h3>
              <div className="space-y-3">
                {prediction.insight_json.map((insight, i) => (
                  <InsightCard key={i} {...insight} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column (1/3) ─────────────────────── */}
          <div className="space-y-6">
            {/* Health Score */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="glass-card p-5 flex flex-col items-center">
              <HealthScoreGauge score={prediction.cycle_health_score} />
            </motion.div>

            {/* Prediction */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <PredictionCard
                nextDate={formatDate(prediction.next_period_date, "MMM d")}
                confidence={prediction.confidence_score}
                lower={formatDate(prediction.period_date_lower, "MMM d")}
                upper={formatDate(prediction.period_date_upper, "MMM d")}
              />
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="space-y-3">
              <StatCard icon={Calendar} label="Avg Cycle" value={avgCycleLength} suffix="days" trend={1} />
              <StatCard icon={Activity} label="Cycles Logged" value={cycles.length} trend={0} />
              <StatCard icon={Clock} label="Next Ovulation"
                value={formatDate(prediction.ovulation_date, "MMM d")} />
            </motion.div>

            {/* Recent Symptoms */}
            {todayLog?.symptoms?.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="glass-card p-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Today's Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {todayLog.symptoms.map((s) => (
                    <span key={s.id} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Log Drawer */}
      <LogDrawer date={logDrawerDate} isOpen={!!logDrawerDate} onClose={() => setLogDrawerDate(null)} />
    </div>
  );
}
