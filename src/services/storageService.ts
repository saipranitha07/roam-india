/**
 * Wishlist persistence on top of AsyncStorage.
 *
 * Kept as a small dedicated service so the React context never touches
 * storage details directly, and failures are contained in one place.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const WISHLIST_KEY = "roam-india.wishlist.v1";

/** Loads the persisted wishlist ids; returns an empty list on any failure. */
export async function loadWishlistIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Only keep unique string ids — guards against corrupted or legacy data.
    return Array.from(new Set(parsed.filter((id): id is string => typeof id === "string")));
  } catch (error) {
    console.warn("[Roam India] Failed to load wishlist:", error);
    return [];
  }
}

/** Persists the wishlist ids; failures are logged, never thrown at callers. */
export async function saveWishlistIds(ids: string[]): Promise<boolean> {
  try {
    // De-dupe before writing so the stored list can never gain duplicates.
    const unique = Array.from(new Set(ids));
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(unique));
    return true;
  } catch (error) {
    console.warn("[Roam India] Failed to save wishlist:", error);
    return false;
  }
}
