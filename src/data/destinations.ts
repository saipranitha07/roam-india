/**
 * Single source of truth for destination data.
 *
 * Photography: real photos sourced from Wikimedia Commons and bundled
 * locally into assets/destinations (registered in src/data/images.ts).
 * Bundling avoids runtime image-host dependency — the app works offline
 * and every photo was verified to correspond to its destination
 * (see scripts/ for provenance tools).
 */
import { destinationImages as images } from "./images";
import type {
  Attraction,
  Destination,
  ImageRef,
} from "../types/destination";

const attraction = (
  id: string,
  name: string,
  image: ImageRef,
  description?: string
): Attraction => ({ id, name, image, description });

const dest = (d: Destination) => d;

const destinations: Destination[] = [
  dest({
    id: "goa",
    name: "Goa",
    state: "Goa",
    category: "Beaches",
    shortDescription:
      "Golden sands, Portuguese lanes and legendary sunsets — India's beloved beach state.",
    description:
      "Goa packs more coastline charm into one small state than most countries manage. Long palm-fringed beaches run from the buzz of the north to the slow, sailboat-dotted coves of the south, while old Latin-quarter lanes, whitewashed churches and spice-scented plantation roads tell a 450-year Portuguese story. Days here drift between beach shacks, scooter rides through rice fields and long seafood dinners by the water.",
    bestTimeToVisit: "November to February",
    heroImage: images.goa_hero,
    attractions: [
      attraction(
        "palolem",
        "Palolem Beach",
        images.goa_hero,
        "A wide, calm crescent in South Goa lined with thatched huts and kayaks."
      ),
      attraction(
        "basilica-bom-jesus",
        "Basilica of Bom Jesus",
        images.goa_basilica,
        "A UNESCO-listed baroque basilica in Old Goa, holding the relics of St. Francis Xavier."
      ),
      attraction(
        "dudhsagar",
        "Dudhsagar Falls",
        images.goa_dudhsagar,
        "A four-tiered waterfall thundering 300 m down the Western Ghats on the Karnataka border."
      ),
    ],
    highlights: [
      "Beach-hopping from Baga in the north to Palolem in the south",
      "Latin quarters and centuries-old churches in Fontainhas",
      "Fishing-village seafood and beach-shack sunsets",
    ],
    idealDays: 4,
    maxIdealDays: 5,
    budget: "Moderate",
    travelTip:
      "Rent a scooter for a day or two — Goa's best coves, cafes and forts sit only a short ride apart.",
    coordinates: { latitude: 15.0108, longitude: 74.0234 },
    heroCaption: "Golden sands and slower days await on the Konkan coast.",
    featured: true,
  }),
  dest({
    id: "gokarna",
    name: "Gokarna",
    state: "Karnataka",
    category: "Beaches",
    shortDescription:
      "A slow temple town on the coast, famous for crescent coves linked by cliff trails.",
    description:
      "Gokarna is where Karnataka's coast keeps things simple. A working temple town built around centuries-old traditions, it looks out over a chain of picture-perfect coves — Om, Kudle, Half Moon and Paradise — stitched together by one of India's most beautiful coastal walks. Cafes hang driftwood lanterns over the sand, and the day's biggest decision is which sunset ledge to settle into.",
    bestTimeToVisit: "October to March",
    heroImage: images.gokarna_hero,
    attractions: [
      attraction(
        "om-beach",
        "Om Beach",
        images.gokarna_om,
        "Named for the giant 'Om' shape its shoreline curls into — calm mornings, hammocks and shade."
      ),
      attraction(
        "mahabaleshwar-temple",
        "Mahabaleshwar Temple",
        images.gokarna_mahabaleshwar,
        "A centuries-old Shiva temple at the heart of town, the spiritual anchor of Gokarna."
      ),
      attraction(
        "kudle-beach",
        "Kudle Beach",
        images.gokarna_kudle,
        "A wide, laid-back curve of sand with clifftop cafes and golden evening light."
      ),
    ],
    highlights: [
      "Cove-to-cove trek along the coastal cliff path",
      "Driftwood cafes right on the sand",
      "A living temple town with deep festival traditions",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Economy",
    travelTip:
      "Pack light — the shoreline trek between beaches is far easier with a small daypack than with rolling luggage.",
    coordinates: { latitude: 14.5518, longitude: 74.3237 },
    heroCaption: "Crescent coves connected by one unforgettable cliff walk.",
    featured: true,
  }),
  dest({
    id: "varkala",
    name: "Varkala",
    state: "Kerala",
    category: "Beaches",
    shortDescription:
      "Kerala's red-cliff coast, where cafés balance over a golden sea below.",
    description:
      "Varkala is Kerala with the volume gently turned down. A dramatic laterite cliff runs along the Arabian Sea, stacked with cafés, yoga terraces and sunset lookouts, while a broad golden beach sweeps below. Pilgrims come to Papanasam beach for sacred dips, travellers come for the cliff walks — and almost everyone stays longer than planned.",
    bestTimeToVisit: "October to March",
    heroImage: images.varkala_hero,
    attractions: [
      attraction(
        "papanasam-beach",
        "Papanasam Beach",
        images.varkala_papanasam,
        "A sacred stretch of sand where pilgrims bathe to honour ancestors, beside a natural spring."
      ),
      attraction(
        "varkala-cliff",
        "The Varkala Cliff",
        images.varkala_sun,
        "The famous red-laterite ledge stacked with cafés, ayurvedic stalls and sunset terraces."
      ),
      attraction(
        "janardanaswamy-temple",
        "Janardanaswamy Temple",
        images.varkala_janardhana,
        "A 2,000-year-old Vishnu temple that gives the town its spiritual heartbeat."
      ),
    ],
    highlights: [
      "Clifftop café strip with sea-view breakfasts",
      "Sacred spring and rituals at Papanasam",
      "Ayurvedic treatments and yoga sessions",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Moderate",
    travelTip:
      "Walk the full length of the cliff at sunset — every bend opens onto a new sea-view terrace worth stopping at.",
    coordinates: { latitude: 8.7379, longitude: 76.7163 },
    heroCaption: "Cafés on a red cliff, surf on golden sand below.",
    featured: true,
  }),
  dest({
    id: "puducherry",
    name: "Puducherry",
    state: "Puducherry",
    category: "Beaches",
    shortDescription:
      "A pocket of French India — mustard villas, promenade mornings and surf beaches.",
    description:
      "Puducherry (Pondicherry) is a small coastal union territory with an outsized charm. Bougainvillea-draped Tamil houses sit beside mustard-yellow French villas in White Town, a granite promenade faces the Bay of Bengal, and a short ride inland sits Auroville's golden meditation dome. It is one of India's great walking towns — best explored slowly, on foot or a rented bicycle.",
    bestTimeToVisit: "October to March",
    heroImage: images.pondicherry_hero,
    attractions: [
      attraction(
        "rock-beach",
        "Rock Beach Promenade",
        images.pondicherry_rockbeach,
        "The car-free seaside promenade along White Town, at its best in the early morning."
      ),
      attraction(
        "matrimandir",
        "Matrimandir, Auroville",
        images.pondicherry_auroville,
        "The solar-powered golden meditation dome at the heart of Auroville's universal township."
      ),
      attraction(
        "paradise-beach",
        "Paradise Beach",
        images.pondicherry_paradise,
        "A boat-accessed sandbar between the sea and the backwaters, near the Chunnambar estuary."
      ),
    ],
    highlights: [
      "Heritage walks through the French and Tamil quarters",
      "Seaside cycling past the old lighthouse",
      "Auroville's experimental township and bakeries",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Moderate",
    travelTip:
      "Rent a bicycle in White Town — the heritage lanes and the promenade are flat and best experienced at cycling pace.",
    coordinates: { latitude: 11.9338, longitude: 79.8295 },
    heroCaption: "French flair on the Bay of Bengal.",
    featured: true,
  }),
  dest({
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Mountains",
    shortDescription:
      "A pine-scented Himalayan valley town under snow peaks, with adventure on its doorstep.",
    description:
      "Manali sits high in the Kullu valley where the Beas river runs cold and the deodar forests climb steeply to snow peaks. Old Manali's wooden cafés and apple orchards give it warmth, while Solang's meadows and the road toward Rohtang give it thrill. It works equally well as a snow-play winter base and a summer mountain escape.",
    bestTimeToVisit: "October to June (Dec–Feb for snow)",
    heroImage: images.manali_hero,
    attractions: [
      attraction(
        "solang-valley",
        "Solang Valley",
        images.manali_solang,
        "Winter ski slopes and summer paragliding meadows, just a short drive from town."
      ),
      attraction(
        "hidimba-temple",
        "Hidimba Devi Temple",
        images.manali_hadimba,
        "A centuries-old wooden pagoda temple hidden deep in a deodar forest."
      ),
      attraction(
        "rohtang-pass",
        "Rohtang Pass",
        images.manali_rohtang,
        "A high pass toward Lahaul that holds snow into early summer, best reached early in the day."
      ),
    ],
    highlights: [
      "Riverside cafés and wooden pagoda architecture",
      "Paragliding, skiing and snow-play in Solang",
      "Gateway toward Spiti and the Lahaul valleys",
    ],
    idealDays: 4,
    maxIdealDays: 5,
    budget: "Moderate",
    travelTip:
      "If you plan a Solang or Rohtang drive, book transport the evening before and start early — traffic builds as the day warms.",
    coordinates: { latitude: 32.2432, longitude: 77.1892 },
    heroCaption: "Snow peaks, pinewood air and riverside cafés.",
    featured: true,
  }),
  dest({
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    category: "Mountains",
    shortDescription:
      "Endless emerald tea gardens stitched across the Western Ghats.",
    description:
      "Munnar is Kerala's aromatic hill station, where manicured tea gardens fold over ridge after ridge and the smell of fresh leaf hangs in the cool air. Mornings bring mist through the valleys, afternoons bring national-park treks and viewpoints, and every winding road seems to end at another impossibly green slope.",
    bestTimeToVisit: "September to May",
    heroImage: images.munnar_hero,
    attractions: [
      attraction(
        "eravikulam",
        "Eravikulam National Park",
        images.munnar_eravikulam,
        "Protected grassland slopes that are home to the rare Nilgiri tahr mountain goat."
      ),
      attraction(
        "echo-point",
        "Echo Point",
        images.munnar_echo,
        "A misty lakeside viewpoint where calls come back across the water."
      ),
      attraction(
        "kolukkumalai",
        "Kolukkumalai",
        images.munnar_kolukkumalai,
        "One of the world's highest tea estates, famous for watching sunrise above the cloud line."
      ),
    ],
    highlights: [
      "Tea tasting and factory visits on working estates",
      "Misty viewpoints and waterfall stops",
      "Treks through shola forest and tahr country",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Moderate",
    travelTip:
      "Kolukkumalai's sunrise drive leaves around 4 am — carry a warm layer even in summer; the heights stay cold.",
    coordinates: { latitude: 10.0889, longitude: 77.0595 },
    heroCaption: "The smell of fresh tea on every breeze.",
    featured: true,
  }),
  dest({
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    category: "Mountains",
    shortDescription:
      "Toy-train tracks and tea terraces facing the white wall of Kanchenjunga.",
    description:
      "Darjeeling climbs steep and romantic above Bengal's plains — a colonial-era hill town of toy-train whistles, tea terraces and monastery flags, where the world's third-highest mountain, Kanchenjunga, fills the entire eastern horizon. Mornings at Tiger Hill, afternoons in tea cupping rooms and evenings wrapped in warm blankets happen by design here.",
    bestTimeToVisit: "March to May & October to December",
    heroImage: images.darjeeling_hero,
    attractions: [
      attraction(
        "toy-train",
        "Darjeeling Toy Train",
        images.darjeeling_train,
        "The UNESCO-listed Himalayan Railway steaming through town and tea estates since 1881."
      ),
      attraction(
        "tiger-hill",
        "Tiger Hill",
        images.darjeeling_tigerhill,
        "The pre-dawn viewpoint where sunrise paints Kanchenjunga from grey to gold."
      ),
      attraction(
        "tea-plantations",
        "Tea Plantations",
        images.darjeeling_tea,
        "Slopes of the famous 'champagne of teas', still picked by hand on terraced gardens."
      ),
    ],
    highlights: [
      "Rides on the World-Heritage Himalayan Railway",
      "Kanchenjunga panoramas on clear mornings",
      "First-flush tea straight from estate cupping rooms",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Moderate",
    travelTip:
      "Book the heritage steam ride and a Tiger Hill jeep tour a day ahead in season — morning slots fill quickly.",
    coordinates: { latitude: 27.041, longitude: 88.2663 },
    heroCaption: "A sunrise that turns a mountain gold.",
    featured: true,
  }),
  dest({
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    shortDescription:
      "The Pink City — honeycomb palaces, hilltop forts and bazaars of block print.",
    description:
      "Jaipur is Rajasthan's rose-hued capital and one of India's great planned cities of the 18th century. Hawa Mahal's honeycomb facade, Amber's ramparts, observatory instruments and courtyard palaces keep traditional craft alive — block prints, blue pottery and gems — while rooftop cafés watch the Aravalli hills catch the evening light.",
    bestTimeToVisit: "October to March",
    heroImage: images.jaipur_hero,
    attractions: [
      attraction(
        "amber-fort",
        "Amber Fort",
        images.jaipur_amber,
        "A honey-gold hilltop fort with mirrored halls and broad rampart views over Maota Lake."
      ),
      attraction(
        "city-palace",
        "City Palace",
        images.jaipur_citypalace,
        "The royal residence still occupied by Jaipur's royal family, full of courtyards and gates."
      ),
      attraction(
        "jantar-mantar",
        "Jantar Mantar",
        images.jaipur_jantar,
        "A UNESCO-listed 18th-century observatory of giant masonry astronomical instruments."
      ),
    ],
    highlights: [
      "Hawa Mahal's portrait-perfect window lattice",
      "Block-print workshops and Johari Bazaar shopping",
      "Rooftop and rampart views over the old city walls",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Moderate",
    travelTip:
      "Explore the old-city bazaars on foot in the morning, then save Amber Fort for late afternoon light — it glows.",
    coordinates: { latitude: 26.9124, longitude: 75.7873 },
    heroCaption: "Palaces in pink under the noon sun.",
    featured: true,
  }),
  dest({
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    category: "Heritage",
    shortDescription:
      "A boulder-strewn plain where the Vijayanagara empire sleeps among banana groves.",
    description:
      "Hampi is one of the most surreal landscapes in India — the ruin city of the Vijayanagara empire scattered across a plain of giant granite boulders, coconut palms and the slow Tungabhadra river. Temple complexes take days to absorb, sunrise viewpoints give the whole valley away at once, and round coracle boats still ferry travellers across the white water.",
    bestTimeToVisit: "October to February",
    heroImage: images.hampi_hero,
    attractions: [
      attraction(
        "vittala-temple",
        "Vittala Temple",
        images.hampi_vittala,
        "Home of the iconic stone chariot and musical pillars — Hampi's most recognised sight."
      ),
      attraction(
        "matanga-hill",
        "Matanga Hill",
        images.hampi_matanga,
        "The pre-dawn climb to see sunrise spill over the ruined capital and boulder fields."
      ),
      attraction(
        "tungabhadra-coracle",
        "Coracle on the Tungabhadra",
        images.hampi_river,
        "Round hide-and-bamboo boats that cross the river the way locals always have."
      ),
    ],
    highlights: [
      "World-Heritage temple complexes spread over kilometres",
      "Sunrise and sunset viewpoints above the boulder sea",
      "Rustic riverside cafés separated by the river ferry",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Economy",
    travelTip:
      "Hire a bicycle or scooter in Hampi Bazaar for the day — distances between monuments are long and the light keeps changing.",
    coordinates: { latitude: 15.335, longitude: 76.462 },
    heroCaption: "Ruins of an empire among the boulders.",
    featured: true,
  }),
  dest({
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    category: "Heritage",
    shortDescription:
      "Home of the Taj Mahal and the Mughal Yamuna-fort story along the river.",
    description:
      "Agra was the Mughal capital for nearly a century, and its riverfront tells that whole story — from the red-sandstone Agra Fort towering above the Yamuna to mirrored riverside gardens. At its heart stands the Taj Mahal, the marble mausoleum Shah Jahan built for Mumtaz Mahal, which every year still outperforms every expectation of 'the world's most famous building'.",
    bestTimeToVisit: "October to March",
    heroImage: images.agra_hero,
    attractions: [
      attraction(
        "agra-fort",
        "Agra Fort",
        images.agra_fort,
        "A walled Mughal city of courtyards, marble pavilions and Yamuna ramparts."
      ),
      attraction(
        "itimad-ud-daulah",
        "Itimad-ud-Daulah Tomb",
        images.agra_baby_taj,
        "The so-called 'Baby Taj' — the first all-marble Mughal tomb, delicate and self-contained."
      ),
      attraction(
        "mehtab-bagh",
        "Mehtab Bagh",
        images.agra_mehtab,
        "A Yamuna riverside garden facing the Taj — the classic sunset silhouette view."
      ),
    ],
    highlights: [
      "The Taj Mahal at first light, before the day crowds",
      "Mughal fort ramparts overlooking the river",
      "Panchhi-petha street sweets and marble inlay craft",
    ],
    idealDays: 2,
    maxIdealDays: 2,
    budget: "Moderate",
    travelTip:
      "Reach the Taj gates at opening time for the lightest crowds, then cross the river at dusk for the Mehtab Bagh silhouette.",
    coordinates: { latitude: 27.1751, longitude: 78.0421 },
    heroCaption: "Marble that changes colour with the sky.",
    featured: true,
  }),
  dest({
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    category: "Adventure",
    shortDescription:
      "White-water, ashrams and aarti on the banks of a loud young Ganga.",
    description:
      "Rishikesh is where the Ganga arrives young and loud from the Himalayas. Suspension bridges, temple bells and yoga schools climb the forested banks, while upstream the river's rapids make it India's white-water capital. Days split naturally between ashram mornings, rafting runs and the great lamp-lit aarti at Triveni Ghat.",
    bestTimeToVisit: "September to November & March to May",
    heroImage: images.rishikesh_hero,
    attractions: [
      attraction(
        "triveni-ghat",
        "Triveni Ghat Aarti",
        images.rishikesh_triveni,
        "The evening lamp ceremony to the Ganga, best seen from the steps among the crowd."
      ),
      attraction(
        "river-rafting",
        "River Rafting",
        images.rishikesh_rafting,
        "Long white-water runs on Grade II-IV rapids departing from the upper river stretches."
      ),
      attraction(
        "ram-jhula",
        "Ram Jhula",
        images.rishikesh_ramjhula,
        "A suspension footbridge connecting temple banks, usually dotted with langur monkeys."
      ),
    ],
    highlights: [
      "Grade III-IV white-water on long rafting runs",
      "Evening Ganga aarti at the river ghats",
      "Yoga, meditation and forested ashram walks",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Economy",
    travelTip:
      "Rafting runs upriver towards Marine Drive offer the longest rapids — book morning slots when the water is liveliest.",
    coordinates: { latitude: 30.0869, longitude: 78.2676 },
    heroCaption: "Rapids by day, temple bells by night.",
    featured: true,
  }),
  dest({
    id: "bir-billing",
    name: "Bir Billing",
    state: "Himachal Pradesh",
    category: "Adventure",
    shortDescription:
      "World-class paragliding thermals above a quiet Tibetan valley.",
    description:
      "Bir is a small, unhurried valley town in Himachal's Kangra district, famous for two things: the monasteries of its Tibetan settlement, and the thermals rising from the Billing takeoff ridge above it. Pilots launch from Billing and land in Bir's tea-garden meadows along one of the world's best-regarded paragliding sites, while days without flights fill with monastery visits, chai and slow forest walks.",
    bestTimeToVisit: "March to June & October to November",
    heroImage: images.bir_hero,
    attractions: [
      attraction(
        "paragliding",
        "Paragliding at Billing",
        images.bir_takeoff,
        "Tandem flights launch from the Billing ridge and soar down over the valley to Bir."
      ),
      attraction(
        "chokling-monastery",
        "Chokling Monastery",
        images.bir_monastery,
        "A living Tibetan monastery with prayer wheels, butter lamps and soft valley light."
      ),
      attraction(
        "landing-meadows",
        "Valley Landing Meadows",
        images.bir_view,
        "Tea-garden and pine slopes where paragliders set down and the Dhauladhars loom above."
      ),
    ],
    highlights: [
      "Tandem paragliding from Billing's takeoff ridge",
      "Tibetan monasteries and prayer-wheel walks",
      "Slow café culture in the pine-fringed valley",
    ],
    idealDays: 3,
    maxIdealDays: 3,
    budget: "Economy",
    travelTip:
      "Flights depend on wind — aim for a morning slot and keep a spare afternoon in case the first slot is weathered out.",
    coordinates: { latitude: 32.0342, longitude: 76.717 },
    heroCaption: "Run down a ridge, land in the clouds.",
    featured: true,
  }),
  dest({
    id: "auli",
    name: "Auli",
    state: "Uttarakhand",
    category: "Adventure",
    shortDescription:
      "Meadow ski slopes under the great towers of the Garhwal Himalaya.",
    description:
      "Auli is a high meadow saddle above Joshimath turned ski resort, ringed by oak forests and framed by Nanda Devi and the great peaks of the Garhwal Himalaya. In winter it holds some of India's most reliable snowplay, with a long cable-car lift up the mountainside; in summer the same slopes turn into alpine meadow walks toward Gorson and Kuari Pass.",
    bestTimeToVisit: "Dec–Feb for snow, Mar–Jun for meadows",
    heroImage: images.auli_hero,
    attractions: [
      attraction(
        "ski-slopes",
        "Auli Ski Slopes",
        images.auli_ski,
        "Wide groomed slopes and ski lifts serving winter beginners and professionals alike."
      ),
      attraction(
        "gorson-bugyal",
        "Gorson Bugyal",
        images.auli_gorson,
        "A high alpine meadow walk from Auli, opening onto one of the Himalaya's great peak vistas."
      ),
      attraction(
        "auli-ropeway",
        "Auli Ropeway",
        images.auli_ropeway,
        "A long cable-car ride that lifts you from Joshimath to the meadows above the tree line."
      ),
    ],
    highlights: [
      "India's most accessible Himalayan ski slopes",
      "The long Joshimath-Auli cable-car ascent",
      "Alpine meadow treks with Nanda Devi in view",
    ],
    idealDays: 4,
    maxIdealDays: 5,
    budget: "Moderate",
    travelTip:
      "Ski gear and instructors are available on the meadow itself, but slopes close early in winter light — get up the mountain before noon.",
    coordinates: { latitude: 30.5239, longitude: 79.564 },
    heroCaption: "Ski meadows beneath Himalayan giants.",
    featured: true,
  }),
  dest({
    id: "ladakh",
    name: "Ladakh",
    state: "Ladakh (Union Territory)",
    category: "Adventure",
    shortDescription:
      "A high-altitude desert of turquoise lakes, passes and thousand-year monasteries.",
    description:
      "Ladakh is the dry, high desert of the trans-Himalaya — turquoise lakes that change colour hourly, moonscape passes above 5000 m, whitewashed monasteries stacked into cliffs, and poplar-shaded villages under the deepest skies in India. Journeys here are measured in days and acclimatisation, rewarded with landscapes that nothing else in the subcontinent quite matches.",
    bestTimeToVisit: "May to September",
    heroImage: images.ladakh_hero,
    attractions: [
      attraction(
        "pangong-tso",
        "Pangong Tso",
        images.ladakh_hero,
        "A vast high-altitude lake whose blues shift through the day across the Changthang plain."
      ),
      attraction(
        "thiksey-monastery",
        "Thiksey Monastery",
        images.ladakh_thiksey,
        "A twelve-storey monastery complex above the Indus valley; morning prayers carry across it."
      ),
      attraction(
        "nubra-dunes",
        "Nubra Sand Dunes",
        images.ladakh_nubra,
        "Desert dunes and Bactrian camels in the Shyok valley, a day's drive beyond the Khardung La pass."
      ),
    ],
    highlights: [
      "Pangong and Tso Moriri's shifting blue waters",
      "Cliff-face monasteries and morning prayers",
      "Some of the world's highest motorable passes",
    ],
    idealDays: 6,
    maxIdealDays: 8,
    budget: "Premium",
    travelTip:
      "Give yourself two quiet days in Leh first — acclimatisation quietly decides how good the rest of a Ladakh trip will be.",
    coordinates: { latitude: 34.1526, longitude: 77.5771 },
    heroCaption: "A thousand blues between the passes.",
    featured: true,
  }),
];

/** Record lookup by id, used by the details screen routing. */
export const destinationsById: Record<string, Destination> = Object.fromEntries(
  destinations.map((d) => [d.id, d])
);

export default destinations;

export function getDestinationById(id: string): Destination | undefined {
  return destinationsById[id];
}

/**
 * Picks the home hero destination deterministically by day of year so the
 * featured card changes day to day, while staying stable within a day.
 */
export function getFeaturedDestination(date = new Date()): Destination {
  const featured = destinations.filter((d) => d.featured);
  if (featured.length === 0) return destinations[0];
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (date.getTime() - startOfYear.getTime()) / 86400000
  );
  return featured[dayOfYear % featured.length];
}
