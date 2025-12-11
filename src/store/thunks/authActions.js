// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../cofig/conig";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const res = await axios.get(`${BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, withCredentials:true
      });

      return res.data.user; // server should return { user: {..} }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);
