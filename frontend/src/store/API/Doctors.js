import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDoctors = createAsyncThunk(
  "fetchDoctors",
  async ({ search, category, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/doctors-get`, {
        params: {
          search,      
          category,
          page,
          limit: 12
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);





