import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import profileSlice from "../slice/profileSlice";
import hierarchyReducer from "../slice/hierarchySlice";
import HeaderSlice from "../slice/HeaderSlice";
import ViewUserSliceReducer from "../slice/ViewUsersSlice"; 
import reportReducer from "../slice/JilaReportSlice"
import viewActivitiesReducer from "../slice/ViewActivity";
import languageReducer from "../slice/LanguageSlice"
import jilareportReducer from "../slice/JilaReportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice,
    hierarchy: hierarchyReducer,
    header: HeaderSlice,
    report: reportReducer,
    ViewUserSlice: ViewUserSliceReducer,
    viewActivities: viewActivitiesReducer,
    jilareport:jilareportReducer,
    language: languageReducer,
  },
});
