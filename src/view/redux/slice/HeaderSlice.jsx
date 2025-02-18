import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const fetchUserDetails = createAsyncThunk(
    "header/fetchUserDetails",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/v1/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch user data"
        );
      }
    } 
  );


const headerSlice = createSlice({
  name: "header",
  initialState: {
    user: null,
    displayName: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; 
        state.displayName = action.payload.data.user.user_type
         || ""; 
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default headerSlice.reducer;
