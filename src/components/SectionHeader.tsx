/**
 * Small reusable UI atoms used across screens.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize, spacing } from "../constants/theme";

/** Section title with an optional right-side action label. */
export function SectionHeader({
  title,
  actionLabel,
  onAction,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {actionLabel && onAction ? (
        <TouchableOpacity hitSlop={8} onPress={onAction}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: fontSize.heading,
    color: colors.forest,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    marginTop: 2,
    fontSize: fontSize.body,
    color: colors.gray,
  },
  sectionAction: {
    fontSize: fontSize.body,
    color: colors.primary,
    fontWeight: "600",
  },
});
