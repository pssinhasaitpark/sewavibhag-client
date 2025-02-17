import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import profileReducer from "../slice/AuthSlice";
import hierarchyReducer from "../slice/hierarchySlice";
import ViewUserSliceReducer from "../slice/ViewUsersSlice"; 
import reportReducer from "../slice/JilaReportSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    hierarchy: hierarchyReducer,
    report: reportReducer,
    ViewUserSlice: ViewUserSliceReducer,
  },
});
