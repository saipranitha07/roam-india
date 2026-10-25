/** Large featured destination card for the home screen hero section. */
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import type { Destination } from "../types/destination";
import RemoteImage from "./RemoteImage";
import WishlistHeart from "./WishlistHeart";
import { colors, fontSize, radius, spacing, cardShadow } from "../constants/theme";

interface FeaturedCardProps {
  destination: Destination;
  onPress: (destination: Destination) => void;
}

export default function FeaturedCard({
  destination,
  onPress,
}: FeaturedCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress(destination)}
      accessibilityRole="button"
      accessibilityLabel={`Explore ${destination.name}`}
    >
      <RemoteImage
        uri={destination.heroImage}
        fallbackLabel={destination.name}
        style={styles.image}
      />
      {/* Scrim for readable text over the photo */}
      <LinearGradient
        colors={["rgba(11,31,25,0.05)", "rgba(11,31,25,0.62)", "rgba(11,31,25,0.88)"]}
        style={StyleSheet.absoluteFill}
      />
      <WishlistHeart
        destinationId={destination.id}
        style={styles.heart}
        size={17}
      />

      <View style={styles.content}>
        <View style={styles.categoryWrapper}>
          <Ionicons
            name="sparkles-outline"
            size={13}
            color={colors.accent}
          />
          <Text style={styles.categoryText}>{destination.category}</Text>
        </View>
        <Text style={styles.name}>{destination.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#D9E4DF" />
          <Text style={styles.location}>{destination.state}</Text>
        </View>
        <Text style={styles.caption} numberOfLines={2}>
          {destination.heroCaption ?? destination.shortDescription}
        </Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={styles.cta}
            activeOpacity={0.85}
            onPress={() => onPress(destination)}
            accessibilityRole="button"
            accessibilityLabel={`Explore destination ${destination.name}`}
          >
            <Text style={styles.ctaText}>Explore destination</Text>
            <Ionicons name="arrow-forward" size={15} color={colors.forest} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/** Shared absolute-fill helper (RN 0.88 types no longer expose a spreadable one). */
const ABSOLUTE_FILL = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    overflow: "hidden",
    height: 330,
    backgroundColor: colors.forest,
    ...cardShadow,
  },
  image: {
    ...ABSOLUTE_FILL,
    borderRadius: radius.xl,
  },
  heart: {
    position: "absolute",
    right: spacing.l,
    top: spacing.l,
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.xl - 2,
  },
  categoryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryText: {
    marginLeft: 5,
    fontSize: fontSize.small,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.accent,
  },
  name: {
    fontSize: fontSize.hero,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: -0.4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    marginLeft: 4,
    fontSize: fontSize.body,
    color: "#D9E4DF",
    fontWeight: "500",
  },
  caption: {
    marginTop: spacing.s,
    fontSize: fontSize.body,
    lineHeight: 20,
    color: "rgba(255,255,255,0.85)",
  },
  ctaRow: {
    flexDirection: "row",
    marginTop: spacing.l,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: spacing.l + 4,
  },
  ctaText: {
    marginRight: 8,
    fontSize: fontSize.body,
    fontWeight: "700",
    color: colors.forest,
  },
});
