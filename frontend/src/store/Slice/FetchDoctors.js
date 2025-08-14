import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctors } from "../API/Doctors";

const initialState = {
  data: [], // Align with array structure
  loading: false,
  error: null,
};

const DoctorsSlice = createSlice({
  name: "doctors/fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.getDoctors = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default DoctorsSlice.reducer;