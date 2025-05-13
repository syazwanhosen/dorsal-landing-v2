import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SearchResults, Hospital, HospitalDetails } from '../types/HospitalMap';
 
interface Filters {
  state: string;
  category: string;
  subcategory: string;
  cpt: string;
  service: string;
}
 
interface Options {
  state: string[];
  category: string[];
  subcategory: string[];
  cpt: string[];
  service: string[];
}
 
interface HospitalState {
  hospitals: Hospital[] | undefined;
  searchResults: SearchResults | null;
  currentHospital: HospitalDetails | null;
  filters: Filters;
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
  options: Options;
}
 
const initialState: HospitalState = {
  searchResults: null,
  currentHospital: null,
  filters: {
    state: "",
    category: "",
    subcategory: "",
    cpt: "",
    service: "",
  },
  loading: false,
  detailsLoading: false,
  error: null,
  options: {
    state: [],
    category: [],
    subcategory: [],
    cpt: [],
    service: [],
  },
  hospitals: undefined
};
 
const baseUrl = import.meta.env.VITE_API_BASE_URL;
 
// Async thunk for fetching hospital details
export const fetchHospitalDetails = createAsyncThunk(
  'hospital/fetchDetails',
  async (hospitalName: string, { rejectWithValue }) => {
    try {
      const encodedName = encodeURIComponent(hospitalName); // Ensure encoding
      const url = `${baseUrl}/common/hospital_metadata/${encodedName}`; // Assign to a variable
      console.log('Fetching hospital details from:', url); // Debugging log
     
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch hospital details for ${hospitalName}`);
      }
     
      const data = await response.json();
      console.log('Received data:', data); // Debugging log
      return data.hospital_metadata;
    } catch (error) {
      console.error('Error fetching hospital details:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
 
 
const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setOptions: (state, action: PayloadAction<{ field: keyof Options; values: string[] }>) => {
      state.options[action.payload.field] = action.payload.values;
    },
    setSearchResults: (state, action: PayloadAction<SearchResults>) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.options = initialState.options;
    },
    clearCurrentHospital: (state) => {
      state.currentHospital = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Hospital details fetch cases
      .addCase(fetchHospitalDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchHospitalDetails.fulfilled, (state, action: PayloadAction<HospitalDetails>) => {
        state.detailsLoading = false;
        state.currentHospital = action.payload;
      })
      .addCase(fetchHospitalDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload as string;
      });
  }
});
 
export const {
  setFilters,
  setOptions,
  setSearchResults,
  setLoading,
  resetFilters,
  clearCurrentHospital
} = hospitalSlice.actions;
 
export default hospitalSlice.reducer;