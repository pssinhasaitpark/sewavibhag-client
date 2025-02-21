import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 🔹 Async action for login
// 🔹 Async action for login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/login`, {
      user_name: userData.user_name,
      password: userData.password,
    });

    const userDataResponse = response.data.data; // Extract `data` object
    localStorage.setItem("token", userDataResponse.token);
    localStorage.setItem("user", JSON.stringify({
      ...userDataResponse, // Include user type and user_id
      user_type: userDataResponse.user_type,
      user_type_id: userDataResponse.user_type_id
    }));

    return userDataResponse; // This includes `token`, `user_type`, `user_type_id`
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Something went wrong");
  }
});

// 🔹 Async action for fetching user profile
export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");

    const response = await axios.get(`${BASE_URL}/api/v1/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data.data;
    localStorage.setItem("user", JSON.stringify(user)); // Store updated user data, includes `user_type` and `user_type_id`
    return user;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : "Something went wrong");
  }
});


// 🔹 Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;




