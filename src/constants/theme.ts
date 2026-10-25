/**
 * Design system for Roam India.
 * Everything visual refers back to these tokens so screens stay consistent.
 */

export const colors = {
  forest: "#173F35",
  primary: "#286B52",
  primarySoft: "#E7F0EB",
  cream: "#F8F6F0",
  white: "#FFFFFF",
  gray: "#777777",
  grayLight: "#AFAFA8",
  ink: "#1C2B25",
  accent: "#E99B55",
  accentSoft: "#FBEEDF",
  border: "#E7E2D6",
  danger: "#C4472F",
} as const;

export const spacing = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  s: 10,
  m: 14,
  l: 20,
  xl: 28,
  pill: 999,
} as const;

export const fontSize = {
  small: 12,
  body: 14,
  medium: 15,
  title: 17,
  heading: 20,
  display: 25,
  hero: 30,
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/** Soft, unified shadow used across cards and floating controls. */
export const cardShadow = {
  shadowColor: "#173F35",
  shadowOpacity: 0.14,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
  elevation: 4,
} as const;

/** Shadow for small floating buttons (hearts, back buttons). */
export const floatingShadow = {
  shadowColor: "#0B1F19",
  shadowOpacity: 0.35,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 6,
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
  cardShadow,
  floatingShadow,
};

export default theme;
