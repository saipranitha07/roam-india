/**
 * External Google Maps links — no API key required.
 *
 * Uses the universal Google Maps "search" URL scheme which opens the
 * installed Google Maps app on a device, or maps.google.com in a browser.
 */
import { Linking, Alert } from "react-native";
import type { Destination } from "../types/destination";

export function buildMapSearchUrl(destination: Destination): string {
  // Coordinates give an exact pin; the text fallback keeps the link readable
  // even if a destination has no coordinates set.
  if (destination.coordinates) {
    const { latitude, longitude } = destination.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }
  const query = `${destination.name}, ${destination.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Opens the external map link and shows a friendly alert if the device
 * cannot open it (no browser/maps app available). Returns whether opening
 * was initiated so callers do not need to re-implement error handling.
 */
export async function openDestinationOnMap(
  destination: Destination
): Promise<boolean> {
  const url = buildMapSearchUrl(destination);
  try {
    const supported = await Linking.canOpenURL(url);
    const openable = supported !== false; // treat "unknown" as openable
    if (!openable) {
      Alert.alert(
        "Unable to open map",
        "No maps application or browser could be opened on this device."
      );
      return false;
    }
    await Linking.openURL(url);
    return true;
  } catch (error) {
    console.warn("[Roam India] Failed to open map link:", error);
    Alert.alert(
      "Unable to open map",
      "Something went wrong while opening Google Maps. Please try again."
    );
    return false;
  }
}
