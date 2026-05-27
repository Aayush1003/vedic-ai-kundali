/**
 * Vedic Astrology Constants — Nakshatra, Rashi, and Guna Milan Data
 * 
 * This module contains all the static data tables needed for
 * Ashtakoot (8-fold) Guna Milan matching system.
 * 
 * Total Guna Points: 36
 * - Varna (1), Vashya (2), Tara (3), Yoni (4)
 * - Graha Maitri (5), Gana (6), Bhakoot (7), Nadi (8)
 */

// ============================================================
// 27 NAKSHATRAS (Lunar Mansions)
// ============================================================

export interface NakshatraInfo {
  id: number;
  name: string;
  deity: string;
  lord: string;           // Ruling planet
  rashi: string;          // Zodiac sign
  rashiIndex: number;     // 0-11
  varna: number;          // 0=Brahmin, 1=Kshatriya, 2=Vaishya, 3=Shudra
  gana: number;           // 0=Deva, 1=Manushya, 2=Rakshasa
  yoni: number;           // 0-13 animal index
  yoniGender: 'M' | 'F'; // Male or Female yoni
  nadi: number;           // 0=Aadi, 1=Madhya, 2=Antya
}

export const NAKSHATRAS: NakshatraInfo[] = [
  { id: 0,  name: 'Ashwini',       deity: 'Ashwini Kumaras', lord: 'Ketu',    rashi: 'Aries',       rashiIndex: 0,  varna: 0, gana: 0, yoni: 0,  yoniGender: 'M', nadi: 0 },
  { id: 1,  name: 'Bharani',       deity: 'Yama',            lord: 'Venus',   rashi: 'Aries',       rashiIndex: 0,  varna: 1, gana: 1, yoni: 1,  yoniGender: 'M', nadi: 1 },
  { id: 2,  name: 'Krittika',      deity: 'Agni',            lord: 'Sun',     rashi: 'Aries',       rashiIndex: 0,  varna: 2, gana: 2, yoni: 2,  yoniGender: 'F', nadi: 2 },
  { id: 3,  name: 'Rohini',        deity: 'Brahma',          lord: 'Moon',    rashi: 'Taurus',      rashiIndex: 1,  varna: 3, gana: 1, yoni: 3,  yoniGender: 'M', nadi: 0 },
  { id: 4,  name: 'Mrigashira',    deity: 'Soma',            lord: 'Mars',    rashi: 'Taurus',      rashiIndex: 1,  varna: 0, gana: 0, yoni: 3,  yoniGender: 'F', nadi: 1 },
  { id: 5,  name: 'Ardra',         deity: 'Rudra',           lord: 'Rahu',    rashi: 'Gemini',      rashiIndex: 2,  varna: 1, gana: 1, yoni: 4,  yoniGender: 'F', nadi: 2 },
  { id: 6,  name: 'Punarvasu',     deity: 'Aditi',           lord: 'Jupiter', rashi: 'Gemini',      rashiIndex: 2,  varna: 2, gana: 0, yoni: 5,  yoniGender: 'F', nadi: 0 },
  { id: 7,  name: 'Pushya',        deity: 'Brihaspati',      lord: 'Saturn',  rashi: 'Cancer',      rashiIndex: 3,  varna: 3, gana: 0, yoni: 6,  yoniGender: 'M', nadi: 1 },
  { id: 8,  name: 'Ashlesha',      deity: 'Sarpa',           lord: 'Mercury', rashi: 'Cancer',      rashiIndex: 3,  varna: 0, gana: 2, yoni: 5,  yoniGender: 'M', nadi: 2 },
  { id: 9,  name: 'Magha',         deity: 'Pitras',          lord: 'Ketu',    rashi: 'Leo',         rashiIndex: 4,  varna: 1, gana: 2, yoni: 7,  yoniGender: 'M', nadi: 0 },
  { id: 10, name: 'Purva Phalguni',deity: 'Bhaga',           lord: 'Venus',   rashi: 'Leo',         rashiIndex: 4,  varna: 2, gana: 1, yoni: 7,  yoniGender: 'F', nadi: 1 },
  { id: 11, name: 'Uttara Phalguni',deity: 'Aryaman',        lord: 'Sun',     rashi: 'Leo',         rashiIndex: 4,  varna: 3, gana: 1, yoni: 8,  yoniGender: 'M', nadi: 2 },
  { id: 12, name: 'Hasta',         deity: 'Savitar',         lord: 'Moon',    rashi: 'Virgo',       rashiIndex: 5,  varna: 0, gana: 0, yoni: 9,  yoniGender: 'F', nadi: 0 },
  { id: 13, name: 'Chitra',        deity: 'Tvashtar',        lord: 'Mars',    rashi: 'Virgo',       rashiIndex: 5,  varna: 1, gana: 2, yoni: 10, yoniGender: 'F', nadi: 1 },
  { id: 14, name: 'Swati',         deity: 'Vayu',            lord: 'Rahu',    rashi: 'Libra',       rashiIndex: 6,  varna: 2, gana: 0, yoni: 9,  yoniGender: 'M', nadi: 2 },
  { id: 15, name: 'Vishakha',      deity: 'Indra-Agni',      lord: 'Jupiter', rashi: 'Libra',       rashiIndex: 6,  varna: 3, gana: 2, yoni: 10, yoniGender: 'M', nadi: 0 },
  { id: 16, name: 'Anuradha',      deity: 'Mitra',           lord: 'Saturn',  rashi: 'Scorpio',     rashiIndex: 7,  varna: 0, gana: 0, yoni: 6,  yoniGender: 'F', nadi: 1 },
  { id: 17, name: 'Jyeshtha',      deity: 'Indra',           lord: 'Mercury', rashi: 'Scorpio',     rashiIndex: 7,  varna: 1, gana: 2, yoni: 4,  yoniGender: 'M', nadi: 2 },
  { id: 18, name: 'Mula',          deity: 'Nirriti',         lord: 'Ketu',    rashi: 'Sagittarius', rashiIndex: 8,  varna: 2, gana: 2, yoni: 4,  yoniGender: 'F', nadi: 0 },  // Using yoni=4 (Dog) per some traditional systems
  { id: 19, name: 'Purva Ashadha', deity: 'Apas',            lord: 'Venus',   rashi: 'Sagittarius', rashiIndex: 8,  varna: 3, gana: 1, yoni: 11, yoniGender: 'M', nadi: 1 },
  { id: 20, name: 'Uttara Ashadha',deity: 'Vishvadevas',     lord: 'Sun',     rashi: 'Sagittarius', rashiIndex: 8,  varna: 0, gana: 1, yoni: 11, yoniGender: 'F', nadi: 2 },
  { id: 21, name: 'Shravana',      deity: 'Vishnu',          lord: 'Moon',    rashi: 'Capricorn',   rashiIndex: 9,  varna: 1, gana: 0, yoni: 12, yoniGender: 'F', nadi: 0 },
  { id: 22, name: 'Dhanishta',     deity: 'Vasus',           lord: 'Mars',    rashi: 'Capricorn',   rashiIndex: 9,  varna: 2, gana: 0, yoni: 13, yoniGender: 'F', nadi: 1 },
  { id: 23, name: 'Shatabhisha',   deity: 'Varuna',          lord: 'Rahu',    rashi: 'Aquarius',    rashiIndex: 10, varna: 3, gana: 2, yoni: 0,  yoniGender: 'F', nadi: 2 },
  { id: 24, name: 'Purva Bhadrapada', deity: 'Ajaikapada',   lord: 'Jupiter', rashi: 'Aquarius',    rashiIndex: 10, varna: 0, gana: 1, yoni: 13, yoniGender: 'M', nadi: 0 },
  { id: 25, name: 'Uttara Bhadrapada', deity: 'Ahirbudhnya', lord: 'Saturn',  rashi: 'Pisces',      rashiIndex: 11, varna: 1, gana: 1, yoni: 8,  yoniGender: 'F', nadi: 1 },
  { id: 26, name: 'Revati',        deity: 'Pushan',          lord: 'Mercury', rashi: 'Pisces',      rashiIndex: 11, varna: 2, gana: 0, yoni: 1,  yoniGender: 'F', nadi: 2 },
];

