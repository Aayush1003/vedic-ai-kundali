/**
 * API client for the Vedic AI Kundali backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface BoyDetailsResponse {
  success: boolean;
  data: {
    name: string;
    dateOfBirth: string;
    time: string;
    place: string;
  };
}

export interface GunaScore {
  name: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  boyAttribute: string;
  girlAttribute: string;
}

export interface MilanResultData {
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
  aiAnalysis?: {
    strengths: string[];
    challenges: string[];
    remedies: string[];
    prediction: string;
  };
}

export interface MilanMatchResponse {
  success: boolean;
  data: {
    result: MilanResultData;
    downloadUrl: string;
  };
}

export async function fetchBoyDetails(): Promise<BoyDetailsResponse> {
  const res = await fetch(`${API_BASE_URL}/api/milan/boy-details`);
  if (!res.ok) throw new Error('Failed to fetch boy details');
  return res.json();
}

export async function submitMilanMatch(girlDetails: {
  name: string;
  dateOfBirth: string;
  time: string;
  place: string;
}): Promise<MilanMatchResponse> {
  const res = await fetch(`${API_BASE_URL}/api/milan/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(girlDetails),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || 'Failed to calculate Milan match');
  }
  return res.json();
}

export function getDownloadUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
