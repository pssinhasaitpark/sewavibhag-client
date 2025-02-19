import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/v1/hierarchy`;

// Async Thunk for fetching hierarchy data with authentication token
export const fetchHierarchy = createAsyncThunk("hierarchy/fetch", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const hierarchySlice = createSlice({
  name: "hierarchy",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHierarchy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHierarchy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHierarchy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch data";
      });
  },
});

export default hierarchySlice.reducer;
