// api.ts
export interface Statistics {
  total_states: number;
  total_hospitals: number;
  total_services: number;
  total_categories: number;
}

export interface PriceValue {
  avg?: number;
}

export type PricingValue = number | PriceValue;


export interface PricingData {
  prices: Record<string, number | { avg: number }>;
  distributed_prices?: Record<string, number>;
  error?: string;
}

export const fetchStatistics = async (): Promise<Statistics> => {
  try {
    const response = await fetch("https://dorsaldata1.apurbatech.io/get_statistics");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<{ categories: string[] }> => {
  try {
    const response = await fetch("https://dorsaldata1.apurbatech.io/statewise_pricing/get_categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchPricingData = async (category: string): Promise<PricingData> => {
  try {
    const response = await fetch(`https://dorsaldata1.apurbatech.io/statewise_pricing/get_pricing/${category}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    throw error;
  }
};


// Cost Comparison

export async function fetchStates() {
  const response = await fetch('https://dorsaldata1.apurbatech.io/cost_comparison/get_states');
  return response.json();
}

export async function fetchHospitals(state: string) {
  if (!state) return [];
  const response = await fetch(`https://dorsaldata1.apurbatech.io/cost_comparison/get_hospitals?state=${state}`);
  return response.json();
}

export async function fetchPriceComparison(hospital1: string, hospital2: string) {
  if (!hospital1 || !hospital2) throw new Error("Both hospitals must be selected.");
  const response = await fetch(`https://dorsaldata1.apurbatech.io/cost_comparison/compare_costs?hospital1=${hospital1}&hospital2=${hospital2}`);
  return response.json();
}
