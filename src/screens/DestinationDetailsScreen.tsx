/**
 * Destination Details.
 *
 * Everything rendered here is driven by the destination id passed via the
 * route parameter and looked up in the shared dataset — there is no
 * duplicated or per-screen hardcoded content.
 */
import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getDestinationById } from "../data/destinations";
import RemoteImage from "../components/RemoteImage";
import WishlistHeart from "../components/WishlistHeart";
import AttractionCard from "../components/AttractionCard";
import { openDestinationOnMap } from "../services/mapsService";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import {
  cardShadow,
  colors,
  fontSize,
  radius,
  spacing,
} from "../constants/theme";

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DestinationDetails"
>;

/** Shared absolute-fill helper. */
const ABSOLUTE_FILL = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

/** Small labelled info tile in the quick-facts grid. */
function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoTile}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function labelForDuration(min?: number, max?: number): string {
  if (!min) return "3 days";
  if (max && max !== min) return `${min}–${max} days`;
  return `${min} day${min === 1 ? "" : "s"}`;
}

function labelForBudget(budget?: string): string | undefined {
  switch (budget) {
    case "Economy":
      return "Budget-friendly";
    case "Moderate":
      return "Mid-range";
    case "Premium":
      return "High-end";
    default:
      return undefined;
  }
}

export default function DestinationDetailsScreen({
  route,
  navigation,
}: DetailsScreenProps) {
  const insets = useSafeAreaInsets();

  const destination = getDestinationById(route.params.destinationId);

  const handleOpenMap = useCallback(() => {
    if (!destination) return;
    // Deliberately fire-and-observe: mapsService surfaces errors to the user.
    void openDestinationOnMap(destination);
  }, [destination]);

  if (!destination) {
    // Defensive: unknown id should never happen via internal navigation.
    return (
      <View style={[styles.screen, styles.missingWrap]}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.gray} />
        <Text style={styles.missingTitle}>Destination not found</Text>
        <TouchableOpacity
          style={styles.missingButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.missingButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Hero */}
      <View style={styles.hero}>
        <RemoteImage
          uri={destination.heroImage}
          fallbackLabel={destination.name}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={["rgba(10,25,20,0.55)", "rgba(10,25,20,0.12)", "rgba(10,25,20,0.72)"]}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={[
            styles.heroControls,
            { top: insets.top + spacing.s },
          ]}
        >
          <TouchableOpacity
            style={styles.glassButton}
            onPress={() => navigation.goBack()}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={22} color={colors.white} />
          </TouchableOpacity>
          <WishlistHeart destinationId={destination.id} size={18} />
        </View>

        <View style={styles.heroContent}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>
              {destination.category}
            </Text>
          </View>
          <Text style={styles.heroName}>{destination.name}</Text>
          <View style={styles.heroLocationRow}>
            <Ionicons name="location" size={14} color="#D9E4DF" />
            <Text style={styles.heroLocation}>{destination.state}, India</Text>
          </View>
        </View>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>{destination.description}</Text>

        <View style={styles.quickFactsRow}>
          <InfoTile
            label="Best time to visit"
            value={destination.bestTimeToVisit}
          />
          <InfoTile
            label="Ideal duration"
            value={labelForDuration(destination.idealDays, destination.maxIdealDays)}
          />
        </View>
        <View style={styles.quickFactsRow}>
          <InfoTile
            label="Travel style"
            value={`${destination.category} trip`}
          />
          {destination.budget ? (
            <InfoTile
              label="Typical budget"
              value={labelForBudget(destination.budget) ?? destination.budget}
            />
          ) : null}
        </View>

        {destination.highlights?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {destination.highlights.map((highlight) => (
              <View key={highlight} style={styles.highlightRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={colors.primary}
                  style={styles.highlightIcon}
                />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular attractions</Text>
            <Text style={styles.sectionHint}>Scroll for more</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attractionsScroll}
            keyboardShouldPersistTaps="handled"
          >
            {destination.attractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </ScrollView>
        </View>

        {destination.travelTip ? (
          <View style={styles.tipCard}>
            <View style={styles.tipIconWrap}>
              <Ionicons name="bulb-outline" size={20} color={colors.forest} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipLabel}>Travel tip</Text>
              <Text style={styles.tipText}>{destination.travelTip}</Text>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.mapButton}
          activeOpacity={0.85}
          onPress={handleOpenMap}
          accessibilityRole="button"
          accessibilityLabel={`View ${destination.name} on Google Maps`}
        >
          <Ionicons name="map-outline" size={18} color={colors.white} />
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  hero: {
    height: 340,
    backgroundColor: colors.forest,
  },
  heroImage: {
    ...ABSOLUTE_FILL,
  },
  heroControls: {
    position: "absolute",
    left: spacing.l,
    right: spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  glassButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(18, 32, 27, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.l + 4,
    paddingBottom: spacing.l + 6,
  },
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: spacing.s,
  },
  categoryChipText: {
    fontSize: fontSize.small - 1,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.forest,
  },
  heroName: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: -0.5,
  },
  heroLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  heroLocation: {
    marginLeft: 4,
    fontSize: fontSize.body,
    color: "#D9E4DF",
    fontWeight: "500",
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.l + 4,
    paddingBottom: spacing.xxxl,
  },
  description: {
    fontSize: fontSize.medium,
    lineHeight: 23,
    color: colors.ink,
  },
  quickFactsRow: {
    flexDirection: "row",
    gap: spacing.m,
    marginTop: spacing.l,
  },
  infoTile: {
    flex: 1,
    backgroundColor: "#EDEAE1",
    borderRadius: radius.m,
    padding: spacing.m,
  },
  infoLabel: {
    fontSize: fontSize.small - 1,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.primary,
  },
  infoValue: {
    marginTop: 4,
    fontSize: fontSize.small + 2,
    fontWeight: "600",
    color: colors.forest,
    lineHeight: 18,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: fontSize.heading,
    fontWeight: "700",
    color: colors.forest,
  },
  sectionHint: {
    fontSize: fontSize.small,
    color: colors.grayLight,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.s + 2,
  },
  highlightIcon: {
    marginRight: spacing.s + 2,
  },
  highlightText: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.ink,
  },
  attractionsScroll: {
    paddingRight: spacing.l,
  },
  tipCard: {
    flexDirection: "row",
    marginTop: spacing.xl,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.l,
    padding: spacing.m + 2,
  },
  tipIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.m,
  },
  tipLabel: {
    fontSize: fontSize.small + 1,
    fontWeight: "700",
    color: colors.forest,
  },
  tipText: {
    marginTop: 2,
    fontSize: fontSize.body,
    lineHeight: 20,
    color: "#5C4A38",
  },
  mapButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xl,
    backgroundColor: colors.forest,
    borderRadius: 999,
    paddingVertical: 15,
    ...cardShadow,
  },
  mapButtonText: {
    marginLeft: spacing.s,
    color: colors.white,
    fontWeight: "700",
    fontSize: fontSize.medium,
  },
  missingWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  missingTitle: {
    marginTop: spacing.m,
    fontSize: fontSize.heading,
    fontWeight: "700",
    color: colors.forest,
  },
  missingButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.forest,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
  },
  missingButtonText: {
    color: colors.white,
    fontWeight: "700",
  },
});
