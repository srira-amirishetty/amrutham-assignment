import { createSlice } from "@reduxjs/toolkit";
import { doctorLogin } from "../API/Auth";

const savedUser = JSON.parse(localStorage.getItem("user")) || [];

const doctorLoginSlice = createSlice({
  name: "doctor/loginUser",
  initialState: {
    data: savedUser,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.data = [];
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [action.payload]; // Store logged-in user data
        localStorage.setItem("user", JSON.stringify(state.data));
        let storedUser
        storedUser = JSON.parse(localStorage.getItem("user"));
        console.log("storedUser:", storedUser);  // Debug stored user

      })
      .addCase(doctorLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { logoutUser } = doctorLoginSlice.actions;
export default doctorLoginSlice.reducer;