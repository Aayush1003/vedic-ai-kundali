/**
 * Milan Matching Service — 36-Point Ashtakoot Guna Milan Calculator
 * 
 * Implements the traditional Vedic 8-fold matching system:
 * Varna(1) + Vashya(2) + Tara(3) + Yoni(4) + Graha Maitri(5) + Gana(6) + Bhakoot(7) + Nadi(8) = 36
 */

import {
  NAKSHATRAS,
  RASHIS,
  VARNA_NAMES,
  GANA_NAMES,
  NADI_NAMES,
  YONI_ANIMALS,
  YONI_COMPATIBILITY,
  RASHI_VASHYA,
  VASHYA_NAMES,
  VASHYA_COMPATIBILITY,
  GRAHA_MAITRI_MATRIX,
  GANA_COMPATIBILITY,
  BHAKOOT_INAUSPICIOUS,
  getRashiLordIndex,
  getNakshatraById,
  NakshatraInfo,
} from '../constants/nakshatra-data';

// ============================================================
// TYPES
// ============================================================

export interface BirthDetails {
  name: string;
  dateOfBirth: string;    // DD/MM/YYYY
  time: string;           // HH:MM AM/PM
  place: string;
  nakshatraId?: number;   // If known directly (0-26)
  rashiId?: number;       // If known directly (0-11)
}

export interface GunaScore {
  name: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  boyAttribute: string;
  girlAttribute: string;
}

export interface MilanResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  verdict: string;
  verdictColor: string;
  gunaScores: GunaScore[];
  boyDetails: {
    name: string;
    nakshatra: string;
    rashi: string;
    nakshatraId: number;
    rashiId: number;
  };
  girlDetails: {
    name: string;
    nakshatra: string;
    rashi: string;
    nakshatraId: number;
    rashiId: number;
  };
  mangalDosha: {
    severity: string;
    description: string;
  };
  summary: string;
}

// ============================================================
// NAKSHATRA DETERMINATION
// ============================================================

/**
 * Approximate Nakshatra from date of birth.
 * In a production system, this would use Swiss Ephemeris to calculate
 * the Moon's exact longitude. For now, we use a simplified algorithm
 * based on the lunar cycle.
 */
export function approximateNakshatraFromDate(dateStr: string): { nakshatraId: number; rashiId: number } {
  const parts = dateStr.split('/');
  let day: number, month: number, year: number;

  if (parts.length === 3) {
    day = parseInt(parts[0]);
    month = parseInt(parts[1]);
    year = parseInt(parts[2]);
  } else {
    // Try ISO format
    const d = new Date(dateStr);
    day = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
  }

  // Julian Day Number calculation (simplified)
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Approximate Moon's mean longitude (very simplified)
  // Moon completes one cycle in ~27.3 days
  const moonCycleDays = 27.321661;
  // Reference: Jan 1, 2000 (JDN 2451545), Moon at approximately Ashwini
  const refJDN = 2451545;
  const daysSinceRef = jdn - refJDN;
  const moonCycles = daysSinceRef / moonCycleDays;
  const moonPosition = ((moonCycles % 1) + 1) % 1; // 0 to 1

  // Map to nakshatra (0-26)
  const nakshatraId = Math.floor(moonPosition * 27) % 27;

  // Map nakshatra to rashi
  const nakshatra = NAKSHATRAS[nakshatraId];
  const rashiId = nakshatra.rashiIndex;

  return { nakshatraId, rashiId };
}

// ============================================================
// 8 GUNA CALCULATIONS
// ============================================================

/**
 * 1. VARNA KOOT (Max 1 point)
 * Spiritual compatibility. Boy's varna should be >= Girl's varna.
 * Brahmin(0) > Kshatriya(1) > Vaishya(2) > Shudra(3)
 */
function calculateVarna(boyNak: NakshatraInfo, girlNak: NakshatraInfo): GunaScore {
  const boyVarna = boyNak.varna;
  const girlVarna = girlNak.varna;

  // Boy varna should be same or higher (lower number = higher)
  const points = boyVarna <= girlVarna ? 1 : 0;

  return {
    name: 'Varna',
    maxPoints: 1,
    obtainedPoints: points,
    description: points === 1
      ? 'Spiritual compatibility is good. The couple shares harmonious spiritual values.'
      : 'Spiritual compatibility needs attention. Different spiritual approaches may cause friction.',
    boyAttribute: VARNA_NAMES[boyVarna],
    girlAttribute: VARNA_NAMES[girlVarna],
  };
}

