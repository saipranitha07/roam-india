// Build-time helper: verifies each chosen Commons file serves an image when
// referenced via Special:FilePath (redirects to upload.wikimedia.org).
// Prints compact JSON mapping key -> verified URL for use in destinations.ts.
import fs from "node:fs";
const picks = {
  goa_hero: "Palolem beach.jpg",
  gokarna_hero: "PXL 20260103 101009613 People and Beach Om Beach Gokarna, Karnataka 35.jpg",
  varkala_hero: "Varkala Cliff by KS.jpg",
  manali_hero: "Manali in winters.png",
  munnar_hero: "Munnar tea gardens.jpg",
  darjeeling_hero: "Kanchenjunga above roofs of Darjeeling 1.jpg",
  jaipur_hero: "East facade Hawa Mahal Jaipur from ground level (July 2022) - img 01.jpg",
  hampi_hero: "Hampi - Hemakuta Hill, Virupaksha Temple.jpg",
  agra_hero: "Taj Mahal, Agra, India edit2.jpg",
  rishikesh_hero: "Rishikesh, Lakshman Jhula.jpg",
  bir_hero: "Paragliding at Bir, HP.jpg",
  auli_hero: "Auli hill station.jpg",
  ladakh_hero: "Pangong Tso 2.jpg",
  pondicherry_hero: "Old Lighthouse, Rock Beach, Pondicherry (Puducherry), India.jpg",

  goa_basilica: "Basilica of Bom Jesus (6606475719).jpg",
  goa_dudhsagar: "Dudhsagar Falls, Goa (51822452300).jpg",
  goa_chapora: "Fort Chapora 26012016.jpg",
  gokarna_om: "PXL 20260103 101009613 People and Beach Om Beach Gokarna, Karnataka 27.jpg",
  gokarna_mahabaleshwar: "Main entry to the Mahabaleshwar Temple at Gokaran.jpg",
  gokarna_kudle: "Kudle Beach, Gokarna.jpg",
  varkala_papanasam: "Papanasam beach, Varkala.jpg",
  varkala_sun: "Varkala Cliff Sunset by KS.jpg",
  varkala_janardhana: "Janardanaswamy Temple - panoramio.jpg",
  manali_solang: "Solang valley under snow, 2015.jpg",
  manali_hadimba: "Hidimba Devi Temple, Dhungri Manali 2.jpg",
  manali_rohtang: "Rohtang pass from sideway.jpg",
  munnar_eravikulam: "Eravikulam National Park-WUS07189.jpg",
  munnar_echo: "Echo Point Munnar-Kerala.jpg",
  munnar_kolukkumalai: "Kolukkumalai sunrise view.jpg",
  darjeeling_train: "Darjeeling Himalayan Railway,toy train (8).jpg",
  darjeeling_tigerhill: "Tiger Hill Darjeeling West Bengal India (3).JPG",
  darjeeling_tea: "Tea Plantation in Darjeeling.jpg",
  jaipur_amber: "Jaipur 03-2016 02 Amber Fort.jpg",
  jaipur_citypalace: "Jaipur 03-2016 20 City Palace complex.jpg",
  jaipur_jantar: "Jaipur Jantar Mantar panorama 2011.jpg",
  hampi_vittala: "Iconic Stone Chariot @ Vittala Temple, Hampi, Karnataka.jpg",
  hampi_matanga: "Hampi, India, Temple on top of Matanga Hill.jpg",
  hampi_river: "Two Coracles and Tungabhadra River.jpg",
  agra_fort: "Agra 03-2016 14 Agra Fort.jpg",
  agra_baby_taj: "Itmad ud Daulah 4.jpg",
  agra_mehtab: "View of Taj Mahal from Mehtab Bagh gardens.jpg",
  rishikesh_triveni: "Ganga Arti At Triveni Ghat In Rishikesh.jpg",
  rishikesh_rafting: "River Rafting in Ganga Near Ram Jhula Rishikesh 01.jpg",
  rishikesh_ramjhula: "Ram Jhula footbridge - Rishikesh.jpg",
  bir_takeoff: "Paragliding takeoff at Bir-Billing.jpg",
  bir_monastery: "Chokling Monastery, Bir, Himachal Pradesh.jpg",
  bir_view: "View on a mountains and valley from Bir-Billing (03).JPG",
  auli_gorson: "Gorson Bugyal.jpg",
  auli_ropeway: "Ropeway, Auli.jpg",
  auli_ski: "Auli Bugyal Himalayas.jpg",
  ladakh_thiksey: "Thiksey Monastery, Ladakh 16.jpg",
  ladakh_nubra: "Sand dunes of Nubra Valley, Ladakh.jpg",
  ladakh_shanti: "Shanti Stupa, Leh, 20180814.jpg",
  pondicherry_rockbeach: "View of Rock Beach (Puducherry Beach) 3.jpg",
  pondicherry_auroville: "Matrimandir, Auroville 01.jpg",
  pondicherry_paradise: "Beaches of Puducherry Paradise Beach IMG 20180609 174733720.jpg",
};

const WIDTH = 1200;
function urlFor(file) {
  return (
    "https://commons.wikimedia.org/wiki/Special:FilePath/" +
    encodeURI(file) +
    "?width=" + WIDTH
  );
}

async function verify([key, file]) {
  const url = urlFor(file);
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "RoamIndia-build/1.0 (asset verifier)" },
      });
      const type = res.headers.get("content-type") || "";
      if (res.ok && type.startsWith("image/")) {
        return { key, file, url, ok: true, size: res.headers.get("content-length") };
      }
      // width may exceed the original; retry without width restriction once
      if (attempt === 1) {
        const res2 = await fetch(
          "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURI(file),
          { headers: { "User-Agent": "RoamIndia-build/1.0 (asset verifier)" } }
        );
        if (res2.ok) return { key, file, url: urlFor(file).split("?")[0], ok: true };
      }
      return { key, file, url, ok: false, status: res.status };
    } catch (e) {
      if (attempt === 4) return { key, file, url, ok: false, error: e.message };
      await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
}

const results = [];
for (const entry of Object.entries(picks)) {
  results.push(await verify(entry));
  await new Promise((r) => setTimeout(r, 400));
}
let fails = 0;
const map = {};
for (const r of results) {
  if (r.ok) map[r.key] = r.url;
  else {
    fails++;
    console.error("FAIL " + r.key + " -> " + r.file + " (" + (r.status || r.error) + ")");
  }
}
console.error("verified " + (results.length - fails) + "/" + results.length);
fs.writeFileSync("/tmp/verified-image-urls.json", JSON.stringify(map, null, 2));
