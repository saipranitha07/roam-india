// Build-time helper: queries the Wikimedia Commons API for candidate photos
// (not part of the app bundle). Run once with: node scripts/pick-images.mjs
const queries = {
  bir_hero: "paragliding Billing Himachal Pradesh filetype:bitmap",
  auli_hero: "Auli hill station snow filetype:bitmap",
  ladakh_hero: "Pangong lake Ladakh filetype:bitmap",
  pondicherry_hero: "Puducherry beach india filetype:bitmap",
  gokarna_hero: "Gokarna beach Karnataka filetype:bitmap",
  goa_basilica: "Bom Jesus cathedral Goa filetype:bitmap",
  goa_dudhsagar: "Dudhsagar Falls Goa filetype:bitmap",
  goa_chapora: "Chapora Fort filetype:bitmap",
  gokarna_mahabaleshwar: "Mahabaleshwar Temple Gokarna filetype:bitmap",
  gokarna_kudle: "Kudle Beach Gokarna filetype:bitmap",
  varkala_papanasam: "Papanasam beach Varkala filetype:bitmap",
  varkala_janardhana: "Janardanaswamy temple Varkala filetype:bitmap",
  manali_solang: "Solang Valley snow filetype:bitmap",
  manali_hadimba: "Hidimba Devi Temple filetype:bitmap",
  manali_rohtang: "Rohtang pass filetype:bitmap",
  munnar_eravikulam: "Eravikulam National Park filetype:bitmap",
  munnar_echo: "Echo point Munnar filetype:bitmap",
  munnar_kolukkumalai: "Kolukkumalai filetype:bitmap",
  rishikesh_triveni: "Triveni Ghat Rishikesh filetype:bitmap",
  rishikesh_rafting: "river rafting Ganga Rishikesh filetype:bitmap",
  rishikesh_ramjhula: "Ram Jhula Rishikesh filetype:bitmap",
  bir_landing: "paragliding takeoff Billing filetype:bitmap",
  bir_monastery: "monastery Bir Himachal filetype:bitmap",
  bir_view: "Billing valley filetype:bitmap",
  auli_gorson: "Gorson Bugyal filetype:bitmap",
  auli_ropeway: "Auli ropeway filetype:bitmap",
  auli_ski: "skiing Auli filetype:bitmap",
  ladakh_thiksey: "Thiksey monastery filetype:bitmap",
  ladakh_nubra: "Nubra Valley sand dunes filetype:bitmap",
  ladakh_shanti: "Shanti Stupa Leh filetype:bitmap",
  pondicherry_rockbeach: "Rock Beach Puducherry filetype:bitmap",
  pondicherry_auroville: "Auroville Matrimandir filetype:bitmap",
  pondicherry_paradise: "Paradise Beach Puducherry filetype:bitmap",
  agra_baby_taj: "Itmad-ud-Daulah tomb Agra filetype:bitmap",
  agra_mehtab: "Mehtab Bagh filetype:bitmap",
};

async function search(q) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search" +
    "&srnamespace=6&srlimit=6&srprop=&srsearch=" +
    encodeURIComponent(q);
  // The Commons API rate-limits bursts; retry briefly on failure.
  for (let attempt = 1; attempt <= 5; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": "RoamIndia-build/1.0 (asset picker)" },
    });
    const text = await res.text();
    if (res.ok && text.startsWith("{")) {
      const json = JSON.parse(text);
      return (json.query?.search || []).map((r) => r.title.replace("File:", ""));
    }
    await new Promise((r) => setTimeout(r, attempt * 8000));
  }
  return ["ERROR: gave up on " + q];
}

const out = {};
for (const [key, q] of Object.entries(queries)) {
  try {
    out[key] = await search(q);
  } catch (e) {
    out[key] = ["ERROR: " + e.message];
  }
  await new Promise((r) => setTimeout(r, 2500));
}
for (const key of Object.keys(out)) {
  console.log("\n== " + key + " ==");
  out[key].slice(0, 5).forEach((t) => console.log("  " + t));
}
