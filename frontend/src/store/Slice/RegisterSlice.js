import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../API/Auth";

const RegisterUser = createSlice({
  name: "users/register",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
        // localStorage.setItem("user", JSON.stringify(state.data));
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default RegisterUser.reducer;