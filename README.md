# Roam India 🇮🇳

**Find your next favourite place.**

Roam India is a polished travel discovery app for the **Travel Explorer India** assignment
(GDGC VNRVJIET — App Development). It helps users discover beautiful destinations across
India by category, search and save their favourites, with **14 real destinations**,
**56 real Wikimedia Commons photos bundled with the app**, and three fully working
screens plus a preference-based trip matcher.

Built with **React Native (Expo)** and **TypeScript**. No backend, no accounts — the
destination data and wishlist live entirely on the device.

---

## Features

- **Home discovery screen**
  - Branded header with a time-of-day greeting and a working search bar
  - Daily-rotating **featured destination** hero card (picked deterministically from the real dataset — "Explore destination" opens its details)
  - Horizontally scrollable category chips: **All / Beaches / Mountains / Heritage / Adventure**
  - Responsive two-column destination grid with photo, name, state, category and wishlist heart
- **Destination details**
  - Large hero image with overlaid back + wishlist controls
  - Description, **destination-specific** best-time-to-visit, highlights, trip duration, category and budget feel
  - **Popular attractions** — 3 per destination, each with its own matching photo and description
  - Travel tip callout and a **"View on Map"** button that opens Google Maps externally (no API key)
- **Wishlist**
  - Persistent via **AsyncStorage** — survives app restarts, synced across all screens
  - Instant add/remove from both the home screen and the details hero
  - Friendly empty state ("Your next adventure starts here.") with a one-tap jump to Explore
- **Search & filtering** (shared reusable hook)
  - Case-insensitive, trimmed, updates as you type, clear-on-tap
  - Search and category combine correctly (e.g. *Mountains* + *Manali*)
  - Friendly empty state with a "Reset filters" action
- **Find My Trip (optional Enhancement B)**
  - Pick travel style, trip length and budget feel; get transparent, rule-scored suggestions (labelled as preference-based suggestions, not AI travel intelligence)
- **"All" category always restores the full list** subject to the active query.

## Technology stack

| Area            | Choice                                        |
| --------------- | --------------------------------------------- |
| Framework       | Expo (SDK 58), React Native 0.88              |
| Language        | TypeScript (strict), React 19                 |
| Navigation      | React Navigation 7 (bottom tabs + native stack) |
| Icons           | `@expo/vector-icons` (Ionicons)               |
| Persistence     | `@react-native-async-storage/async-storage`   |
| Images          | Locally bundled photos (sourced from Wikimedia Commons), loading/fallback states |
| Gradients       | `expo-linear-gradient`                        |
| Maps            | External `google.com/maps/search` links via `Linking` (no API key) |

No backend, database server or authentication is used — the assignment permits
static local data, and the app (storage, photos and all) works completely offline.

## Project structure

```
roam-india/
├── index.ts                        # App entry — registers the root component
├── app.json                        # Expo configuration
├── tsconfig.json                   # Strict TypeScript config (extends expo base)
├── assets/
│   └── destinations/               # 56 bundled photos (built via scripts/)
├── docs/
│   ├── PHOTO-ATTRIBUTION.md        # Every photo's Commons origin + licence pointer
│   └── screenshots/                # Captured app screenshots
└── src/
    ├── App.tsx                     # Providers + root
    ├── components/
    │   ├── AttractionCard.tsx      # Attraction card (details screen, horizontal scroll)
    │   ├── CategoryChip.tsx        # Category chip + horizontal selector
    │   ├── DestinationCard.tsx     # Grid card (home & wishlist) with heart
    │   ├── EmptyState.tsx          # Search/wishlist empty states
    │   ├── HeroCard.tsx            # Featured hero card with gradient scrim
    │   ├── RemoteImage.tsx         # Asset/URL image w/ loading state + designed fallback
    │   ├── SearchBar.tsx           # Search input with clear button
    │   ├── SectionHeader.tsx       # Section title rows
    │   └── WishlistHeart.tsx       # Shared wishlist toggle control
    ├── constants/theme.ts          # Colors, spacing, radii, shadows (design system)
    ├── context/WishlistContext.tsx # Shared wishlist state + AsyncStorage hydration
    ├── data/destinations.ts        # 14 destinations, typed, single source of truth
    ├── hooks/useDestinationFilters.ts # Search + category filtering (shared logic)
    ├── navigation/
    │   ├── AppNavigator.tsx        # Tabs + native stack
    │   └── types.ts                # RootStackParamList / TabParamList
    ├── screens/
    │   ├── HomeScreen.tsx          # Discovery
    │   ├── DestinationDetailsScreen.tsx
    │   ├── WishlistScreen.tsx      # Saved destinations + empty state
    │   └── TripMatcherScreen.tsx   # Find My Trip preference matching
    ├── services/
    │   ├── storageService.ts       # AsyncStorage read/write (de-duped, safe)
    │   ├── mapsService.ts          # Google Maps search links
    │   └── tripMatcher.ts          # Transparent scoring rules for the matcher
    └── types/destination.ts        # Domain types
scripts/                             # Build-time photo curation helpers (not shipped)
```

