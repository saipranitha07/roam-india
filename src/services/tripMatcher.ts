/**
 * Transparent, preference-based destination matching (Enhancement B).
 *
 * Rules are deliberately simple and explainable:
 *   +2.0  destination's category matches the chosen travel style
 *   +1.5  destination's typical trip length fits the chosen duration
 *   +1.0  destination's typical budget matches the chosen budget
 *        (budget is honest end-of-spectrum guidance, not live pricing)
 *
 * This is a local rule engine over the same dataset the rest of the app
 * uses — not AI-generated travel intelligence, and the UI labels it as such.
 */
import destinations from "../data/destinations";
import type {
  BudgetLevel,
  Destination,
  DestinationCategory,
} from "../types/destination";

export type DurationPreference = "any" | "short" | "medium" | "long";
export type BudgetPreference = "any" | BudgetLevel;

export interface MatchPreferences {
  category: DestinationCategory;
  duration: DurationPreference;
  budget: BudgetPreference;
}

export interface MatchResult {
  destination: Destination;
  /** 0..4.5 preference match score. */
  score: number;
  /** Human-readable reasons derived from the rule outcomes. */
  reasons: string[];
}

const DURATION_WEIGHTS: Record<Exclude<DurationPreference, "any">, number> = {
  short: 1.5,
  medium: 1.5,
  long: 1.5,
};

function fitsDuration(
  destination: Destination,
  duration: Exclude<DurationPreference, "any">
): boolean {
  const min = destination.idealDays ?? 3;
  const max = destination.maxIdealDays ?? min;
  switch (duration) {
    case "short":
      return max <= 3;
    case "medium":
      return min >= 4 && max <= 5;
    case "long":
      return max >= 6;
  }
}

/** Returns suggestions sorted by match score (best first). */
export function matchDestinations(
  preferences: MatchPreferences
): MatchResult[] {
  const { category, duration, budget } = preferences;

  // A category other than "All" hard-filters; other preferences score.
  const pool =
    category === "All"
      ? destinations
      : destinations.filter((d) => d.category === category);

  const results = pool.map<MatchResult>((destination) => {
    let score = 0;
    const reasons: string[] = [];

    if (category === destination.category) {
      score += 2;
      reasons.push(`Matches your ${destination.category} preference`);
    }

    if (duration !== "any") {
      const fits = fitsDuration(destination, duration);
      if (fits) {
        score += DURATION_WEIGHTS[duration];
        reasons.push(
          `Suits a ${labelForDuration(destination.idealDays, destination.maxIdealDays)} trip`
        );
      }
    }

    if (budget !== "any" && destination.budget) {
      if (destination.budget === budget) {
        score += 1;
        reasons.push(`Typically ${labelForBudget(destination.budget)}`);
      }
    }

    return { destination, score, reasons };
  });

  return results.sort((a, b) => b.score - a.score);
}

/** Positive reasons at the top of the list get highlighted in the UI. */
export const strongestReasonCount = 1;

export function labelForDuration(
  min?: number,
  max?: number
): string {
  if (!min) return "3 days";
  if (max && max !== min) return `${min}–${max} day`;
  return `${min} day${min === 1 ? "" : "s"}`;
}

/** Neutral, honest wording — these are "typical" labels, not live prices. */
export function labelForBudget(budget: BudgetLevel): string {
  switch (budget) {
    case "Economy":
      return "budget-friendly";
    case "Moderate":
      return "mid-range";
    case "Premium":
      return "high-end";
  }
}

export const durationOptions: Array<{
  value: DurationPreference;
  label: string;
}> = [
  { value: "any", label: "Any length" },
  { value: "short", label: "2–3 days" },
  { value: "medium", label: "4–5 days" },
  { value: "long", label: "6+ days" },
];

export const budgetOptions: Array<{
  value: BudgetPreference;
  label: string;
}> = [
  { value: "any", label: "Any budget" },
  { value: "Economy", label: "Budget-friendly" },
  { value: "Moderate", label: "Mid-range" },
  { value: "Premium", label: "High-end" },
];
