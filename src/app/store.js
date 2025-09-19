import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "../features/shipmentSlice";
import formReducer from "../features/LogisticsForm/formSlice";
import reportReducer from "../features/Reports/reportSlice.js";
import apiUsersReducer from "../redux/ApiUserRedux/apiUsersSlice"; // path adjust करो

const store = configureStore({
  reducer: {
    shipment: shipmentReducer,
    form: formReducer,
    reports: reportReducer,
    apiUsers: apiUsersReducer,
  },
});

export default store;
