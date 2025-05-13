import { configureStore } from "@reduxjs/toolkit";
import hospitalSlice from "./features/hospitalSlice"; // Hospital API reducer
import hospitalMapReducer from "./features/hospitalMapSlice"; // Hospital API reducer

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    hospital: hospitalSlice,
    hospitalMap: hospitalMapReducer
  },
});

if (typeof window !== "undefined") {
    (window as any).store = store; 
  }


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;