/**
 * 2. VASHYA KOOT (Max 2 points)
 * Mutual attraction and dominance compatibility.
 */
function calculateVashya(boyRashiId: number, girlRashiId: number): GunaScore {
  const boyVashya = RASHI_VASHYA[boyRashiId];
  const girlVashya = RASHI_VASHYA[girlRashiId];
  const points = VASHYA_COMPATIBILITY[boyVashya][girlVashya];

  return {
    name: 'Vashya',
    maxPoints: 2,
    obtainedPoints: points,
    description: points === 2
      ? 'Excellent mutual attraction and understanding between the couple.'
      : points === 1
        ? 'Moderate mutual attraction. Some adjustments may be needed.'
        : 'Low mutual attraction compatibility. Requires conscious effort.',
    boyAttribute: VASHYA_NAMES[boyVashya],
    girlAttribute: VASHYA_NAMES[girlVashya],
  };
}

/**
 * 3. TARA KOOT (Max 3 points)
 * Birth star compatibility — Destiny and luck.
 * Count from girl's nakshatra to boy's nakshatra.
 * Remainder when divided by 9: if 3,5,7 → 0 points, else → 3 points
 */
function calculateTara(boyNak: NakshatraInfo, girlNak: NakshatraInfo): GunaScore {
  // Count from girl's nakshatra to boy's
  let count = ((boyNak.id - girlNak.id) % 27 + 27) % 27 + 1;
  const remainder = count % 9;

  // Inauspicious if remainder is 3, 5, or 7
  const inauspicious = [3, 5, 7].includes(remainder);
  const points = inauspicious ? 0 : 3;

  // Also check reverse
  let countReverse = ((girlNak.id - boyNak.id) % 27 + 27) % 27 + 1;
  const remainderReverse = countReverse % 9;
  const inauspiciousReverse = [3, 5, 7].includes(remainderReverse);

  // If both are auspicious = 3, one auspicious = 1.5, both inauspicious = 0
  let finalPoints: number;
  if (!inauspicious && !inauspiciousReverse) finalPoints = 3;
  else if (inauspicious && inauspiciousReverse) finalPoints = 0;
  else finalPoints = 1.5;

  return {
    name: 'Tara',
    maxPoints: 3,
    obtainedPoints: finalPoints,
    description: finalPoints === 3
      ? 'Excellent destiny compatibility. Stars favor this union with luck and prosperity.'
      : finalPoints >= 1.5
        ? 'Moderate star compatibility. Some karmic adjustments needed.'
        : 'Star compatibility is challenging. Remedies may be recommended.',
    boyAttribute: `Tara count: ${count} (remainder: ${remainder})`,
    girlAttribute: `Tara count: ${countReverse} (remainder: ${remainderReverse})`,
  };
}

/**
 * 4. YONI KOOT (Max 4 points)
 * Sexual and physical compatibility based on animal symbols.
 */
function calculateYoni(boyNak: NakshatraInfo, girlNak: NakshatraInfo): GunaScore {
  const boyYoni = boyNak.yoni;
  const girlYoni = girlNak.yoni;
  const points = YONI_COMPATIBILITY[boyYoni][girlYoni];

  return {
    name: 'Yoni',
    maxPoints: 4,
    obtainedPoints: points,
    description: points >= 3
      ? 'Strong physical and intimate compatibility. Natural chemistry is present.'
      : points === 2
        ? 'Average physical compatibility. Understanding and patience needed.'
        : 'Physical compatibility is low. May need conscious effort in intimacy.',
    boyAttribute: `${YONI_ANIMALS[boyYoni]} (${boyNak.yoniGender})`,
    girlAttribute: `${YONI_ANIMALS[girlYoni]} (${girlNak.yoniGender})`,
  };
}

/**
 * 5. GRAHA MAITRI KOOT (Max 5 points)
 * Mental compatibility based on ruling planets of rashis.
 */
