import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch user data
export const fetchUser = createAsyncThunk(
  "profile/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/v1/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Full User Response:", response.data.data.user._id)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  } 
);

// Update user profile
export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const userTypeId = getState().profile.user?.user_type_id;   
console.log(token);

      if (!userTypeId) {
        return rejectWithValue("User Type ID not found");
      }

      const response = await axios.patch(
        `${BASE_URL}/api/v1/update`,
        { user_id: userTypeId, ...updatedData }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update user data"
      );
    }
  }
);
// export const updateUser = createAsyncThunk(
//   "profile/updateUser",
//   async (updatedData, { rejectWithValue, getState }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const userId = getState().profile.user?.user_id;

//       console.log("User Type ID:", userId);
//       console.log("Updating Data:", updatedData);

//       if (!userId) {
//         console.error("User Type ID not found");
//         return rejectWithValue("User Type ID not found");
//       }

//       const response = await axios.patch(
//         `${BASE_URL}/api/v1/update`,
//         { user_id: userId, ...updatedData },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Update Response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Update Error:", error.response?.data || error.message);
//       return rejectWithValue(
//         error.response?.data || "Failed to update user data"
//       );
//     }
//   }
// );




const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
