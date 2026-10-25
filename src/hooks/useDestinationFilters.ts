/**
 * Search + category filtering for destinations.
 *
 * One reusable hook keeps the logic out of the screens so Home (and any
 * future screen that wants it) shares identical behaviour:
 *  - search matches case-insensitively against name and state
 *  - the query is trimmed so whitespace never changes results
 *  - an empty query matches everything for the active category
 *  - category and search always combine ("sum AND query", not "either")
 */
import { useMemo, useState } from "react";
import type {
  Destination,
  DestinationCategory,
} from "../types/destination";

/** Pure helper exposed for reuse and testing. */
export function filterDestinations(
  destinations: Destination[],
  query: string,
  category: DestinationCategory
): Destination[] {
  const trimmed = query.trim().toLowerCase();
  return destinations.filter((destination) => {
    // Category filter: "All" passes everything.
    const matchesCategory =
      category === "All" || destination.category === category;
    if (!matchesCategory) return false;

    // Search filter: empty query passes everything.
    if (trimmed.length === 0) return true;
    const haystack =
      `${destination.name} ${destination.state}`.toLowerCase();
    return haystack.includes(trimmed);
  });
}

export interface DestinationFilters {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  category: DestinationCategory;
  setCategory: (category: DestinationCategory) => void;
  resetFilters: () => void;
  filtered: Destination[];
  /** True when at least one filter field is active. */
  hasActiveFilters: boolean;
}

export function useDestinationFilters(
  destinations: Destination[]
): DestinationFilters {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DestinationCategory>("All");

  const filtered = useMemo(
    () => filterDestinations(destinations, query, category),
    [destinations, query, category]
  );

  const hasActiveFilters = category !== "All" || query.trim().length > 0;

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return {
    query,
    setQuery,
    clearQuery: () => setQuery(""),
    category,
    setCategory,
    resetFilters,
    filtered,
    hasActiveFilters,
  };
}
