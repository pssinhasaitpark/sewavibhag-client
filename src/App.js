import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
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
import ProfilePage from "./view/pages/ProfilePage/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateUser from "./view/pages/CreateUser";
import ViewUsers from "./view/components/table/ViewUsers";
import ActivityTable from "./view/components/table/ViewActivity";
import NotFound from "./view/pages/404PageNotFound/PageNotFound";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // List of protected routes
  const protectedRoutes = [
    "/dashboard",
    "/dashboard/jilareport",
    "/dashboard/viewkendratable",
    "/dashboard/profile",
    "/dashboard/view-user",
    "/dashboard/create-user",
    "/dashboard/activity",
  ];

  // Check if user is on a 404 Page
  const isNotFoundPage = ![...protectedRoutes, "/login"].includes(location.pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLoginPage) {
      localStorage.removeItem("token");
    }
  }, [isLoginPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!protectedRoutes.includes(location.pathname)) {
      // If user manually changes URL to a non-protected route, clear the token
      localStorage.removeItem("token");
    }

    // Redirect to login if no token
    if (!token && protectedRoutes.includes(location.pathname)) {
      window.location.href = "/login";
    }
  }, [location.pathname]);

  return (
    <div className="d-flex">
     
      {!isLoginPage && !isNotFoundPage && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      )}


      <div className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"} flex-grow-1`}>

        {!isLoginPage && !isNotFoundPage && !isMobile && <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

        <div className="content-container p-0">
          <Routes>
           
            <Route path="/" element={<Navigate to="/login" replace />} />

          
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardCards />} />
                <Route path="jilareport" element={<Jilareport />} />
                <Route path="viewkendratable" element={<ViewKendraTable />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="view-user" element={<ViewUsers />} />
                <Route path="create-user" element={<CreateUser />} />
                <Route path="activity" element={<ActivityTable />} />
              </Route>
            </Route>

          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
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
