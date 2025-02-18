import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import profileReducer from "../slice/AuthSlice";
import hierarchyReducer from "../slice/hierarchySlice";
<<<<<<< HEAD
import HeaderSlice from "../slice/HeaderSlice";
=======
import ViewUserSliceReducer from "../slice/ViewUsersSlice"; 
import reportReducer from "../slice/JilaReportSlice"
>>>>>>> e5a92db4f8ecc42d683a4080dbd5b1671068da69

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    hierarchy: hierarchyReducer,
<<<<<<< HEAD
    header: HeaderSlice,
=======
    report: reportReducer,
    ViewUserSlice: ViewUserSliceReducer,
>>>>>>> e5a92db4f8ecc42d683a4080dbd5b1671068da69
  },
});
