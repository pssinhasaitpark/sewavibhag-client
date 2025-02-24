import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import CreateUser2 from "./view/pages/CreateUser2";
import CreateUser from "./view/pages/CreateUser";
import ViewUsers from "./view/components/table/ViewUsers";
import ActivityTable from "./view/components/table/ViewActivity";


function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";


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

  return (
    <div className="d-flex">
 
      {!isLoginPage &&   (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      )}
0
      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"} flex-grow-1`}>
  
        {!isLoginPage &&<Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

        <div className="content-container p-0">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardCards />} />
                <Route path="jilareport" element={<Jilareport />} />
                <Route path="viewkendratable" element={<ViewKendraTable />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="view-user" element={<ViewUsers />} />
                <Route path="create-user" element={<CreateUser />} />
                <Route path="create-user2" element={<CreateUser2 />} />
                <Route path="activity" element={<ActivityTable />} />
              </Route>
            </Route>

            <Route path="*" element={<ActivityTable />} />
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
