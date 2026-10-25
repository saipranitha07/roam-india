/**
 * Compact destination card used both in the home grid and the wishlist.
 * The heart doubles as the instant add/remove control.
 */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Destination } from "../types/destination";
import RemoteImage from "./RemoteImage";
import WishlistHeart from "./WishlistHeart";
import {
  cardShadow,
  colors,
  fontSize,
  radius,
  spacing,
} from "../constants/theme";

interface DestinationCardProps {
  destination: Destination;
  onPress: (destination: Destination) => void;
}

export default function DestinationCard({
  destination,
  onPress,
}: DestinationCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(destination)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${destination.name}`}
    >
      <View>
        <RemoteImage
          uri={destination.heroImage}
          fallbackLabel={destination.name}
          style={styles.image}
        />
        <View style={styles.categoryPill}>
          <Text style={styles.categoryPillText}>{destination.category}</Text>
        </View>
        <WishlistHeart
          destinationId={destination.id}
          style={styles.heart}
          size={15}
        />
      </View>
      <View style={styles.details}>
        <Text
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {destination.name}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons
            name="location-sharp"
            size={12}
            color={colors.primary}
          />
          <Text style={styles.location} numberOfLines={1}>
            {destination.state}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const cardWidth = "100%";

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.l,
    padding: spacing.s + 2,
    ...cardShadow,
  },
  image: {
    width: cardWidth, // stretched by the parent grid cell
    aspectRatio: 4 / 3.2,
    borderRadius: radius.m,
  },
  categoryPill: {
    position: "absolute",
    left: spacing.s,
    bottom: spacing.s,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryPillText: {
    fontSize: fontSize.small - 1,
    fontWeight: "700",
    color: colors.forest,
    letterSpacing: 0.2,
  },
  heart: {
    position: "absolute",
    right: spacing.s,
    top: spacing.s,
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  details: {
    paddingHorizontal: spacing.s,
    paddingTop: spacing.m,
    paddingBottom: spacing.xs,
  },
  name: {
    fontSize: fontSize.title,
    fontWeight: "700",
    color: colors.forest,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  location: {
    marginLeft: 3,
    fontSize: fontSize.small + 1,
    color: colors.gray,
    flexShrink: 1,
  },
});
