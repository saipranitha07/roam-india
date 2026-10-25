/** Horizontally scrollable category selector chips. */
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DestinationCategory } from "../types/destination";
import { colors, fontSize, spacing } from "../constants/theme";

/** Icon shown inside each chip (never as navigation, purely decorative). */
const CATEGORY_ICONS: Record<DestinationCategory, keyof typeof Ionicons.glyphMap> = {
  All: "globe-outline",
  Beaches: "sunny-outline",
  Mountains: "trail-sign-outline",
  Heritage: "business-outline",
  Adventure: "rocket-outline",
};

export const CATEGORY_OPTIONS: DestinationCategory[] = [
  "All",
  "Beaches",
  "Mountains",
  "Heritage",
  "Adventure",
];

interface CategoryChipProps {
  label: DestinationCategory;
  selected: boolean;
  onPress: () => void;
}

export function CategoryChip({ label, selected, onPress }: CategoryChipProps) {
  const icon = CATEGORY_ICONS[label];
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      hitSlop={4}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Show ${label} destinations`}
    >
      <Ionicons
        name={icon}
        size={15}
        color={selected ? colors.white : colors.primary}
      />
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function CategorySelector({
  selected,
  onSelect,
}: {
  selected: DestinationCategory;
  onSelect: (category: DestinationCategory) => void;
}) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {CATEGORY_OPTIONS.map((option) => (
          <CategoryChip
            key={option}
            label={option}
            selected={option === selected}
            onPress={() => onSelect(option)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginRight: spacing.s + 2,
  },
  chipSelected: {
    backgroundColor: colors.forest,
  },
  chipUnselected: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    marginLeft: 6,
    fontSize: fontSize.body,
    fontWeight: "600",
  },
  labelSelected: {
    color: colors.white,
  },
  labelUnselected: {
    color: colors.primary,
  },
});
