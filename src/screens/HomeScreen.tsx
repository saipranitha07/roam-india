/**
 * Home / Destination Discovery.
 *
 * Header + search, daily-rotating featured hero card, category chips and
 * the destination grid. Search and category state live in the shared
 * useDestinationFilters hook so filtering behaves identically everywhere.
 */
import React, { useCallback } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import destinations, { getFeaturedDestination } from "../data/destinations";
import { useDestinationFilters } from "../hooks/useDestinationFilters";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategoryChip";
import FeaturedCard from "../components/HeroCard";
import DestinationCard from "../components/DestinationCard";
import EmptyState from "../components/EmptyState";
import { SectionHeader } from "../components/SectionHeader";
import type { Destination } from "../types/destination";
import type { RootStackParamList, TabParamList } from "../navigation/types";
import { colors, fontSize, spacing } from "../constants/theme";

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

/** Consistent horizontal margin shared by header and grid. */
const MARGIN = spacing.l;
const CARD_GAP = spacing.l;

function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning, explorer";
  if (hour < 17) return "Good afternoon, explorer";
  return "Good evening, explorer";
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const {
    query,
    setQuery,
    clearQuery,
    category,
    setCategory,
    resetFilters,
    filtered,
    hasActiveFilters,
  } = useDestinationFilters(destinations);

  // Deterministic "featured for today" pick, derived from the real dataset.
  const featured = React.useMemo(() => getFeaturedDestination(), []);

  const openDestination = useCallback(
    (destination: Destination) => {
      // Details live on the root stack so they open over either tab.
      navigation.navigate("DestinationDetails", {
        destinationId: destination.id,
      });
    },
    [navigation]
  );

  const cellWidth =
    (Dimensions.get("window").width - MARGIN * 2 - CARD_GAP) / 2;

  const renderGridCard = useCallback(
    ({ item }: { item: Destination }) => (
      <View style={{ width: cellWidth, marginBottom: spacing.l }}>
        <DestinationCard destination={item} onPress={openDestination} />
      </View>
    ),
    [cellWidth, openDestination]
  );

  const gridTitle =
    query.trim().length > 0
      ? `Results for "${query.trim()}"`
      : category === "All"
      ? "Popular destinations"
      : `${category} destinations`;

  const header = (
    <View style={styles.headerBlock}>
      <View style={styles.brandRow}>
        <View style={styles.logoWrap}>
          <Ionicons name="compass" size={22} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.brandName}>Roam India</Text>
          <Text style={styles.brandTagline}>
            Find your next favourite place.
          </Text>
        </View>
      </View>

      <Text style={styles.greeting}>
        {greetingForHour(new Date().getHours())}
      </Text>
      <Text style={styles.greetingSub}>
        Where in India are you dreaming of today?
      </Text>

      <View style={styles.searchWrap}>
        <SearchBar value={query} onChangeText={setQuery} onClear={clearQuery} />
      </View>

      <View style={styles.heroBlock}>
        <SectionHeader title="Featured" subtitle="Hand-picked for today" />
        <FeaturedCard destination={featured} onPress={openDestination} />
      </View>

      <View style={styles.categoryBlock}>
        <CategorySelector selected={category} onSelect={setCategory} />
      </View>

      {filtered.length > 0 ? (
        <View style={styles.popularBlock}>
          <SectionHeader title={gridTitle} subtitle={`${filtered.length} ${filtered.length === 1 ? "place" : "places"}`} />
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.l }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        ListEmptyComponent={
          hasActiveFilters ? (
            <EmptyState
              icon="search-outline"
              title="No destinations found"
              message="We couldn't find a destination matching that. Try a different spelling, or reset the filters to browse everything."
              actionLabel="Reset filters"
              onAction={resetFilters}
            />
          ) : undefined
        }
        renderItem={renderGridCard}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: MARGIN }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  headerBlock: {
    paddingHorizontal: MARGIN,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.forest,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.m,
  },
  brandName: {
    fontSize: fontSize.heading,
    fontWeight: "800",
    color: colors.forest,
    letterSpacing: -0.3,
  },
  brandTagline: {
    fontSize: fontSize.small + 1,
    color: colors.gray,
  },
  greeting: {
    marginTop: spacing.xl,
    fontSize: fontSize.display - 1,
    fontWeight: "800",
    color: colors.forest,
    letterSpacing: -0.5,
  },
  greetingSub: {
    marginTop: 2,
    fontSize: fontSize.body,
    color: colors.gray,
  },
  searchWrap: {
    marginTop: spacing.l,
  },
  heroBlock: {
    marginTop: spacing.xl,
  },
  categoryBlock: {
    marginTop: spacing.m,
    // chips carry their own horizontal padding; pull them into the margin so
    // scrolling bleeds to the screen edge
    marginHorizontal: -MARGIN,
  },
  popularBlock: {
    marginTop: spacing.l,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
});
