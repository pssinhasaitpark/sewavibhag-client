// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// // Fetch user data
// export const fetchUser = createAsyncThunk(
//   "profile/fetchUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${BASE_URL}/api/v1/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       console.log("RESSSSSSSSSSSSSSSSS",response.data);
//       return response.data
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch user data"
//       );
//     }
//   }
// );


// export const updateUser = createAsyncThunk(
//   "profile/updateUser",
//   async (updatedData, { rejectWithValue, getState }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const userTypeId = getState().profile.user?.user_type_id;   
// console.log(token);

//       if (!userTypeId) {
//         return rejectWithValue("User Type ID not found");
//       }

//       const response = await axios.patch(
//         `${BASE_URL}/api/v1/update`,
//         { user_id: userTypeId, ...updatedData }, 
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to update user data"
//       );
//     }
//   }
// );





// const profileSlice = createSlice({
//   name: "profile",
//   initialState: {
//     user: null,
//     status: "idle", 
//     error: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.user = action.payload;
//         state.displayName = action.payload.data
//         || ""; 
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { setUser } = profileSlice.actions;
// export default profileSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// // Fetch user data
// export const fetchUser = createAsyncThunk(
//   "profile/fetchUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${BASE_URL}/api/v1/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);
//       return response.data
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch user data"
//       );
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "profile/updateUser",
//   async (updatedData, { rejectWithValue, getState }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const userTypeId = getState().profile.user?.user_type_id;

//       if (!userTypeId) {
//         return rejectWithValue("User Type ID not found");
//       }

//       const response = await axios.patch(
//         `${BASE_URL}/api/v1/update`,
//         { user_id: userTypeId, ...updatedData },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to update user data"
//       );
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "profile",
//   initialState: {
//     user: null,
//     displayName: "",
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data; 
//         state.displayName = action.payload.data.user.user_type
//          || ""; 
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setUser } = profileSlice.actions;
// export default profileSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// // Fetch user data
// export const fetchUser = createAsyncThunk(
//   "profile/fetchUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${BASE_URL}/api/v1/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch user data"
//       );
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "profile/updateUser",
//   async (updatedData, { rejectWithValue, getState }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const userTypeId = getState().profile.user?.user_type_id;

//       if (!userTypeId) {
//         return rejectWithValue("User Type ID not found");
//       }

//       const response = await axios.patch(
//         `${BASE_URL}/api/v1/update`,
//         { user_id: userTypeId, ...updatedData },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to update user data"
//       );
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "profile",
//   initialState: {
//     user: null,
//     kshetraName: "",
//     prantName: "",
//     vibhagName: "",
//     jilaName: "",
//     kendraName: "",
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data.user;
//         state.kshetraName = action.payload.data.kshetra_name || "";
//         state.prantName = action.payload.data.prant_name || "";
//         state.vibhagName = action.payload.data.vibhag_name || "";
//         state.jilaName = action.payload.data.jila_name || "";
//         state.kendraName = action.payload.data.kendra_name || "";
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });



// export const { setUser } = profileSlice.actions;
// export default profileSlice.reducer;


// -----------------------



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// // Fetch user data
// export const fetchUser = createAsyncThunk(
//   "profile/fetchUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${BASE_URL}/api/v1/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       console.log("API Resposnce", response.data);
//       return response.data; 
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch user data"
//       );
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "profile/updateUser",
//   async (updatedData, { rejectWithValue, getState }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const userTypeId = getState().profile.user?.user_type_id;

//       if (!userTypeId) {
//         return rejectWithValue("User Type ID not found");
//       }

//       const response = await axios.patch(
//         `${BASE_URL}/api/v1/update`,
//         { user_id: userTypeId, ...updatedData },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to update user data"
//       );
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "profile",
//   initialState: {
//     user: null,
//     kshetraName: "",
//     prantName: "",
//     vibhagName: "",
//     jilaName: "",
//     kendraName: "",
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.kshetraName = action.payload.kshetra_name || "";
//         state.prantName = action.payload.prant_name || "";
//         state.vibhagName = action.payload.vibhag_name || "";
//         state.jilaName = action.payload.jila_name || "";
//         state.kendraName = action.payload.kendra_name || "";        
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default profileSlice.reducer;


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

      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);
export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const userTypeId = getState().profile.user?.user_type_id;

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

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    kshetraName: "",
    prantName: "",
    vibhagName: "",
    jilaName: "",
    kendraName: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload; 
        state.user = data.user;
        state.kshetraName = data.kshetra_name || "";
        state.prantName = data.prant_name || "";
        state.vibhagName = data.vibhag_name || "";
        state.jilaName = data.jila_name || "";
        state.kendraName = data.kendra_name || "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
