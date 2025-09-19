import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for posting shipment settings
export const submitShipmentSettings = createAsyncThunk(
  "shipment/submit",
  async (settings) => {
    const response = await axios.post("/api/shipment-settings", settings); 
    return response.data;
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    splitShipment: false,
    directShip: false,
    orderVerification: false,
    verifyCOD: false,
    verifyPrepaid: false,
    status: "idle",
    error: null,
  },
  reducers: {
    toggleSetting: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitShipmentSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitShipmentSettings.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitShipmentSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleSetting } = shipmentSlice.actions;
export default shipmentSlice.reducer;
