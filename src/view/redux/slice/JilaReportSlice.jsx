import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Async thunk to fetch Vibhag list
export const fetchVibhagList = createAsyncThunk(
  "jilareport/fetchVibhagList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/prantAndVibhag`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchFormDataByJila = createAsyncThunk(
  "jilareport/fetchFormDataByJila",
  async (jila_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/reportingFormByJila?jila_id=${jila_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data || null;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateReportingForm = createAsyncThunk(
  "jilareport/updateReportingForm",
  async ({ jila_id, values }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/reporting-forms/update?jila_id=${jila_id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const jilareportSlice = createSlice({
  name: "jilareport",
  initialState: {
    vibhagList: [],
    formData: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearFormData: (state) => {
      state.formData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVibhagList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVibhagList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vibhagList = action.payload;
      })
      .addCase(fetchVibhagList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFormDataByJila.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFormDataByJila.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formData = action.payload;
      })
      .addCase(fetchFormDataByJila.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateReportingForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReportingForm.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateReportingForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearFormData } = jilareportSlice.actions;
export default jilareportSlice.reducer;