### `src/data/images.ts` (photo registry)

Every screen resolves its photos through a generated key → asset registry
(`destinationImages`), so the dataset stays declarative and no screen ever
hard-codes asset paths. Photos are referenced as bundled asset modules
(`ImageRef = number | string`), with remote URLs still supported as a fallback
channel in `RemoteImage`.

## Photography

- All 56 photos (14 hero images + 42 attraction images) are **real photos of the
  real places**, sourced from [Wikimedia Commons](https://commons.wikimedia.org)
  and bundled into `assets/destinations/` (~18 MB).
- Why bundled? Wikimedia's CDN rejects the generic HTTP client user-agent used
  by React Native's image loader on Android (`HTTP 403`), and header overrides
  are unreliable in Expo Go. Local assets make the app **faster and fully
  offline-capable**, with zero runtime image-host dependency.
- Provenance tooling in `scripts/`: `picked-files.json` (key → Commons file
  map), `download-assets.mjs` (batch downloader with rate-limit backoff),
  `gen-attribution.mjs` (regenerates `docs/PHOTO-ATTRIBUTION.md`, which lists
  the Commons file page for every image — licences are stated on each page).

## Installation

```bash
# 1. Clone / copy the project, then install dependencies
npm install            # or: yarn

# 2. Start the Expo dev server
npm start              # or: npx expo start
```

Requires Node 18+ (Node 24 used during development). No `.env` file or API keys needed.

## Running on a device or emulator

- **Expo Go (quickest)** — install *Expo Go* on Android/iOS, then scan the QR code from
  `npm start`.
- **Android emulator** — with Android Studio installed: `npm run android`
- **iOS simulator** — with Xcode installed: `npm run ios`
- **Physical device** — same QR code flow; phone and computer must share a network
  (or use `--tunnel`: `npx expo start --tunnel`).

### Building a standalone APK (no Expo Go)

The project includes a native `android/` workspace (generated by `npx expo prebuild`),
so you can install Roam India as a regular app on an Android device or emulator —
it appears in the app drawer like any other app and runs fully standalone
(JavaScript bundle and all photos are embedded in the APK; no dev server needed):

```bash
npx expo run:android --variant release
```

The APK is also available at `android/app/build/outputs/apk/release/app-release.apk`
for sharing/sideloading. For development with hot reload, the dev variant is
`npx expo run:android` (no flags); it keeps a launcher icon but connects to Metro
(`npm start`).

## Local storage notes

- The wishlist is stored under the AsyncStorage key `roam-india.wishlist.v1` as a JSON
  array of destination ids.
- Ids are de-duplicated on every write, and the stored list is validated on read
  (non-strings and duplicates dropped) so corrupted or legacy data can never crash the app.
- Wishlist state hydrates **before** the navigator renders, so hearts never briefly show
  a wrong saved state.
- To reset storage: uninstall/reinstall or clear the app's data in Expo Go.

## Weather API note

The optional live-weather enhancement (Enhancement C) is intentionally **not implemented**:
it would require committing or injecting a private API key, and there are no credentials
available in this repo. The app instead shows honest, destination-specific **seasonal
guidance** ("Best time to visit"), clearly labelled as general travel guidance — no
fabricated live conditions. If you want live weather later, the natural hook is the
`coordinates` field already present on every destination.

## Screenshots

Captured from the running app on the Android emulator (Pixel 8, API 35):

| Screen               | Screenshot                              |
| -------------------- | --------------------------------------- |
| Home discovery       | `docs/screenshots/home.png`             |
| Destination details  | `docs/screenshots/details.png`          |
| Wishlist (persistent)| `docs/screenshots/wishlist.png`         |
| Find My Trip         | `docs/screenshots/trip-matcher.png`     |

> The ⚙️ button visible in the top-right of some shots is Expo Go's dev-menu
> button — it appears only while running through Expo Go during development,
> never in a production build.

## Validation performed

- `npx tsc --noEmit` — passes with no errors
- `npx expo-doctor` — **20/20 checks passed**
- `npx expo export --platform ios` and `--platform android` — full production bundle compiles
- **End-to-end verified on the Android emulator**: home grid renders correct
  photos per destination, search + category filtering, destination details with
  matching attraction photos, "View on Map" links, and Find My Trip results
- **Wishlist persistence proven on-device**: add to wishlist → force-kill the
  app → relaunch → the heart is still saved (AsyncStorage round-trip)

## Known limitations

- The bundled photo library adds ~18 MB to the repo/app size; the trade-off for
  fully offline, instant-loading photos with no third-party image dependency.
- All photos originate from Wikimedia Commons and follow its licence terms —
  see `docs/PHOTO-ATTRIBUTION.md` for the per-image file pages.
- "Budget" in Find My Trip is a transparent three-level feel (Economy / Mid-range /
  High-end) based on destination metadata — it is not live pricing, and the UI says so.
- The wishlist is device-local by design (no sync, no accounts — required by the
  no-backend constraint).
- Live weather is omitted for the reasons described above.
