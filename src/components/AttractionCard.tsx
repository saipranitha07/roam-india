/** Horizontally scrollable attraction cards (details screen). */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Attraction } from "../types/destination";
import RemoteImage from "./RemoteImage";
import { colors, fontSize, radius, spacing, cardShadow } from "../constants/theme";

export default function AttractionCard({
  attraction,
}: {
  attraction: Attraction;
}) {
  return (
    <View style={styles.card}>
      <RemoteImage
        uri={attraction.image}
        fallbackLabel={attraction.name}
        style={styles.image}
      />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {attraction.name}
        </Text>
        {attraction.description ? (
          <Text style={styles.description} numberOfLines={3}>
            {attraction.description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: colors.white,
    borderRadius: radius.l,
    padding: spacing.s + 2,
    marginRight: spacing.m,
    ...cardShadow,
  },
  image: {
    aspectRatio: 16 / 10,
    borderRadius: radius.m,
  },
  body: {
    paddingTop: spacing.m,
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  name: {
    fontSize: fontSize.title - 1,
    fontWeight: "700",
    color: colors.forest,
  },
  description: {
    marginTop: 4,
    fontSize: fontSize.small + 1,
    lineHeight: 17,
    color: colors.gray,
  },
});
