/**
 * Remote image with loading indicator and a designed, on-brand fallback.
 *
 * If the network fails or the URL breaks, the fallback (a forest-green
 * gradient with an image glyph and an optional label) is shown instead —
 * the app never exposes a broken-image state to the user.
 */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ImageRef } from "../types/destination";
import { colors, radius, fontSize } from "../constants/theme";

/** Remote or bundled asset source for photos. */
type ImageUri = ImageRef;

interface RemoteImageProps {
  /** Bundled asset number (from images registry) or an https URL. */
  uri: ImageUri;
  /** Text shown in the fallback (typically the place name). */
  fallbackLabel?: string;
  style?: ViewStyle;
  resizeMode?: "cover" | "contain" | "stretch";
}

/** Shared absolute-fill helper. */
const ABSOLUTE_FILL = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default function RemoteImage({
  uri,
  fallbackLabel,
  style,
  resizeMode = "cover",
}: RemoteImageProps) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset state whenever the source URI changes.
  useEffect(() => {
    setFailed(false);
    setLoading(true);
  }, [uri]);

  if (failed) {
    return (
      <View style={[styles.fallback, style]}>
        <Ionicons name="image-outline" size={30} color={colors.white} />
        {fallbackLabel ? (
          <Text style={styles.fallbackLabel}>{fallbackLabel}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={typeof uri === "number" ? uri : { uri }}
        style={{ width: "100%", height: "100%", objectFit: "cover" } as ImageStyle}
        resizeMode={resizeMode}
        fadeDuration={0}
        onLoadEnd={() => setLoading(false)}
        onError={(errorEvent) => {
          // Diagnosable via logcat (ReactNativeJS tag).
          console.log(
            "[RoamIndia] image error:",
            uri,
            JSON.stringify(errorEvent.nativeEvent)
          );
          setLoading(false);
          setFailed(true);
        }}
      />
      {loading ? (
        <View style={styles.loaderWrap} pointerEvents="none">
          <ActivityIndicator color={colors.white} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: radius.s,
    justifyContent: "center",
    alignItems: "center",
  },
  fallback: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: radius.s,
  },
  fallbackLabel: {
    marginTop: 8,
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 12,
  },
  loaderWrap: {
    ...ABSOLUTE_FILL,
    justifyContent: "center",
    alignItems: "center",
  },
});
