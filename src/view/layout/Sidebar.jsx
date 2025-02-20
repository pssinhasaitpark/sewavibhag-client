// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import {
//   FaRocket,
//   FaUsers,
//   FaTv,
//   FaUser,Shield,
//   FaTimes,
//   FaBars,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux"; // Import useSelector
// import "./Sidebar.css";
// import BrandLogo from "../../assests/brandlogo.png";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Get user_type from Redux store
//   const user_type = useSelector((state) => state.auth.user?.user_type?.trim().toLowerCase() || "");
//   console.log("User  Type from Redux Store:", user_type); // Debugging log

//   // Check if the logged-in user is "Jila"
//   const isJilaUser  = user_type === "jila";

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <div className="hamburger" onClick={toggleSidebar}>
//         {isSidebarOpen ? <FaTimes className="svg1" size={20} /> : <FaBars size={20} />}
//       </div>
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-header" onClick={() => navigate("/dashboard")}>
//           <img 
//             src={BrandLogo} 
//             alt="Sewa Vibhag Logo" 
//             className="sidebar-logo" 
//             style={{ cursor: "pointer" }} 
//           />
//         </div>

//         <ul className="sidebar-menu">
//           <li>
//             <Link to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
//               <FaTv className="icon text-primary" />
//               <span>Dashboard</span>
//             </Link>
//           </li>

//           <div className="sidebar-section">Reporting</div>
//           <li>
//             <Link to="/dashboard/jilareport" className="sidebar-link" onClick={toggleSidebar}>
//               <FaRocket className="icon text-success" />
//               <span>View Form</span>
//             </Link>
//           </li>

//           <li>
//             <Link to="/dashboard/viewkendratable" className="sidebar-link" onClick={toggleSidebar}>
//               <FaUsers className="icon text-info" />
//               <span>View Reporting</span>
//             </Link>
//           </li>

//           {/* Hide User Management for Jila */}
//           {!isJilaUser  && (
//             <>
//               <div className="sidebar-section">User  Management</div>
//               <li>
//                 <Link to="/dashboard/create-user" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUser Shield className="icon text-warning" />
//                   <span>Create User</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/view-user" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUser Shield className="icon text-warning" />
//                   <span>View User</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/activity" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUser Shield className="icon text-warning" />
//                   <span>View Activity</span>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
//     </>
//   );
// };

// export default Sidebar;





// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { FaRocket, FaUsers, FaTv, FaUser, Shield, FaTimes, FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux"; // Import useSelector
// import "./Sidebar.css";
// import BrandLogo from "../../assests/brandlogo.png";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Get user_type from Redux store
//   const user_type = useSelector((state) => state.auth.user?.user_type?.trim().toLowerCase() || "");
//   console.log("User  Type from Redux Store:", user_type); // Debugging log

//   // Check if the logged-in user is "Jila"
//   const isJilaUser  = user_type === "jila";

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <div className="hamburger" onClick={toggleSidebar}>
//         {isSidebarOpen ? <FaTimes className="svg1" size={20} /> : <FaBars size={20} />}
//       </div>
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-header" onClick={() => navigate("/dashboard")}>
//           <img 
//             src={BrandLogo} 
//             alt="Sewa Vibhag Logo" 
//             className="sidebar-logo" 
//             style={{ cursor: "pointer" }} 
//           />
//         </div>

//         <ul className="sidebar-menu">
//           <li>
//             <Link to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
//               <FaTv className="icon text-primary" />
//               <span>Dashboard</span>
//             </Link>
//           </li>

//           <div className="sidebar-section">Reporting</div>
//           <li>
//             <Link to="/dashboard/jilareport" className="sidebar-link" onClick={toggleSidebar}>
//               <FaRocket className="icon text-success" />
//               <span>View Form</span>
//             </Link>
//           </li>

//           <li>
//             <Link to="/dashboard/viewkendratable" className="sidebar-link" onClick={toggleSidebar}>
//               <FaUsers className="icon text-info" />
//               <span>View Reporting</span>
//             </Link>
//           </li>

//           {/* Hide User Management for Jila */}
//           {!isJilaUser  && (
//             <>
//               <div className="sidebar-section">User  Management</div>
//               <li>
//                 <Link to={user_type === "prant" || user_type === "vibhag" || user_type === "jila"  ? "/dashboard/create-user2" : "dashboard/create-user"} className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUser Shield className="icon text-warning" />
//                   <span>Create User</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/view-user" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUser Shield className="icon text-warning" />
//                   <span>View User</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/activity" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUser Shield className="icon text-warning" />
//                   <span>View Activity</span>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
//     </>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaRocket, 
//   FaUsers, 
//   FaTv, 
//   FaUser, 
//   FaUserShield, 
//   FaUserCog, 
//   FaClipboardList, 
//   FaUserCheck, 
//   FaChartBar, 
//   FaList, 
//   FaTimes, 
//   FaBars 
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./Sidebar.css";
// import BrandLogo from "../../assests/brandlogo.png";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Get user_type from Redux store
//   const user_type = useSelector((state) => state.auth.user?.user_type?.trim().toLowerCase() || "");
//   console.log("User Type from Redux Store:", user_type); // Debugging log

