/**
 * Root navigation: bottom tabs (Home / Wishlist / Find Trip) inside a
 * native stack, with DestinationDetails pushed over the tabs.
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import WishlistScreen from "../screens/WishlistScreen";
import TripMatcherScreen from "../screens/TripMatcherScreen";
import DestinationDetailsScreen from "../screens/DestinationDetailsScreen";
import type { RootStackParamList, TabParamList } from "./types";
import { colors } from "../constants/theme";

const Tabs = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

/** Outline icon when inactive; filled twin shown when the tab is focused. */
const TAB_ICONS: Record<keyof TabParamList, { outline: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }> = {
  Home: { outline: "map-outline", filled: "map" },
  Wishlist: { outline: "heart-outline", filled: "heart" },
  TripMatcher: { outline: "compass-outline", filled: "compass" },
};

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: "rgba(255,255,255,0.62)",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 0,
        },
        tabBarStyle: {
          backgroundColor: colors.forest,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 0,
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? TAB_ICONS[route.name].filled : TAB_ICONS[route.name].outline}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Wishlist" component={WishlistScreen} />
      <Tabs.Screen name="TripMatcher" options={{ title: "Find Trip" }} component={TripMatcherScreen} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Tabs" component={MainTabs} />
        <RootStack.Screen
          name="DestinationDetails"
          component={DestinationDetailsScreen}
          options={{
            // Full-screen push over the tabs; custom back button inside screen.
            animation: "slide_from_right",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
