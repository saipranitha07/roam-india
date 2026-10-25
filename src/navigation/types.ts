/**
 * Navigation structure:
 *   RootStack (native stack)
 *     ├─ Tabs (bottom tabs) — Home | Wishlist | TripMatcher
 *     └─ DestinationDetails — pushed over the tabs, with back navigation
 *
 * Details intentionally lives outside the tab navigator so there is no
 * duplicated route and the tab bar is hidden while reading a destination.
 */

export type RootStackParamList = {
  Tabs: undefined;
  DestinationDetails: { destinationId: string };
};

export type TabParamList = {
  Home: undefined;
  Wishlist: undefined;
  TripMatcher: undefined;
};

export type DestinationDetailsRoute = {
  destinationId: string;
};
