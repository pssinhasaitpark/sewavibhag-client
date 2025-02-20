import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  activities: [],
  status: 'idle', 
  error: null,
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/v1/view-activities`;




export const viewActivities = createAsyncThunk('users/viewActivities', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        
        return response.data.logs;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

const viewActivitiesSlice = createSlice({
    name: 'viewActivities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(viewActivities.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(viewActivities.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.activities = action.payload;
        })
        .addCase(viewActivities.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message;
        });
    },
  });
  
export default viewActivitiesSlice.reducer;
