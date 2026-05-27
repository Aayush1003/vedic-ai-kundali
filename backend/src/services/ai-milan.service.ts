/**
 * AI Milan Service — AI-powered compatibility analysis and insights
 * 
 * Integrates with OpenAI/Gemini or falls back to a rule-based Vedic engine
 * to generate detailed reports including strengths, challenges, remedies,
 * and overall predictions.
 */

import OpenAI from 'openai';
import { MilanResult } from './milan.service';

export interface AICompatibilityAnalysis {
  strengths: string[];
  challenges: string[];
  remedies: string[];
  prediction: string;
}

/**
 * Generate AI-powered compatibility analysis based on Guna Milan scores.
 */
export async function generateCompatibilityAnalysis(
  result: MilanResult
): Promise<AICompatibilityAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;
  const useMock = !apiKey || apiKey === 'sk-mock-key-for-development' || apiKey.startsWith('sk-mock');

  if (useMock) {
    return generateFallbackAnalysis(result);
  }

  try {
    const openai = new OpenAI({ apiKey });
    const prompt = `
      You are an expert Vedic Astrologer. Analyze the Kundali Milan (horoscope matching) results between a couple:
      
      Boy Name: ${result.boyDetails.name}
      Boy Nakshatra: ${result.boyDetails.nakshatra}
      Boy Rashi: ${result.boyDetails.rashi}
      
      Girl Name: ${result.girlDetails.name}
      Girl Nakshatra: ${result.girlDetails.nakshatra}
      Girl Rashi: ${result.girlDetails.rashi}
      
      Match Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
      Verdict: ${result.verdict}
      
      Individual Guna Scores:
      ${result.gunaScores.map(g => `- ${g.name}: ${g.obtainedPoints}/${g.maxPoints} (Boy: ${g.boyAttribute}, Girl: ${g.girlAttribute}) - ${g.description}`).join('\n')}
      
      Provide a structured JSON response with the following keys:
      1. "strengths": Array of 3-4 specific strengths based on high-scoring gunas (e.g., Graha Maitri, Nadi, Bhakoot).
      2. "challenges": Array of 2-3 potential challenges based on low-scoring gunas (especially if Nadi or Bhakoot or Gana are 0).
      3. "remedies": Array of 3-4 traditional Vedic remedies (mantras, pujas, donations, behavior adjustments) if there are doshas like Nadi Dosha, Bhakoot Dosha, or low score.
      4. "prediction": A detailed, comforting, and encouraging paragraph (4-5 sentences) summarizing the life-long compatibility prediction for the couple.
      
      Ensure the response is valid JSON only. Do not wrap in markdown blocks like \`\`\`json.
    `;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000'),
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (content) {
      // Clean up markdown block wraps if present
      const cleanedJson = content.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
      return JSON.parse(cleanedJson) as AICompatibilityAnalysis;
    }
  } catch (error) {
    console.error('Failed to fetch from OpenAI, using fallback engine:', error);
  }

  return generateFallbackAnalysis(result);
}

/**
 * Fallback rule-based analysis generator in case AI keys are missing or API fails.
 */
