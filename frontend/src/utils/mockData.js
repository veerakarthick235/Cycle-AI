import { subDays, addDays, format } from "date-fns";

const today = new Date();

/**
 * Realistic mock user profile.
 */
export const mockUser = {
  id: "u-001",
  email: "priya@example.com",
  full_name: "Priya Sharma",
  date_of_birth: "1998-06-15",
  avg_cycle_length: 29,
  avg_period_length: 5,
  timezone: "Asia/Kolkata",
  subscription_tier: "premium",
  onboarding_done: true,
};

/**
 * Generate realistic cycle history for past 8 months.
 */
export function generateMockCycles() {
  const cycles = [];
  let currentStart = subDays(today, 8 * 29);

  for (let i = 0; i < 8; i++) {
    const length = 27 + Math.floor(Math.random() * 5); // 27–31
    const periodLength = 4 + Math.floor(Math.random() * 3); // 4–6
    const endDate = addDays(currentStart, periodLength - 1);
    cycles.push({
      id: `c-${i + 1}`,
      user_id: "u-001",
      start_date: format(currentStart, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
      cycle_length: length,
      period_length: periodLength,
      flow_intensity: ["light", "medium", "medium", "heavy", "medium", "light", "medium", "heavy"][i],
      is_confirmed: true,
      notes: "",
    });
    currentStart = addDays(currentStart, length);
  }
  return cycles;
}

export const mockCycles = generateMockCycles();
export const lastPeriodStart = mockCycles[mockCycles.length - 1].start_date;

/**
 * Generate daily logs for the past 60 days.
 */
export function generateMockLogs() {
  const logs = [];
  for (let i = 0; i < 60; i++) {
    const date = subDays(today, i);
    const dayOfCycle = i % 29;
    logs.push({
      id: `l-${i}`,
      log_date: format(date, "yyyy-MM-dd"),
      flow: dayOfCycle < 5 ? ["heavy", "medium", "medium", "light", "spotting"][dayOfCycle] : "none",
      mood_score: Math.max(3, Math.min(10, 7 + Math.floor(Math.random() * 4) - 2)),
      energy_level: Math.max(2, Math.min(10, 6 + Math.floor(Math.random() * 5) - 2)),
      pain_level: dayOfCycle < 3 ? 5 + Math.floor(Math.random() * 4) : Math.floor(Math.random() * 3) + 1,
      sleep_hours: +(6 + Math.random() * 3).toFixed(1),
      basal_temp: +(36.2 + Math.random() * 0.8).toFixed(2),
      cervical_mucus: ["dry", "sticky", "creamy", "watery", "egg_white"][Math.floor(Math.random() * 5)],
      symptoms: dayOfCycle < 5
        ? [{ id: 1, name: "Cramps", severity: 2 }, { id: 3, name: "Bloating", severity: 1 }]
        : dayOfCycle > 22
          ? [{ id: 9, name: "Mood swings", severity: 2 }, { id: 7, name: "Fatigue", severity: 1 }]
          : [],
    });
  }
  return logs;
}

export const mockLogs = generateMockLogs();

/**
 * Mock prediction data.
 */
export const mockPrediction = {
  id: "p-001",
  next_period_date: format(addDays(new Date(lastPeriodStart), 29), "yyyy-MM-dd"),
  period_date_lower: format(addDays(new Date(lastPeriodStart), 27), "yyyy-MM-dd"),
  period_date_upper: format(addDays(new Date(lastPeriodStart), 31), "yyyy-MM-dd"),
  ovulation_date: format(addDays(new Date(lastPeriodStart), 15), "yyyy-MM-dd"),
  fertility_start: format(addDays(new Date(lastPeriodStart), 12), "yyyy-MM-dd"),
  fertility_end: format(addDays(new Date(lastPeriodStart), 18), "yyyy-MM-dd"),
  confidence_score: 0.847,
  cycle_health_score: 78,
  model_version: "gb_v1.2",
  irregularity_flag: false,
  insight_json: [
    { type: "info", title: "Consistent Cycles", body: "Your last 3 cycles averaged 29 days — very regular!", severity: "low" },
    { type: "warning", title: "Pre-Menstrual Pattern", body: "Headaches appear in 75% of your pre-menstrual phases.", severity: "medium" },
    { type: "success", title: "Sleep Improvement", body: "Your average sleep has increased by 0.5 hours this month.", severity: "low" },
    { type: "info", title: "Energy Pattern", body: "Your energy drops consistently 2 days before your period.", severity: "low" },
  ],
};

/**
 * Mock analytics data.
 */
export const mockAnalytics = {
  cycleLengths: mockCycles.map((c, i) => ({
    label: `Cycle ${i + 1}`,
    value: c.cycle_length,
    date: c.start_date,
  })),
  symptomFrequency: [
    { name: "Cramps", count: 18, percentage: 72 },
    { name: "Bloating", count: 15, percentage: 60 },
    { name: "Headache", count: 12, percentage: 48 },
    { name: "Mood swings", count: 14, percentage: 56 },
    { name: "Fatigue", count: 20, percentage: 80 },
    { name: "Breast tenderness", count: 8, percentage: 32 },
    { name: "Acne", count: 6, percentage: 24 },
    { name: "Cravings", count: 16, percentage: 64 },
  ],
  moodByPhase: {
    labels: ["Menstrual", "Follicular", "Ovulation", "Luteal"],
    mood: [5.2, 7.1, 8.3, 5.8],
    energy: [4.1, 7.5, 8.8, 5.0],
    pain: [6.5, 2.1, 1.5, 3.8],
  },
  healthScoreHistory: [
    { month: "Nov", score: 72 },
    { month: "Dec", score: 75 },
    { month: "Jan", score: 71 },
    { month: "Feb", score: 78 },
    { month: "Mar", score: 80 },
    { month: "Apr", score: 78 },
  ],
};
