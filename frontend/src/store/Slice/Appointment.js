import { createSlice } from "@reduxjs/toolkit";
import { fetchAppointments,createAppointment,deleteAppointment,verifyOtpAndBook,GetMonthStatus } from "../API/Appointment";

const initialState = {
  data: [], // Align with array structure
  loading: false,
  error: null,
};

const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.getAppointments = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.createappointment = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteAppointment = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtpAndBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpAndBook.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyOtpAndBook = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(verifyOtpAndBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetMonthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMonthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.GetmonthStatus = [action.payload]; // Flat business object array
        state.error = null;
      })
      .addCase(GetMonthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default AppointmentSlice.reducer;