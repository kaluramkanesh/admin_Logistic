import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Example: Replace with your API endpoint
const API_URL = "https://api.example.com/reports";

export const saveReportSettings = createAsyncThunk(
  "reports/saveReportSettings",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    enablePhoneVisibility: false,
    businessEmail: "",
    businessContact: "",
    operationEmail: "",
    operationContact: "",
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    togglePhoneVisibility: (state) => {
      state.enablePhoneVisibility = !state.enablePhoneVisibility;
    },
    setField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveReportSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveReportSettings.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveReportSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { togglePhoneVisibility, setField } = reportSlice.actions;
export default reportSlice.reducer;
