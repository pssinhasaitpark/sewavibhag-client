import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import profileReducer from "../slice/AuthSlice";
import hierarchyReducer from "../slice/hierarchySlice";
import HeaderSlice from "../slice/HeaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    hierarchy: hierarchyReducer,
    header: HeaderSlice,
  },
});