// ============================================================
// 12 RASHIS (Zodiac Signs)
// ============================================================

export interface RashiInfo {
  id: number;
  name: string;
  lord: string;
  element: string;
  nature: string;
}

export const RASHIS: RashiInfo[] = [
  { id: 0,  name: 'Aries',       lord: 'Mars',    element: 'Fire',  nature: 'Movable' },
  { id: 1,  name: 'Taurus',      lord: 'Venus',   element: 'Earth', nature: 'Fixed' },
  { id: 2,  name: 'Gemini',      lord: 'Mercury', element: 'Air',   nature: 'Dual' },
  { id: 3,  name: 'Cancer',      lord: 'Moon',    element: 'Water', nature: 'Movable' },
  { id: 4,  name: 'Leo',         lord: 'Sun',     element: 'Fire',  nature: 'Fixed' },
  { id: 5,  name: 'Virgo',       lord: 'Mercury', element: 'Earth', nature: 'Dual' },
  { id: 6,  name: 'Libra',       lord: 'Venus',   element: 'Air',   nature: 'Movable' },
  { id: 7,  name: 'Scorpio',     lord: 'Mars',    element: 'Water', nature: 'Fixed' },
  { id: 8,  name: 'Sagittarius', lord: 'Jupiter', element: 'Fire',  nature: 'Dual' },
  { id: 9,  name: 'Capricorn',   lord: 'Saturn',  element: 'Earth', nature: 'Movable' },
  { id: 10, name: 'Aquarius',    lord: 'Saturn',  element: 'Air',   nature: 'Fixed' },
  { id: 11, name: 'Pisces',      lord: 'Jupiter', element: 'Water', nature: 'Dual' },
];

