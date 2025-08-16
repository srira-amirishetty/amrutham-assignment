import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAppointments = createAsyncThunk(
  "fetchAppointments",
  async ({doctorId, date}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllAppointments`, {
        params: { doctorId, date }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// create appointment
export const createAppointment = createAsyncThunk(
  "createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create-appointment`, appointmentData, {
        params: appointmentData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
      }
  }
);

// delete appointmnet by appointment id
export const deleteAppointment = createAsyncThunk(
  "deleteAppointment",
  async ({doctorId, userId, date, timeSlot}, { rejectWithValue }) => {
    try {
      console.log(doctorId, userId, date, timeSlot);
      const response = await axios.delete(`${API_URL}/delete-appointment`, {data : {doctorId, userId, date, timeSlot}});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
    }
);

//verify otp 
export const verifyOtpAndBook = createAsyncThunk(
  "verifyOtpAndBook",
  async ({ userId, doctorId, date, timeSlot, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        userId,
        doctorId,
        date,
        timeSlot,
        otp
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//monthStatus
export const GetMonthStatus = createAsyncThunk(
  "getMonthStatus",
  async ({ doctorId, year, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getMonthStatus`, {
        params: { doctorId, year, month }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//get appointments by userid
export const getAppointmentByUserId = createAsyncThunk(
    "getAppointmnetByUserId",
  async ({ userId }, { rejectWithValue }) => {
    try {
      console.log(userId,"inapi")
      const response = await axios.get(`${API_URL}/getAppointmentsByUserId/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)

//get appointments by doctorID
export const getAppointmentByDoctorId = createAsyncThunk(
    "getAppointmnetByDoctorId",
  async ({ doctorId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/getAppointmentsByDoctorId/${doctorId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
    }
)

