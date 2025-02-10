import React, { useState, useEffect } from "react";
import {
  BrowserRouter ,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./view/redux/store/AuthStore";
import PrivateRoute from "./view/routes/privateRoutes/PrivateRoutes";
import Dashboard from "./view/layout/Dashboard";
import DashboardCards from "./view/components/DashboardCards";
import Jilareport from "./view/components/Jilareport";
import ViewKendraTable from "./view/components/table/ViewKendraTable";
import Login from "./view/pages/login/Login";
import Sidebar from "./view/layout/Sidebar";
import Header from "./view/layout/Header";
import "./App.css"

import "bootstrap/dist/css/bootstrap.min.css";
import HierarchyBox from "./view/components/HierarchyBox";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; 

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">

      {!isLoginPage && (
        <>
          <Sidebar isOpen={isSidebarOpen} />
          <Header />
        </>
      )}

 
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardCards />} />
              <Route path="jilareport" element={<Jilareport />} />
              <Route path="viewkendratable" element={<ViewKendraTable />} />
              <Route path="/dashboard/revieved" element={<HierarchyBox />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