// ============================================================
// VARNA NAMES (Spiritual Compatibility - Max 1 point)
// ============================================================
export const VARNA_NAMES = ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'];

// ============================================================
// GANA NAMES (Temperament - Max 6 points)
// ============================================================
export const GANA_NAMES = ['Deva', 'Manushya', 'Rakshasa'];

// ============================================================
// NADI NAMES (Health/Genes - Max 8 points)
// ============================================================
export const NADI_NAMES = ['Aadi (Vata)', 'Madhya (Pitta)', 'Antya (Kapha)'];

// ============================================================
// YONI ANIMALS (Sexual/Physical Compatibility - Max 4 points)
// ============================================================
export const YONI_ANIMALS = [
  'Horse',       // 0
  'Elephant',    // 1
  'Sheep',       // 2
  'Serpent',     // 3
  'Dog',         // 4
  'Cat',         // 5
  'Rat',         // 6
  'Cow',         // 7
  'Buffalo',     // 8
  'Hare',        // 9  (alternate: Deer)
  'Tiger',       // 10
  'Mongoose',    // 11
  'Monkey',      // 12
  'Lion',        // 13
];

// Yoni compatibility matrix (14x14)
// 4 = Very compatible, 3 = Compatible, 2 = Neutral, 1 = Incompatible, 0 = Enemy
export const YONI_COMPATIBILITY: number[][] = [
  // Horse Elep Sheep Serp Dog  Cat  Rat  Cow  Buff Hare Tigr Mong Monk Lion
  [  4,    2,   2,    3,   2,   2,   2,   1,   1,   3,   1,   2,   3,   2 ], // Horse
  [  2,    4,   3,    3,   2,   2,   2,   2,   3,   2,   1,   2,   2,   0 ], // Elephant
  [  2,    3,   4,    2,   2,   2,   1,   3,   3,   2,   1,   2,   2,   2 ], // Sheep
  [  3,    3,   2,    4,   2,   1,   1,   1,   1,   2,   2,   0,   2,   2 ], // Serpent
  [  2,    2,   2,    2,   4,   2,   1,   2,   2,   1,   2,   2,   2,   2 ], // Dog
  [  2,    2,   2,    1,   2,   4,   0,   2,   2,   3,   2,   2,   2,   2 ], // Cat
  [  2,    2,   1,    1,   1,   0,   4,   2,   2,   2,   2,   2,   2,   1 ], // Rat
  [  1,    2,   3,    1,   2,   2,   2,   4,   3,   2,   0,   2,   2,   2 ], // Cow
  [  1,    3,   3,    1,   2,   2,   2,   3,   4,   2,   1,   2,   1,   2 ], // Buffalo
  [  3,    2,   2,    2,   1,   3,   2,   2,   2,   4,   2,   2,   2,   2 ], // Hare
  [  1,    1,   1,    2,   2,   2,   2,   0,   1,   2,   4,   1,   2,   1 ], // Tiger
  [  2,    2,   2,    0,   2,   2,   2,   2,   2,   2,   1,   4,   2,   2 ], // Mongoose
  [  3,    2,   2,    2,   2,   2,   2,   2,   1,   2,   2,   2,   4,   3 ], // Monkey
  [  2,    0,   2,    2,   2,   2,   1,   2,   2,   2,   1,   2,   3,   4 ], // Lion
];

// ============================================================
// VASHYA (Dominance/Attraction - Max 2 points)
// ============================================================
// Vashya categories: 0=Chatushpada, 1=Manava, 2=Jalachara, 3=Vanachara, 4=Keeta
export const RASHI_VASHYA: number[] = [
  3, // Aries       - Vanachara (wild)
  0, // Taurus      - Chatushpada (quadruped)
  1, // Gemini      - Manava (human)
  2, // Cancer      - Jalachara (water)
  3, // Leo         - Vanachara (wild)
  1, // Virgo       - Manava (human)
  1, // Libra       - Manava (human)
  4, // Scorpio     - Keeta (insect)
  1, // Sagittarius - Manava (half human)
  0, // Capricorn   - Chatushpada (quadruped)
  1, // Aquarius    - Manava (human)
  2, // Pisces      - Jalachara (water)
];

