/**
 * Core domain types for Roam India.
 * These are the single source of truth for what a destination looks like
 * across every screen in the app.
 */

export type DestinationCategory =
  | "All"
  | "Beaches"
  | "Mountains"
  | "Heritage"
  | "Adventure";

/** Categories that individual destinations can belong to (never includes "All"). */
export type DestinationCategoryValue = Exclude<DestinationCategory, "All">;

/**
 * Photo reference: a bundled require()-asset module number (primary),
 * or an https URL fallback.
 */
export type ImageRef = number | string;

/** Typical budget feel of a trip, used by the preference-based trip matcher. */
export type BudgetLevel = "Economy" | "Moderate" | "Premium";

export interface Attraction {
  id: string;
  name: string;
  /** Image that corresponds to this specific attraction. */
  image: ImageRef;
  description?: string;
}

export interface Destination {
  id: string;
  name: string;
  /** State or region the destination sits in. */
  state: string;
  category: DestinationCategoryValue;
  shortDescription: string;
  /** Longer description shown on the details screen. */
  description: string;
  /** Destination-specific guidance, e.g. "November to February". */
  bestTimeToVisit: string;
  heroImage: ImageRef;
  attractions: Attraction[];
  highlights?: string[];
  /** Rough ideal trip length in days (min value used by the matcher). */
  idealDays?: number;
  /** Rough max ideal trip length in days. */
  maxIdealDays?: number;
  /** Typical budget feel — guidance only, not live pricing. */
  budget?: BudgetLevel;
  travelTip?: string;
  /** Approximate coordinates, kept for future use and map queries. */
  coordinates?: { latitude: number; longitude: number };
  /**
   * A short caption shown on the home hero card when this destination
   * is the featured one for the day.
   */
  heroCaption?: string;
  /** Destinations eligible for the daily rotating home hero card. */
  featured?: boolean;
}