//   // Check if the logged-in user is "Jila"
//   const isJilaUser = user_type === "jila";

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       {/* Hamburger Icon for Mobile View */}
//       <div className="hamburger" onClick={toggleSidebar}>
//         {isSidebarOpen ? <FaTimes className="svg1" size={20} /> : <FaBars size={20} />}
//       </div>

//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-header" onClick={() => navigate("/dashboard")}>
//           <img 
//             src={BrandLogo} 
//             alt="Sewa Vibhag Logo" 
//             className="sidebar-logo" 
//             style={{ cursor: "pointer" }} 
//           />
//         </div>

//         <ul className="sidebar-menu">
//           {/* Dashboard */}
//           <li>
//             <Link to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
//               <FaTv className="icon text-primary" />
//               <span>Dashboard</span>
//             </Link>
//           </li>

//           {/* Reporting Section */}
//           <div className="sidebar-section">📊 Reporting</div>
//           <li>
//             <Link to="/dashboard/jilareport" className="sidebar-link" onClick={toggleSidebar}>
//               <FaClipboardList className="icon text-success" />
//               <span>View Form</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/viewkendratable" className="sidebar-link" onClick={toggleSidebar}>
//               <FaChartBar className="icon text-info" />
//               <span>View Reporting</span>
//             </Link>
//           </li>

//           {/* User Management (Hidden for Jila) */}
//           {!isJilaUser && (
//             <>
//               <div className="sidebar-section">👤 User Management</div>
//               <li>
//                 <Link 
//                   to={["prant", "vibhag", "jila"].includes(user_type) ? "/dashboard/create-user2" : "/dashboard/create-user"} 
//                   className="sidebar-link" 
//                   onClick={toggleSidebar}
//                 >
//                   <FaUserShield className="icon text-warning" />
//                   <span>Create User</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/view-user" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUserCheck className="icon text-success" />
//                   <span>View Users</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/activity" className="sidebar-link" onClick={toggleSidebar}>
//                   <FaUserCog className="icon text-danger" />
//                   <span>View Activity</span>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Overlay when sidebar is open */}
//       {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
//     </>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTv, FaClipboardList, FaChartBar, FaUserShield, FaUserCheck, FaUserCog, FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import BrandLogo from "../../assests/brandlogo.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get current route
  const navigate = useNavigate();

  // Get user_type from Redux store
  const user_type = useSelector((state) => state.auth.user?.user_type?.trim().toLowerCase() || "");
  const isJilaUser = user_type === "jila";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile View */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes className="svg1" size={20} /> : <FaBars size={20} />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header" onClick={() => navigate("/dashboard")}>
          <img src={BrandLogo} alt="Sewa Vibhag Logo" className="sidebar-logo" style={{ cursor: "pointer" }} />
        </div>

        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li>
            <Link to="/dashboard" className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`} onClick={toggleSidebar}>
              <FaTv className="icon text-primary" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Reporting Section */}
          <div className="sidebar-section">📊 Reporting</div>
          <li>
            <Link to="/dashboard/jilareport" className={`sidebar-link ${location.pathname === "/dashboard/jilareport" ? "active" : ""}`} onClick={toggleSidebar}>
              <FaClipboardList className="icon text-success" />
              <span>View Form</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/viewkendratable" className={`sidebar-link ${location.pathname === "/dashboard/viewkendratable" ? "active" : ""}`} onClick={toggleSidebar}>
              <FaChartBar className="icon text-info" />
              <span>View Reporting</span>
            </Link>
          </li>

          {/* User Management (Hidden for Jila) */}
          {!isJilaUser && (
            <>
              <div className="sidebar-section">👤 User Management</div>
              <li>
                <Link to={["prant", "vibhag", "jila"].includes(user_type) ? "/dashboard/create-user2" : "/dashboard/create-user"} 
                      className={`sidebar-link ${location.pathname.includes("create-user") ? "active" : ""}`} 
                      onClick={toggleSidebar}>
                  <FaUserShield className="icon text-warning" />
                  <span>Create User</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/view-user" className={`sidebar-link ${location.pathname === "/dashboard/view-user" ? "active" : ""}`} onClick={toggleSidebar}>
                  <FaUserCheck className="icon text-success" />
                  <span>View Users</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/activity" className={`sidebar-link ${location.pathname === "/dashboard/activity" ? "active" : ""}`} onClick={toggleSidebar}>
                  <FaUserCog className="icon text-danger" />
                  <span>View Activity</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
