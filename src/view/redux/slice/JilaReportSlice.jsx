import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  vibhagList: [],
  jilaList: [],
  formData: null,
  status: 'idle',
  error: null,
  message: '',
  formSubmissionStatus: 'idle',
  formSubmissionError: null,
};

export const fetchVibhagList = createAsyncThunk(
  'report/fetchVibhagList',
  async (userType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/v1/prantAndVibhag`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchFormData = createAsyncThunk(
  'report/fetchFormData',
  async (jilaId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/v1/reportingFormByJila?jila_id=${jilaId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching form data");
    }
  }
);

export const submitFormData = createAsyncThunk(
  'report/submitFormData',
  async (values, { getState, rejectWithValue }) => {
    try {
      const userType = getState().auth.user.user_type;
      const token = localStorage.getItem("token");
      let response;
      if (userType === 'prant' || userType === 'vibhag') {
        response = await axios.patch(
          `${BASE_URL}/api/v1/reporting-forms/update?jila_id=${values.jila_id}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(`${BASE_URL}/api/v1/reporting-forms`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error submitting form');
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVibhagList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVibhagList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vibhagList = action.payload;
      })
      .addCase(fetchVibhagList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload;
      })
      .addCase(fetchFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
     
      .addCase(submitFormData.pending, (state) => {
        state.formSubmissionStatus = 'loading';
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.formSubmissionStatus = 'succeeded';
        state.message = action.payload.message;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.formSubmissionStatus = 'failed';
        state.formSubmissionError = action.payload;
      });
  },
});

export default reportSlice.reducer;
