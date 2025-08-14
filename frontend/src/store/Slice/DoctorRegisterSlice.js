import { createSlice } from "@reduxjs/toolkit";
import { doctorRegister } from "../API/Auth";

const RegisterDoctor = createSlice({
  name: "doctor/register",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doctorRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doctorRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
        // localStorage.setItem("user", JSON.stringify(state.data));
      })
      .addCase(doctorRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default RegisterDoctor.reducer;