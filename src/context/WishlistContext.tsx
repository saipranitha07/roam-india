/**
 * Shared wishlist state, synchronised across every screen and persisted
 * to AsyncStorage so it survives app restarts.
 *
 * Hydration happens before the navigator renders (the root App component
 * waits for `isHydrated`), so hearts never briefly show a wrong saved state.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  loadWishlistIds,
  saveWishlistIds,
} from "../services/storageService";

interface WishlistContextValue {
  savedIds: string[];
  /** True once AsyncStorage has been read for this launch. */
  isHydrated: boolean;
  isSaved: (destinationId: string) => boolean;
  toggleSaved: (destinationId: string) => void;
  removeSaved: (destinationId: string) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate once at startup from AsyncStorage.
  useEffect(() => {
    let cancelled = false;
    loadWishlistIds().then((ids) => {
      if (!cancelled) {
        setSavedIds(ids);
        setIsHydrated(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Persists the given list; storage errors are contained in the service. */
  const persist = useCallback((next: string[]) => {
    // The service de-dupes too, but keep the state itself clean here.
    setSavedIds(next);
    void saveWishlistIds(next);
  }, []);

  const toggleSaved = useCallback(
    (destinationId: string) => {
      setSavedIds((prev) => {
        // De-dupe: adding an id that is already stored is a no-op removal toggle.
        const exists = prev.includes(destinationId);
        const next = exists
          ? prev.filter((id) => id !== destinationId)
          : [...prev, destinationId];
        void saveWishlistIds(next);
        return next;
      });
    },
    []
  );

  const removeSaved = useCallback(
    (destinationId: string) => {
      persist(savedIds.filter((id) => id !== destinationId));
    },
    [persist, savedIds]
  );

  const clearWishlist = useCallback(() => {
    persist([]);
  }, [persist]);

  const isSaved = useCallback(
    (destinationId: string) => savedIds.includes(destinationId),
    [savedIds]
  );

  const value = useMemo(
    () => ({
      savedIds,
      isHydrated,
      isSaved,
      toggleSaved,
      removeSaved,
      clearWishlist,
      count: savedIds.length,
    }),
    [savedIds, isHydrated, isSaved, toggleSaved, removeSaved, clearWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
