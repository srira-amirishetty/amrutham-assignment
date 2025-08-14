import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (_,{rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-categories`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
