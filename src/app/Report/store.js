import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "../../features/Reports/reportSlice";

export const store = configureStore({
  reducer: {
    reports: reportReducer,
  },
});
