
// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./view/redux/store/AuthStore";
// import PrivateRoute from "./view/routes/privateRoutes/PrivateRoutes";
// import Dashboard from "./view/layout/Dashboard";
// import DashboardCards from "./view/components/DashboardCards";
// import Jilareport from "./view/components/Jilareport";
// import ViewKendraTable from "./view/components/table/ViewKendraTable";
// import Login from "./view/pages/login/Login";
// import Sidebar from "./view/layout/Sidebar";
// import Header from "./view/layout/Header";
// import ProfilePage from "./view/pages/ProfilePage/ProfilePage";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import CreateUser2 from "./view/pages/CreateUser2";
// import CreateUser  from "./view/pages/CreateUser";
// import ViewUsers from "./view/components/table/ViewUsers";
// import ActivityTable from "./view/components/table/ViewActivity";

// function Layout() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/"; 

//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setIsSidebarOpen(true);
//       } else {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="d-flex">
//       {/* Sidebar */}
//       {!isLoginPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

//       {/* Main Content */}
//       <div className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"} flex-grow-1`}>
//         {!isLoginPage && <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

//         <div className="content-container p-0">
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route element={<PrivateRoute />}>
//               <Route path="/dashboard" element={<Dashboard />}>
//                 <Route index element={<DashboardCards />} />
//                 <Route path="jilareport" element={<Jilareport />} />
//                 <Route path="viewkendratable" element={<ViewKendraTable />} />
//                 <Route path="profile" element={<ProfilePage />} />
//                 <Route path="view-user" element={<ViewUsers />} />
//                 <Route path="create-user" element={<CreateUser  />} />
//                 <Route path="create-user2" element={<CreateUser2 />} />
//                 <Route path="activity" element={<ActivityTable />} />
//               </Route>
//             </Route>
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Layout />
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;





import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
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
  const { user } = useSelector((state) => state.auth); // ✅ Move useSelector outside of condition

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

  // ✅ Handle redirection inside the return statement
  if (isLoginPage && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {!isLoginPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"} flex-grow-1`}>
        {!isLoginPage && <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

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