function generateFallbackAnalysis(result: MilanResult): AICompatibilityAnalysis {
  const strengths: string[] = [];
  const challenges: string[] = [];
  const remedies: string[] = [];

  const bName = result.boyDetails.name;
  const gName = result.girlDetails.name;

  // Extract guna scores
  const getScore = (name: string) => result.gunaScores.find(g => g.name === name);
  const varna = getScore('Varna');
  const vashya = getScore('Vashya');
  const tara = getScore('Tara');
  const yoni = getScore('Yoni');
  const maitri = getScore('Graha Maitri');
  const gana = getScore('Gana');
  const bhakoot = getScore('Bhakoot');
  const nadi = getScore('Nadi');

  // --- STRENGTHS ---
  if (nadi && nadi.obtainedPoints === 8) {
    strengths.push(`Excellent Nadi compatibility (${bName} is ${nadi.boyAttribute} and ${gName} is ${nadi.girlAttribute}), indicating optimal genetic matching, good physical health, and high probability of healthy offspring.`);
  }
  if (bhakoot && bhakoot.obtainedPoints === 7) {
    strengths.push(`Perfect Bhakoot compatibility, representing deep emotional resonance, family harmony, and long-term financial growth together.`);
  }
  if (maitri && maitri.obtainedPoints >= 4) {
    strengths.push(`Strong Graha Maitri (score: ${maitri.obtainedPoints}/5), suggesting high mental compatibility, shared intellectual wavelengths, and natural friendship.`);
  }
  if (gana && gana.obtainedPoints >= 5) {
    strengths.push(`Great Gana compatibility (score: ${gana.obtainedPoints}/6), which ensures their basic temperaments, behavioral styles, and social outlooks are in sync.`);
  }
  if (yoni && yoni.obtainedPoints >= 3) {
    strengths.push(`Harmonious Yoni matching (score: ${yoni.obtainedPoints}/4), signifying strong physical attraction, intimacy, and biological compatibility.`);
  }
  if (tara && tara.obtainedPoints >= 1.5) {
    strengths.push(`Favorable Tara koot, reflecting positive cosmic support, mutual good luck, and destiny alignment for prosperity.`);
  }
  if (strengths.length === 0) {
    strengths.push(`Basic compatibility exists, and mutual commitment can help bridge any astrological gaps.`);
    strengths.push(`The couple's communication channels are open, which serves as a foundation for resolving differences.`);
  }

  // --- CHALLENGES ---
  if (nadi && nadi.obtainedPoints === 0) {
    challenges.push(`Nadi Dosha detected (${bName} and ${gName} share the same Nadi: ${nadi.boyAttribute}). In traditional astrology, this can cause health challenges, lack of vitality, or issues related to progeny.`);
  }
  if (bhakoot && bhakoot.obtainedPoints === 0) {
    challenges.push(`Bhakoot Dosha is present. This can lead to emotional distance, mood swings, differences in family management, or financial fluctuations if not managed.`);
  }
  if (gana && gana.obtainedPoints <= 1) {
    challenges.push(`Gana Dosha or low Gana compatibility. A clash between ${gana.boyAttribute} and ${gana.girlAttribute} temperaments might lead to arguments or stubborn behaviors.`);
  }
  if (maitri && maitri.obtainedPoints <= 1) {
    challenges.push(`Low Graha Maitri score (${maitri.obtainedPoints}/5). The ruling planets of their Moon signs are unfriendly, which may lead to differences in opinion, philosophy, or mental outlook.`);
  }
  if (yoni && yoni.obtainedPoints <= 1) {
    challenges.push(`Weak Yoni matching (score: ${yoni.obtainedPoints}/4). Biological compatibility is low, which might require extra understanding, patience, and warmth in their intimate relationship.`);
  }
  if (challenges.length === 0) {
    challenges.push(`No major astrological doshas detected in the primary Kootas. Minor differences can easily be resolved with dialogue.`);
  }

  // --- REMEDIES ---
  if (nadi && nadi.obtainedPoints === 0) {
    remedies.push("Perform Nadi Nivaaran Puja under guidance of an astrologer to neutralize the genetic friction.");
    remedies.push("Donate gold, cows, grains, or clothes to the needy to counter the negative energy of Nadi Dosha.");
  }
  if (bhakoot && bhakoot.obtainedPoints === 0) {
    remedies.push("Chant the Maha Mrityunjaya Mantra (108 times daily) to bring peace, longevity, and family harmony.");
    remedies.push("Observe fasts on Thursdays or Mondays, or perform Shiva-Parvati puja together.");
  }
  if (gana && gana.obtainedPoints <= 1) {
    remedies.push("Worship Lord Ganesha regularly to eliminate obstacles and soften behavioral friction.");
    remedies.push("Practice active listening and avoid arguing during stressful periods; conscious self-control is recommended.");
  }
  if (maitri && maitri.obtainedPoints <= 1) {
    remedies.push("Worship the respective planetary lords or chant Lord Vishnu's Sahasranama to ease planetary conflict.");
  }
  remedies.push("Chant 'Om Namah Shivaya' together daily to harmonize the solar and lunar energies in both charts.");
  remedies.push("Ensure transparency in financial matters and keep family elders involved in major life decisions.");

  // --- PREDICTION ---
  let prediction = '';
  if (result.totalScore >= 25) {
    prediction = `The cosmic match between ${bName} and ${gName} is highly auspicious, boasting an impressive compatibility score of ${result.totalScore}/36. They share excellent mental sync, deep emotional compatibility, and a solid foundation of mutual respect. Major indicators like Nadi and Bhakoot suggest a life filled with vitality, healthy offspring, and financial prosperity. While minor differences may arise, their core compatibility ensures they will easily weather any storms together. This union is highly recommended and promises a harmonious, loving, and long-lasting married life.`;
  } else if (result.totalScore >= 18) {
    prediction = `This is a balanced and favorable match with a score of ${result.totalScore}/36. ${bName} and ${gName} have several positive connections, particularly in their mental wavelengths and daily temperaments. While there are a few areas of friction, they are not insurmountable. By practicing patience, open communication, and adopting the recommended astrological remedies, they can build a beautiful life together. The relationship will grow stronger with time as they learn to appreciate and accommodate each other's differences.`;
  } else {
    prediction = `With a compatibility score of ${result.totalScore}/36, this match is below the traditional recommended threshold. Astrological analysis reveals some significant friction points and doshas that could affect health, family harmony, or emotional closeness. However, astrology is a guide, and human willpower and dedication can overcome these hurdles. By performing the suggested Vedic remedies (such as Maha Mrityunjaya chanting and charity) and committing to conscious communication, ${bName} and ${gName} can mitigate these challenges. It is advised to proceed with awareness, patience, and perhaps seek a personal consultation with a trusted astrologer.`;
  }

  return {
    strengths,
    challenges,
    remedies,
    prediction,
  };
}
