/**
 * Wishlist screen — saved destinations, with instant add/remove and an
 * appealing empty state that routes back to Home.
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
import destinations from "../data/destinations";
import { useWishlist } from "../context/WishlistContext";
import DestinationCard from "../components/DestinationCard";
import EmptyState from "../components/EmptyState";
import type { Destination } from "../types/destination";
import type { RootStackParamList, TabParamList } from "../navigation/types";
import { colors, fontSize, spacing } from "../constants/theme";

type WishlistScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Wishlist">,
  NativeStackScreenProps<RootStackParamList>
>;

const MARGIN = spacing.l;
const CARD_GAP = spacing.l;

export default function WishlistScreen({ navigation }: WishlistScreenProps) {
  const insets = useSafeAreaInsets();
  const { savedIds, isHydrated } = useWishlist();

  // Map ids -> destinations; unknown ids (data changed between launches)
  // are skipped defensively so a stale id can never break the screen.
  const savedDestinations = React.useMemo(
    () =>
      savedIds
        .map((id) => destinations.find((d) => d.id === id))
        .filter((d): d is Destination => Boolean(d)),
    [savedIds]
  );

  const cellWidth =
    (Dimensions.get("window").width - MARGIN * 2 - CARD_GAP) / 2;

  const openDestination = useCallback(
    (destination: Destination) => {
      navigation.navigate("DestinationDetails", {
        destinationId: destination.id,
      });
    },
    [navigation]
  );

  const renderGridCard = useCallback(
    ({ item }: { item: Destination }) => (
      <View style={{ width: cellWidth, marginBottom: spacing.l }}>
        <DestinationCard destination={item} onPress={openDestination} />
      </View>
    ),
    [cellWidth, openDestination]
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.l }]}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>Your Wishlist</Text>
        <Text style={styles.subtitle}>
          {savedDestinations.length > 0
            ? `${savedDestinations.length} ${
                savedDestinations.length === 1 ? "place" : "places"
              } saved for later`
            : "Places you save live here, on this device."}
        </Text>
      </View>

      {!isHydrated ? (
        // Brief, quiet loading state while AsyncStorage hydrates — prevents
        // the empty state from flashing before saved items are known.
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Loading your wishlist…</Text>
        </View>
      ) : savedDestinations.length === 0 ? (
        <EmptyState
          icon="bookmarks-outline"
          title="Your next adventure starts here."
          message="Tap the heart on any destination to keep it here. Your wishlist is saved on this device and waits for you after you close the app."
          actionLabel="Explore Destinations"
          onAction={() => navigation.navigate("Home")}
        />
      ) : (
        <FlatList
          data={savedDestinations}
          keyExtractor={(item) => item.id}
          renderItem={renderGridCard}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: MARGIN,
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
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
    marginBottom: spacing.l,
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
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: fontSize.body,
    color: colors.gray,
  },
});
