

import { configureStore } from "@reduxjs/toolkit";
import apiUsersReducer from "./apiUsersSlice";

const store = configureStore({
  reducer: {
    apiUsers: apiUsersReducer,
  },
});

export default store;
