import { format, differenceInDays, addDays, subDays, isWithinInterval, startOfDay } from "date-fns";
import { CYCLE_PHASES } from "./constants";

/**
 * Format a date for display.
 */
export function formatDate(date, fmt = "MMM d, yyyy") {
  if (!date) return "";
  return format(new Date(date), fmt);
}

/**
 * Format a date as relative ("in 5 days", "2 days ago").
 */
export function formatRelative(targetDate) {
  const today = startOfDay(new Date());
  const target = startOfDay(new Date(targetDate));
  const diff = differenceInDays(target, today);

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 0) return `in ${diff} days`;
  return `${Math.abs(diff)} days ago`;
}

/**
 * Determine which cycle phase a given date falls into.
 * Uses simple approximation based on cycle/period length.
 */
export function getCyclePhase(date, lastPeriodStart, cycleLength = 28, periodLength = 5) {
  const d = startOfDay(new Date(date));
  const start = startOfDay(new Date(lastPeriodStart));
  const dayInCycle = ((differenceInDays(d, start) % cycleLength) + cycleLength) % cycleLength;

  if (dayInCycle < periodLength) {
    return CYCLE_PHASES.MENSTRUAL;
  }
  const ovulationDay = cycleLength - 14;
  if (dayInCycle < ovulationDay - 3) {
    return CYCLE_PHASES.FOLLICULAR;
  }
  if (dayInCycle <= ovulationDay + 1) {
    return CYCLE_PHASES.OVULATION;
  }
  return CYCLE_PHASES.LUTEAL;
}

/**
 * Get the predicted next period date.
 */
export function getNextPeriodDate(lastPeriodStart, cycleLength = 28) {
  return addDays(new Date(lastPeriodStart), cycleLength);
}

/**
 * Get days until next period.
 */
export function getDaysUntilPeriod(lastPeriodStart, cycleLength = 28) {
  const nextPeriod = getNextPeriodDate(lastPeriodStart, cycleLength);
  return differenceInDays(startOfDay(nextPeriod), startOfDay(new Date()));
}

/**
 * Check if a given date is a period day.
 */
export function isPeriodDay(date, lastPeriodStart, cycleLength = 28, periodLength = 5) {
  return getCyclePhase(date, lastPeriodStart, cycleLength, periodLength) === CYCLE_PHASES.MENSTRUAL;
}

/**
 * Check if a given date is in the fertile window (ovulation ± 3 days).
 */
export function isFertileDay(date, lastPeriodStart, cycleLength = 28) {
  const d = startOfDay(new Date(date));
  const start = startOfDay(new Date(lastPeriodStart));
  const dayInCycle = ((differenceInDays(d, start) % cycleLength) + cycleLength) % cycleLength;
  const ovulationDay = cycleLength - 14;
  return dayInCycle >= ovulationDay - 3 && dayInCycle <= ovulationDay + 3;
}

/**
 * Check if a given date is ovulation day.
 */
export function isOvulationDay(date, lastPeriodStart, cycleLength = 28) {
  const d = startOfDay(new Date(date));
  const start = startOfDay(new Date(lastPeriodStart));
  const dayInCycle = ((differenceInDays(d, start) % cycleLength) + cycleLength) % cycleLength;
  const ovulationDay = cycleLength - 14;
  return dayInCycle === ovulationDay;
}

/**
 * Get ovulation date for a given cycle.
 */
export function getOvulationDate(lastPeriodStart, cycleLength = 28) {
  const ovulationDay = cycleLength - 14;
  return addDays(new Date(lastPeriodStart), ovulationDay);
}

/**
 * Get fertility window.
 */
export function getFertilityWindow(lastPeriodStart, cycleLength = 28) {
  const ovulation = getOvulationDate(lastPeriodStart, cycleLength);
  return {
    start: subDays(ovulation, 3),
    end: addDays(ovulation, 3),
  };
}
