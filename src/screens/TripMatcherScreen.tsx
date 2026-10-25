/**
 * "Find My Trip" — preference-based destination matching (Enhancement B).
 *
 * Users pick travel style, trip length and budget; results are scored with
 * transparent local rules (see services/tripMatcher.ts) and update live.
 * The UI labels this explicitly as preference-based suggestions.
 */
import React, { useMemo, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  budgetOptions,
  durationOptions,
  matchDestinations,
} from "../services/tripMatcher";
import type {
  BudgetPreference,
  DurationPreference,
  MatchResult,
} from "../services/tripMatcher";
import type {
  Destination,
  DestinationCategory,
} from "../types/destination";
import type { RootStackParamList, TabParamList } from "../navigation/types";
import RemoteImage from "../components/RemoteImage";
import {
  cardShadow,
  colors,
  fontSize,
  radius,
  spacing,
} from "../constants/theme";

type TripMatcherScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "TripMatcher">,
  NativeStackScreenProps<RootStackParamList>
>;

const MARGIN = spacing.l;

const CATEGORY_OPTIONS: DestinationCategory[] = [
  "All",
  "Beaches",
  "Mountains",
  "Heritage",
  "Adventure",
];

function OptionChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.optionChip, selected ? styles.optionChipSelected : null]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text
        style={[
          styles.optionChipText,
          selected ? styles.optionChipTextSelected : null,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ResultCard({
  result,
  onPress,
}: {
  result: MatchResult;
  onPress: (destination: Destination) => void;
}) {
  const { destination, reasons } = result;
  return (
    <TouchableOpacity
      style={styles.resultCard}
      activeOpacity={0.9}
      onPress={() => onPress(destination)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${destination.name}`}
    >
      <RemoteImage
        uri={destination.heroImage}
        fallbackLabel={destination.name}
        style={styles.resultImage}
      />
      <View style={styles.resultBody}>
        <Text style={styles.resultName}>{destination.name}</Text>
        <Text style={styles.resultLocation}>{destination.state}</Text>
        <View style={styles.reasonRow}>
          {reasons.slice(0, 2).map((reason, index) => (
            <View key={reason} style={styles.reasonPill}>
              <Text style={styles.reasonText} numberOfLines={1}>
                {reason}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={colors.grayLight}
      />
    </TouchableOpacity>
  );
}

export default function TripMatcherScreen({
  navigation,
}: TripMatcherScreenProps) {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<DestinationCategory>("All");
  const [duration, setDuration] = useState<DurationPreference>("any");
  const [budget, setBudget] = useState<BudgetPreference>("any");

  // Re-computed live as preferences change — no hidden apply step.
  const matches = useMemo(
    () => matchDestinations({ category, duration, budget }).slice(0, 4),
    [category, duration, budget]
  );

  const isAnyPreferenceActive =
    category !== "All" || duration !== "any" || budget !== "any";

  const openDestination = useCallback(
    (destination: Destination) => {
      navigation.navigate("DestinationDetails", {
        destinationId: destination.id,
      });
    },
    [navigation]
  );

  const resetPreferences = () => {
    setCategory("All");
    setDuration("any");
    setBudget("any");
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.l }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Find My Trip</Text>
        <Text style={styles.subtitle}>
          Answer three simple questions and we will sort India for you.
        </Text>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>What kind of traveller are you?</Text>
          <View style={styles.optionsRow}>
            {CATEGORY_OPTIONS.map((option) => (
              <OptionChip
                key={option}
                label={option}
                selected={option === category}
                onPress={() => setCategory(option)}
              />
            ))}
          </View>
        </View>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>How long is the trip?</Text>
          <View style={styles.optionsRow}>
            {durationOptions.map((option) => (
              <OptionChip
                key={option.value}
                label={option.label}
                selected={option.value === duration}
                onPress={() => setDuration(option.value)}
              />
            ))}
          </View>
        </View>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>What's your budget feel?</Text>
          <View style={styles.optionsRow}>
            {budgetOptions.map((option) => (
              <OptionChip
                key={option.value}
                label={option.label}
                selected={option.value === budget}
                onPress={() => setBudget(option.value)}
              />
            ))}
          </View>
        </View>

        <View style={styles.resultsBlock}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {isAnyPreferenceActive
                ? "Suggestions for your preferences"
                : "Popular across India"}
            </Text>
            {isAnyPreferenceActive ? (
              <TouchableOpacity hitSlop={8} onPress={resetPreferences}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <Text style={styles.disclaimer}>
            Preference-based suggestions from the local destination list —
            transparent matching rules, not AI travel intelligence.
          </Text>

          {matches.map((match) => (
            <ResultCard
              key={match.destination.id}
              result={match}
              onPress={openDestination}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    paddingHorizontal: MARGIN,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.forest,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 3,
    fontSize: fontSize.body,
    color: colors.gray,
  },
  questionBlock: {
    marginTop: spacing.xl,
  },
  question: {
    fontSize: fontSize.medium,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: spacing.s + 2,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  optionChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    marginBottom: spacing.s,
  },
  optionChipSelected: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  optionChipText: {
    fontSize: fontSize.body,
    fontWeight: "600",
    color: colors.primary,
  },
  optionChipTextSelected: {
    color: colors.white,
  },
  resultsBlock: {
    marginTop: spacing.xl + 4,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: fontSize.heading,
    fontWeight: "700",
    color: colors.forest,
  },
  resetText: {
    fontSize: fontSize.body,
    fontWeight: "600",
    color: colors.primary,
  },
  disclaimer: {
    marginTop: spacing.xs + 2,
    marginBottom: spacing.l,
    fontSize: fontSize.small,
    lineHeight: 17,
    color: colors.grayLight,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.l,
    padding: spacing.s + 2,
    marginBottom: spacing.m,
    ...cardShadow,
  },
  resultImage: {
    width: 108,
    height: 86,
    borderRadius: radius.m,
  },
  resultBody: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
  resultName: {
    fontSize: fontSize.title - 1,
    fontWeight: "700",
    color: colors.forest,
  },
  resultLocation: {
    marginTop: 1,
    fontSize: fontSize.small + 1,
    color: colors.gray,
  },
  reasonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xs + 2,
  },
  reasonPill: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
    maxWidth: "100%",
  },
  reasonText: {
    fontSize: fontSize.small - 1,
    color: colors.primary,
    fontWeight: "600",
  },
});
