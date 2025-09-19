import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fake async thunk (no API, just simulates success after delay)
export const submitForm = createAsyncThunk("form/submit", async (formData) => {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // return back the form data
  return { success: true, data: formData };
});

const formSlice = createSlice({
  name: "form",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.data[name] = value;
    },
    resetForm: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitForm.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.data = action.payload.data; // keep submitted data
})

      .addCase(submitForm.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
