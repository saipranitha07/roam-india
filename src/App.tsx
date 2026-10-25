/**
 * Roam India — Travel Explorer India (GDGC VNRVJIET assignment).
 *
 * Providers wrap the navigator. Wishlist hydration is awaited here so
 * saved-state hearts are correct from the very first frame.
 */
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <WishlistProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </WishlistProvider>
    </SafeAreaProvider>
  );
}
