"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  ids: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
  count: number;
  hydrated: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "cellucity-hub2-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (id): id is string => typeof id === "string"
          );
          // Hydrate after mount so server-rendered markup stays consistent.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setIds(valid);
        }
      }
    } catch {
      // Ignore malformed or unavailable storage.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage may be unavailable; the wishlist still works in-memory.
    }
  }, [ids, hydrated]);

  const toggleWishlist = (id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        ids,
        toggleWishlist,
        isWishlisted: (id) => ids.includes(id),
        clearWishlist: () => setIds([]),
        count: ids.length,
        hydrated,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
