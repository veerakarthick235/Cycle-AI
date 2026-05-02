import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Clock, AlertTriangle, Printer } from "lucide-react";
import HealthScoreGauge from "@/components/HealthScoreGauge";
import { mockCycles, mockPrediction, mockAnalytics } from "@/utils/mockData";
import { formatDate } from "@/utils/dates";

export default function DoctorPortal() {
  const { token } = useParams();
  const isValid = token && token.length > 3;

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh pt-20">
        <div className="glass-card p-8 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-gray-900">Invalid or Expired Link</h1>
          <p className="text-sm text-gray-500 mt-2">This shared access link is invalid or has expired. Please request a new one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-8 print:pt-4 print:bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="font-display text-xl font-bold text-gray-900">Patient Cycle Report</h1>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Shared via CycleAI · Expires in 7 days
              </p>
            </div>
          </div>
          <button onClick={() => window.print()} className="btn-secondary !py-2 !px-4 gap-2 text-sm">
            <Printer className="w-4 h-4" /> Print
          </button>
        </motion.div>

        {/* Health Score */}
        <div className="glass-card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <HealthScoreGauge score={mockPrediction.cycle_health_score} size={140} />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-lg font-semibold text-gray-900">Overall Health Score</h2>
            <p className="text-sm text-gray-500 mt-1">Based on cycle regularity, mood, pain trends, and sleep consistency.</p>
          </div>
        </div>

        {/* Cycle History Table */}
        <div className="glass-card p-6 mb-6 overflow-x-auto">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Cycle History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Start</th>
                <th className="py-2 pr-4">End</th>
                <th className="py-2 pr-4">Length</th>
                <th className="py-2 pr-4">Period</th>
                <th className="py-2">Flow</th>
              </tr>
            </thead>
            <tbody>
              {mockCycles.map((c, i) => (
                <tr key={c.id} className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 text-gray-400">{i + 1}</td>
                  <td className="py-2.5 pr-4 font-mono">{formatDate(c.start_date, "MMM d, yyyy")}</td>
                  <td className="py-2.5 pr-4 font-mono">{formatDate(c.end_date, "MMM d, yyyy")}</td>
                  <td className="py-2.5 pr-4 font-mono font-medium">{c.cycle_length}d</td>
                  <td className="py-2.5 pr-4 font-mono">{c.period_length}d</td>
                  <td className="py-2.5 capitalize">{c.flow_intensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Symptom Summary */}
        <div className="glass-card p-6 mb-6">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Top Symptoms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mockAnalytics.symptomFrequency.slice(0, 8).map((s) => (
              <div key={s.name} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="font-semibold text-sm text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.percentage}% of cycles</p>
              </div>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <p className="text-center text-xs text-gray-300 mt-8 print:text-gray-500">
          Shared via CycleAI · cycleai.app · This report is for informational purposes only.
        </p>
      </div>
    </div>
  );
}
