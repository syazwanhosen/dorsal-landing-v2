import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage

import hospitalSlice from "./features/hospitalSlice";
import hospitalMapReducer from "./features/hospitalMapSlice"; // Hospital map reducer

// ✅ Redux Persist configuration for `hospitalMapSlice`
const persistConfig = {
  key: "hospitalMap",
  storage, // Store state in localStorage
};

const persistedHospitalMapReducer = persistReducer(persistConfig, hospitalMapReducer);

export const store = configureStore({
  reducer: {
    hospital: hospitalSlice,
    hospitalMap: persistedHospitalMapReducer, // Wrap with Redux Persist
  },
});

// ✅ Create persistor to manage persisted state
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
