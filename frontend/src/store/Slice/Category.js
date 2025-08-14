import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../API/categories";

const initialState = {
  data: [], // Align with array structure
  loading: false,
  error: null,
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.getCategories = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default CategorySlice.reducer;