export const VASHYA_NAMES = ['Chatushpada', 'Manava', 'Jalachara', 'Vanachara', 'Keeta'];

// Vashya compatibility (5x5) - simplified
// 2 = Full, 1 = Half, 0 = None
export const VASHYA_COMPATIBILITY: number[][] = [
  // Chat Mana Jalc Vanc Keet
  [  2,   0,   0,   1,   0 ], // Chatushpada
  [  1,   2,   0,   1,   0 ], // Manava
  [  0,   0,   2,   0,   0 ], // Jalachara
  [  0,   1,   0,   2,   0 ], // Vanachara
  [  0,   0,   0,   0,   2 ], // Keeta
];

// ============================================================
// GRAHA MAITRI (Planetary Friendship - Max 5 points)
// ============================================================
// Planets: Sun=0, Moon=1, Mars=2, Mercury=3, Jupiter=4, Venus=5, Saturn=6
export const PLANET_IDS: Record<string, number> = {
  'Sun': 0, 'Moon': 1, 'Mars': 2, 'Mercury': 3,
  'Jupiter': 4, 'Venus': 5, 'Saturn': 6,
  'Ketu': 2, 'Rahu': 6  // Ketu acts like Mars, Rahu like Saturn
};

// Friendship matrix: 2=Friend, 1=Neutral, 0=Enemy
export const GRAHA_MAITRI_MATRIX: number[][] = [
  // Sun Moon Mars Merc Jup  Ven  Sat
  [  2,   2,   2,   0,   2,   0,   0 ], // Sun
  [  2,   2,   1,   1,   1,   1,   1 ], // Moon
  [  2,   2,   2,   0,   2,   1,   0 ], // Mars
  [  2,   0,   1,   2,   1,   2,   1 ], // Mercury
  [  2,   2,   2,   1,   2,   0,   0 ], // Jupiter
  [  1,   0,   1,   2,   0,   2,   2 ], // Venus
  [  0,   0,   1,   2,   0,   2,   2 ], // Saturn
];

// ============================================================
// BHAKOOT (Moon Sign Compatibility - Max 7 points)
// ============================================================
// Bad Bhakoot combinations (boy rashi from girl rashi distance)
// These combinations give 0 points. All others give 7.
export const BHAKOOT_BAD_COMBOS = [
  [1, 7],   // 2/12 - Dhan-Vyaya (Financial Loss)
  [7, 1],   // 12/2
  [4, 10],  // 5/9 - this is actually auspicious, removing
  [10, 4],  // 9/5 
  [5, 9],   // 6/8 - Rog-Mrityu (Disease-Death)
  [9, 5],   // 8/6
];

// Corrected: Only truly inauspicious Bhakoot combinations
export const BHAKOOT_INAUSPICIOUS: number[][] = [
  [1, 11],  // 2/12 positions
  [11, 1],
  [5, 7],   // 6/8 positions  
  [7, 5],
];

// ============================================================
// GANA COMPATIBILITY (Temperament - Max 6 points)
// ============================================================
// Deva=0, Manushya=1, Rakshasa=2
export const GANA_COMPATIBILITY: number[][] = [
  // Deva Manu Raks
  [  6,   6,   1 ], // Deva boy
  [  5,   6,   0 ], // Manushya boy
  [  1,   0,   6 ], // Rakshasa boy
];

// ============================================================
// HELPER: Map Rashi lord name to planet index
// ============================================================
export function getRashiLordIndex(rashiIndex: number): number {
  const lord = RASHIS[rashiIndex].lord;
  return PLANET_IDS[lord] ?? 0;
}

// ============================================================
// HELPER: Get Nakshatra from a given index (0-26)
// ============================================================
export function getNakshatraById(id: number): NakshatraInfo {
  return NAKSHATRAS[id % 27];
}

// ============================================================
// HELPER: Get Rashi from Nakshatra
// Each Rashi spans 2.25 Nakshatras (30° / 13.33° per Nakshatra)
// ============================================================
export function getRashiFromNakshatra(nakshatraId: number, pada: number = 1): number {
  // Each nakshatra has 4 padas, each pada = 3°20'
  // Total position in padas: nakshatraId * 4 + (pada - 1)
  const totalPada = nakshatraId * 4 + (pada - 1);
  // Each rashi = 9 padas (30° / 3°20' ≈ 9)
  return Math.floor(totalPada / 9);
}
