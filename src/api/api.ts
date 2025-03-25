
export interface Statistics {
    total_states: number;
    total_hospitals: number;
    total_services: number;
    total_categories: number;
}
export const fetchStatistics = async (): Promise<Statistics> => {
    try {
      const response = await fetch("http://123.200.16.106:3939/get_statistics");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Statistics = await response.json(); 
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };
  