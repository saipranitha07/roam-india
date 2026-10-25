/** Friendly empty state used by search results and the wishlist. */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  fontSize,
  radius,
  spacing,
} from "../constants/theme";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = "compass-outline",
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={30} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={onAction}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl - 8,
  },
  iconWrap: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.l,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: "700",
    color: colors.forest,
    textAlign: "center",
  },
  message: {
    marginTop: spacing.s,
    fontSize: fontSize.body,
    lineHeight: 21,
    color: colors.gray,
    textAlign: "center",
    maxWidth: 280,
  },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.forest,
    borderRadius: 999,
    paddingVertical: 13,
    paddingHorizontal: spacing.xl + 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: fontSize.body,
  },
});
