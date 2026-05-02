export const CYCLE_PHASES = {
  MENSTRUAL: "menstrual",
  FOLLICULAR: "follicular",
  OVULATION: "ovulation",
  LUTEAL: "luteal",
};

export const PHASE_CONFIG = {
  [CYCLE_PHASES.MENSTRUAL]: {
    label: "Menstrual Phase",
    color: "#FF6B6B",
    bgClass: "bg-red-400",
    textClass: "text-red-600",
    bgLight: "bg-red-50",
    icon: "droplets",
    description: "Your period is here. Rest and nourish yourself.",
  },
  [CYCLE_PHASES.FOLLICULAR]: {
    label: "Follicular Phase",
    color: "#4ECDC4",
    bgClass: "bg-teal-400",
    textClass: "text-teal-600",
    bgLight: "bg-teal-50",
    icon: "sprout",
    description: "Energy is rising. Great time for new projects!",
  },
  [CYCLE_PHASES.OVULATION]: {
    label: "Ovulation Phase",
    color: "#FFB347",
    bgClass: "bg-amber-400",
    textClass: "text-amber-600",
    bgLight: "bg-amber-50",
    icon: "sun",
    description: "Peak energy and fertility. You're glowing!",
  },
  [CYCLE_PHASES.LUTEAL]: {
    label: "Luteal Phase",
    color: "#9D4EDD",
    bgClass: "bg-purple-500",
    textClass: "text-purple-600",
    bgLight: "bg-purple-50",
    icon: "moon",
    description: "Winding down. Prioritize self-care and rest.",
  },
};

export const FLOW_OPTIONS = [
  { value: "none", label: "None", emoji: "⚪" },
  { value: "spotting", label: "Spotting", emoji: "🔴" },
  { value: "light", label: "Light", emoji: "🩸" },
  { value: "medium", label: "Medium", emoji: "🩸🩸" },
  { value: "heavy", label: "Heavy", emoji: "🩸🩸🩸" },
];

export const MUCUS_OPTIONS = [
  { value: "dry", label: "Dry" },
  { value: "sticky", label: "Sticky" },
  { value: "creamy", label: "Creamy" },
  { value: "watery", label: "Watery" },
  { value: "egg_white", label: "Egg White" },
];

export const SYMPTOM_CATEGORIES = {
  physical: {
    label: "Physical",
    symptoms: [
      { id: 1, name: "Cramps", icon: "⚡" },
      { id: 2, name: "Headache", icon: "🤕" },
      { id: 3, name: "Bloating", icon: "🎈" },
      { id: 4, name: "Breast tenderness", icon: "💗" },
      { id: 5, name: "Back pain", icon: "🔙" },
      { id: 6, name: "Acne", icon: "😣" },
      { id: 7, name: "Fatigue", icon: "😴" },
      { id: 8, name: "Nausea", icon: "🤢" },
    ],
  },
  emotional: {
    label: "Emotional",
    symptoms: [
      { id: 9, name: "Mood swings", icon: "🎭" },
      { id: 10, name: "Anxiety", icon: "😰" },
      { id: 11, name: "Irritability", icon: "😤" },
      { id: 12, name: "Sadness", icon: "😢" },
      { id: 13, name: "Calm", icon: "😌" },
      { id: 14, name: "Happy", icon: "😊" },
    ],
  },
  digestive: {
    label: "Digestive",
    symptoms: [
      { id: 15, name: "Cravings", icon: "🍫" },
      { id: 16, name: "Appetite loss", icon: "🚫" },
      { id: 17, name: "Constipation", icon: "😣" },
      { id: 18, name: "Diarrhea", icon: "💨" },
    ],
  },
  other: {
    label: "Other",
    symptoms: [
      { id: 19, name: "Insomnia", icon: "🌙" },
      { id: 20, name: "Hot flashes", icon: "🔥" },
      { id: 21, name: "Dizziness", icon: "💫" },
      { id: 22, name: "Joint pain", icon: "🦴" },
    ],
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    tier: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Basic cycle tracking",
      "Daily logging",
      "3-month history",
      "Simple predictions",
      "Community support",
    ],
    limitations: ["No analytics", "No doctor sharing", "No AI insights"],
    highlighted: false,
    cta: "Current Plan",
  },
  {
    tier: "premium",
    name: "Premium",
    price: "$9.99",
    period: "/month",
    features: [
      "Everything in Free",
      "Unlimited history",
      "Advanced AI predictions",
      "Full analytics dashboard",
      "Symptom correlation engine",
      "Doctor share portal",
      "PDF reports",
      "Priority support",
    ],
    limitations: [],
    highlighted: true,
    cta: "Upgrade Now",
  },
  {
    tier: "annual",
    name: "Annual",
    price: "$79.99",
    period: "/year",
    badge: "Save 33%",
    features: [
      "Everything in Premium",
      "2 months free",
      "Early access to features",
      "Personalized health insights",
      "Data export (GDPR)",
    ],
    limitations: [],
    highlighted: false,
    cta: "Go Annual",
  },
];

export const HEALTH_SCORE_LABELS = {
  excellent: { min: 90, max: 100, label: "Excellent", color: "#4ECDC4" },
  good: { min: 70, max: 89, label: "Good", color: "#9D4EDD" },
  fair: { min: 50, max: 69, label: "Fair", color: "#FFB347" },
  needsCare: { min: 30, max: 49, label: "Needs Care", color: "#FF6B6B" },
  consult: { min: 0, max: 29, label: "Consult a Doctor", color: "#E03560" },
};
