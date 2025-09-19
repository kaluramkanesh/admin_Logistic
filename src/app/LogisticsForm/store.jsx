import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "../../features/shipmentSlice";
import formReducer from "../../features/LogisticsForm/formSlice";
import reportReducer from "../../features/Reports/reportSlice";

const store = configureStore({
  reducer: {
    shipment: shipmentReducer,
    form: formReducer,
    reports: reportReducer,
  },
});

export default store;
