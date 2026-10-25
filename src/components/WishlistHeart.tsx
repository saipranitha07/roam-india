/**
 * Wishlist heart control.
 *
 * Wrapped around the shared wishlist context so Home, Details and the
 * Wishlist screen all share one source of truth and stay in sync.
 */
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWishlist } from "../context/WishlistContext";
import { colors, floatingShadow } from "../constants/theme";

interface WishlistHeartProps {
  destinationId: string;
  size?: number;
  /** Style applied to the circular glass background. */
  style?: ViewStyle;
}

export default function WishlistHeart({
  destinationId,
  size = 16,
  style,
}: WishlistHeartProps) {
  const { isSaved, toggleSaved, isHydrated } = useWishlist();
  const saved = isHydrated && isSaved(destinationId);

  return (
    <TouchableOpacity
      onPress={() => toggleSaved(destinationId)}
      hitSlop={8}
      activeOpacity={0.75}
      style={[styles.wrap, saved ? styles.saved : styles.unsaved, style]}
      accessibilityRole="button"
      accessibilityState={{ selected: saved }}
      accessibilityLabel={saved ? "Remove from wishlist" : "Save to wishlist"}
    >
      <Ionicons
        name={saved ? "heart" : "heart-outline"}
        size={size}
        color={saved ? colors.white : colors.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 32, 27, 0.45)",
    ...floatingShadow,
  },
  saved: {
    backgroundColor: colors.accent,
  },
  unsaved: {
    backgroundColor: "rgba(18, 32, 27, 0.45)",
  },
});