function calculateGrahaMaitri(boyRashiId: number, girlRashiId: number): GunaScore {
  const boyLord = getRashiLordIndex(boyRashiId);
  const girlLord = getRashiLordIndex(girlRashiId);

  const boyToGirl = GRAHA_MAITRI_MATRIX[boyLord][girlLord];
  const girlToBoy = GRAHA_MAITRI_MATRIX[girlLord][boyLord];

  let points: number;
  if (boyToGirl === 2 && girlToBoy === 2) points = 5;       // Both friends
  else if (boyToGirl === 2 || girlToBoy === 2) {
    if (boyToGirl === 0 || girlToBoy === 0) points = 1;     // One friend, one enemy
    else points = 4;                                          // One friend, one neutral
  } else if (boyToGirl === 1 && girlToBoy === 1) points = 3; // Both neutral
  else if (boyToGirl === 0 && girlToBoy === 0) points = 0;   // Both enemies
  else points = 0.5;                                          // One neutral, one enemy

  const planetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  return {
    name: 'Graha Maitri',
    maxPoints: 5,
    obtainedPoints: points,
    description: points >= 4
      ? 'Excellent mental harmony. The couple thinks alike and understands each other deeply.'
      : points >= 3
        ? 'Good mental compatibility. Communication flows naturally.'
        : points >= 1
          ? 'Moderate mental compatibility. Different viewpoints can lead to growth.'
          : 'Mental wavelengths differ significantly. Patience and communication are key.',
    boyAttribute: `${RASHIS[boyRashiId].name} (Lord: ${planetNames[boyLord]})`,
    girlAttribute: `${RASHIS[girlRashiId].name} (Lord: ${planetNames[girlLord]})`,
  };
}

/**
 * 6. GANA KOOT (Max 6 points)
 * Temperament and behavior compatibility.
 * Deva = Gentle, Manushya = Balanced, Rakshasa = Fierce
 */
function calculateGana(boyNak: NakshatraInfo, girlNak: NakshatraInfo): GunaScore {
  const boyGana = boyNak.gana;
  const girlGana = girlNak.gana;
  const points = GANA_COMPATIBILITY[boyGana][girlGana];

  return {
    name: 'Gana',
    maxPoints: 6,
    obtainedPoints: points,
    description: points >= 5
      ? 'Wonderful temperament match. The couple naturally complements each other\'s nature.'
      : points >= 3
        ? 'Reasonable temperament compatibility. Some adjustment may be needed.'
        : 'Temperament differences may cause friction. Mutual understanding is essential.',
    boyAttribute: GANA_NAMES[boyGana],
    girlAttribute: GANA_NAMES[girlGana],
  };
}

/**
 * 7. BHAKOOT KOOT (Max 7 points)
 * Moon sign compatibility — Love, family welfare, finances.
 * Inauspicious if 2/12, 6/8, or 5/9 from each other.
 */
function calculateBhakoot(boyRashiId: number, girlRashiId: number): GunaScore {
  const diff = ((boyRashiId - girlRashiId) % 12 + 12) % 12;

  // Check inauspicious combinations
  let inauspicious = false;
  for (const combo of BHAKOOT_INAUSPICIOUS) {
    if (diff === combo[0] || diff === combo[1]) {
      inauspicious = true;
      break;
    }
  }

  const points = inauspicious ? 0 : 7;

  return {
    name: 'Bhakoot',
    maxPoints: 7,
    obtainedPoints: points,
    description: points === 7
      ? 'Excellent love and family compatibility. The couple will enjoy financial harmony and mutual support.'
      : 'Bhakoot dosha detected. This may affect financial stability or family harmony. Remedies are available.',
    boyAttribute: RASHIS[boyRashiId].name,
    girlAttribute: RASHIS[girlRashiId].name,
  };
}

/**
 * 8. NADI KOOT (Max 8 points — Most important!)
 * Health, genes, and progeny compatibility.
 * Same Nadi = 0 points (Nadi Dosha), Different = 8 points
 */
function calculateNadi(boyNak: NakshatraInfo, girlNak: NakshatraInfo): GunaScore {
  const boyNadi = boyNak.nadi;
  const girlNadi = girlNak.nadi;

  // Same nadi = dosha (0 points), different = full points (8)
  const points = boyNadi === girlNadi ? 0 : 8;

  return {
    name: 'Nadi',
    maxPoints: 8,
    obtainedPoints: points,
    description: points === 8
      ? 'Excellent health and genetic compatibility. Good prospects for healthy progeny.'
      : 'Nadi Dosha detected — same Nadi type. This is considered the most serious dosha. Remedies like Nadi Nivaaran Puja are recommended.',
    boyAttribute: NADI_NAMES[boyNadi],
    girlAttribute: NADI_NAMES[girlNadi],
  };
}

