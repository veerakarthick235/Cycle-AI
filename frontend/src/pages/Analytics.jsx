import { motion } from "framer-motion";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend } from "chart.js";
import { Download, Lock } from "lucide-react";
import useCycleStore from "@/store/cycleStore";
import InsightCard from "@/components/InsightCard";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const chartOpts = { responsive: true, maintainAspectRatio: false, animation: { duration: 1200 },
  plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: "#f3f0f5" } },
  x: { grid: { display: false } } } };

export default function Analytics() {
  const { analytics, prediction } = useCycleStore();

  const cycleLengthData = {
    labels: analytics.cycleLengths.map((c) => c.label),
    datasets: [{
      label: "Cycle Length",
      data: analytics.cycleLengths.map((c) => c.value),
      borderColor: "#FF6F91",
      backgroundColor: "rgba(255,111,145,0.1)",
      fill: true, tension: 0.4, pointBackgroundColor: "#FF6F91", pointRadius: 5,
    }, {
      label: "Average",
      data: analytics.cycleLengths.map(() => 29),
      borderColor: "#9D4EDD", borderDash: [6, 4], pointRadius: 0, borderWidth: 1.5,
    }],
  };

  const moodData = {
    labels: analytics.moodByPhase.labels,
    datasets: [
      { label: "Mood", data: analytics.moodByPhase.mood, backgroundColor: "#FF6F91", borderRadius: 6 },
      { label: "Energy", data: analytics.moodByPhase.energy, backgroundColor: "#FFB347", borderRadius: 6 },
      { label: "Pain", data: analytics.moodByPhase.pain, backgroundColor: "#9D4EDD", borderRadius: 6 },
    ],
  };
  const moodOpts = { ...chartOpts, plugins: { legend: { display: true, position: "top", labels: { usePointStyle: true, pointStyle: "circle" } } } };

  const healthData = {
    labels: analytics.healthScoreHistory.map((h) => h.month),
    datasets: [{
      label: "Health Score",
      data: analytics.healthScoreHistory.map((h) => h.score),
      borderColor: "#4ECDC4", backgroundColor: "rgba(78,205,196,0.15)",
      fill: true, tension: 0.4, pointBackgroundColor: "#4ECDC4", pointRadius: 5,
    }],
  };

  const symptomData = {
    labels: analytics.symptomFrequency.slice(0, 6).map((s) => s.name),
    datasets: [{
      data: analytics.symptomFrequency.slice(0, 6).map((s) => s.count),
      backgroundColor: ["#FF6F91", "#FFB347", "#9D4EDD", "#4ECDC4", "#FF6B6B", "#B57BEE"],
    }],
  };
  const doughnutOpts = { responsive: true, maintainAspectRatio: false, animation: { duration: 1200 },
    plugins: { legend: { position: "right", labels: { usePointStyle: true, pointStyle: "circle", padding: 12, font: { size: 11 } } } } };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Deep insights into your cycle patterns</p>
          </div>
          <button className="btn-secondary !py-2 !px-4 gap-2 text-sm" aria-label="Export data">
            <Download className="w-4 h-4" /> Export
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cycle Length Trend */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Cycle Length Trend</h3>
            <div className="h-64"><Line data={cycleLengthData} options={chartOpts} /></div>
          </motion.div>

          {/* Mood & Energy by Phase */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Mood & Energy by Phase</h3>
            <div className="h-64"><Bar data={moodData} options={moodOpts} /></div>
          </motion.div>

          {/* Health Score History */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Health Score History</h3>
            <div className="h-64"><Line data={healthData} options={chartOpts} /></div>
          </motion.div>

          {/* Symptom Frequency */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Top Symptoms</h3>
            <div className="h-64"><Doughnut data={symptomData} options={doughnutOpts} /></div>
          </motion.div>
        </div>

        {/* AI Correlations */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-6 glass-card p-5">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">AI Correlations</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {prediction.insight_json.map((ins, i) => (
              <InsightCard key={i} {...ins} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
