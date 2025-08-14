import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../API/Auth";

const savedUser = JSON.parse(localStorage.getItem("user")) || [];

const loginSlice = createSlice({
  name: "users/loginUser",
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
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [action.payload]; // Store logged-in user data
        localStorage.setItem("user", JSON.stringify(state.data));
        let storedUser
        storedUser = JSON.parse(localStorage.getItem("user"));
        console.log("storedUser:", storedUser);  // Debug stored user

      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;