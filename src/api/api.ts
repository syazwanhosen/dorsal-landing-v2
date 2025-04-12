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