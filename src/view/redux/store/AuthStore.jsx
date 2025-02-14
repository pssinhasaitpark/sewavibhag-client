import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import profileReducer from "../slice/AuthSlice";
import hierarchyReducer from "../slice/hierarchySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    hierarchy: hierarchyReducer,
  },
});