// ============================================================
// MAIN MATCHING FUNCTION
// ============================================================

/**
 * Calculate complete 36-point Ashtakoot Guna Milan
 */
export function calculateGunaMilan(
  boyDetails: BirthDetails,
  girlDetails: BirthDetails
): MilanResult {
  // Determine Nakshatra and Rashi
  let boyNakId: number, boyRashiId: number;
  let girlNakId: number, girlRashiId: number;

  if (boyDetails.nakshatraId !== undefined && boyDetails.rashiId !== undefined) {
    boyNakId = boyDetails.nakshatraId;
    boyRashiId = boyDetails.rashiId;
  } else {
    const boyCalc = approximateNakshatraFromDate(boyDetails.dateOfBirth);
    boyNakId = boyCalc.nakshatraId;
    boyRashiId = boyCalc.rashiId;
  }

  if (girlDetails.nakshatraId !== undefined && girlDetails.rashiId !== undefined) {
    girlNakId = girlDetails.nakshatraId;
    girlRashiId = girlDetails.rashiId;
  } else {
    const girlCalc = approximateNakshatraFromDate(girlDetails.dateOfBirth);
    girlNakId = girlCalc.nakshatraId;
    girlRashiId = girlCalc.rashiId;
  }

  const boyNak = getNakshatraById(boyNakId);
  const girlNak = getNakshatraById(girlNakId);

  // Calculate all 8 Gunas
  const gunaScores: GunaScore[] = [
    calculateVarna(boyNak, girlNak),
    calculateVashya(boyRashiId, girlRashiId),
    calculateTara(boyNak, girlNak),
    calculateYoni(boyNak, girlNak),
    calculateGrahaMaitri(boyRashiId, girlRashiId),
    calculateGana(boyNak, girlNak),
    calculateBhakoot(boyRashiId, girlRashiId),
    calculateNadi(boyNak, girlNak),
  ];

  // Calculate total
  const totalScore = gunaScores.reduce((sum, g) => sum + g.obtainedPoints, 0);
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Determine verdict
  let verdict: string;
  let verdictColor: string;
  if (totalScore >= 32) {
    verdict = 'Excellent Match! 🌟';
    verdictColor = '#10b981'; // emerald
  } else if (totalScore >= 25) {
    verdict = 'Very Good Match ✨';
    verdictColor = '#22c55e'; // green
  } else if (totalScore >= 18) {
    verdict = 'Good Match — Recommended 👍';
    verdictColor = '#eab308'; // yellow
  } else if (totalScore >= 14) {
    verdict = 'Average Match — Consider Remedies ⚠️';
    verdictColor = '#f97316'; // orange
  } else {
    verdict = 'Below Average — Remedies Strongly Advised 🔴';
    verdictColor = '#ef4444'; // red
  }

  // Mangal dosha (simplified — needs actual Mars position)
  const mangalDosha = {
    severity: 'Not Calculated',
    description: 'Mangal Dosha analysis requires precise Mars position from birth chart. Consult a Vedic astrologer for detailed analysis.',
  };

  // Summary
  const summary = `The Guna Milan score between ${boyDetails.name} and ${girlDetails.name} is ${totalScore} out of ${maxScore} (${percentage}%). ${verdict.replace(/[🌟✨👍⚠️🔴]/g, '').trim()}. ` +
    (totalScore >= 18
      ? 'This match is considered favorable for marriage according to Vedic astrology traditions.'
      : 'While the score is below the recommended threshold of 18, many successful marriages have lower scores. Consider consulting an astrologer for detailed remedies.');

  return {
    totalScore,
    maxScore,
    percentage,
    verdict,
    verdictColor,
    gunaScores,
    boyDetails: {
      name: boyDetails.name,
      nakshatra: boyNak.name,
      rashi: RASHIS[boyRashiId].name,
      nakshatraId: boyNakId,
      rashiId: boyRashiId,
    },
    girlDetails: {
      name: girlDetails.name,
      nakshatra: girlNak.name,
      rashi: RASHIS[girlRashiId].name,
      nakshatraId: girlNakId,
      rashiId: girlRashiId,
    },
    mangalDosha,
    summary,
  };
}
