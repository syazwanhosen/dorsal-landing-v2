import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HospitalMapState {
  hospitals: any[];
  selectedHospitals: any[];
  selectedHospital: any | null; 
  sortOption: "lowestPrice" | "shortestDistance";
  sidebarOpen: boolean;
  selectedLocation: [number, number] | null;
}

const initialState: HospitalMapState = {
  hospitals: [],
  selectedHospitals: [],
  selectedHospital: null, 
  sortOption: "lowestPrice",
  sidebarOpen: true,
  selectedLocation: null
};

export const hospitalMapSlice = createSlice({
  name: "hospitalMap",
  initialState,
  reducers: {
    setHospitals: (state, action: PayloadAction<any[]>) => {
      state.hospitals = action.payload;
    },
    setSelectedHospital: (state, action: PayloadAction<any | null>) => {
      state.selectedHospital = action.payload;
    },
    setSelectedHospitals: (state, action: PayloadAction<any[]>) => {
      state.selectedHospitals = action.payload;
    },
    setSortOption: (state, action: PayloadAction<"lowestPrice" | "shortestDistance">) => {
      state.sortOption = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<[number, number] | null>) => {
      state.selectedLocation = action.payload;
    }
  }
});

export const { 
  setHospitals, 
  setSelectedHospital, 
  setSelectedHospitals, 
  setSortOption, 
  setSidebarOpen, 
  setSelectedLocation 
} = hospitalMapSlice.actions;

export default hospitalMapSlice.reducer;
