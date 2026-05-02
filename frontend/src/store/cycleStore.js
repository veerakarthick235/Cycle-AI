import { create } from "zustand";
import { mockCycles, mockLogs, mockPrediction, lastPeriodStart, mockAnalytics } from "@/utils/mockData";

const useCycleStore = create((set, get) => ({
  cycles: mockCycles,
  dailyLogs: mockLogs,
  prediction: mockPrediction,
  analytics: mockAnalytics,
  lastPeriodStart,
  avgCycleLength: 29,
  avgPeriodLength: 5,
  isLoading: false,

  // Add a new daily log or update existing
  upsertLog: (logDate, data) => {
    set((state) => {
      const existing = state.dailyLogs.findIndex((l) => l.log_date === logDate);
      if (existing >= 0) {
        const updated = [...state.dailyLogs];
        updated[existing] = { ...updated[existing], ...data };
        return { dailyLogs: updated };
      }
      return {
        dailyLogs: [{ id: `l-${Date.now()}`, log_date: logDate, ...data }, ...state.dailyLogs],
      };
    });
  },

  // Get log for a specific date
  getLogByDate: (date) => {
    return get().dailyLogs.find((l) => l.log_date === date) || null;
  },

  // Start a new cycle
  startCycle: (startDate) => {
    set((state) => {
      const newCycle = {
        id: `c-${Date.now()}`,
        start_date: startDate,
        end_date: null,
        cycle_length: null,
        period_length: null,
        flow_intensity: "medium",
        is_confirmed: true,
      };
      return {
        cycles: [...state.cycles, newCycle],
        lastPeriodStart: startDate,
      };
    });
  },

  // Get cycle for a specific date
  getCycleForDate: (date) => {
    return get().cycles.find((c) => {
      return date >= c.start_date && (!c.end_date || date <= c.end_date);
    });
  },
}));

export default useCycleStore;
