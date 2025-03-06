import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTv, FaClipboardList, FaChartBar, FaUserShield, FaUserCheck, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import BrandLogo from "../../assests/brandlogo.png";
import fieldLabels from "../components/FiledLabels";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);

  const user_type = useSelector((state) => state.auth.user?.user_type?.trim().toLowerCase() || "");
  const isJilaUser = user_type === "jila";

  const isUserManagementActive = ["/dashboard/create-user", "/dashboard/create-user", "/dashboard/view-user"].some((path) =>
    location.pathname.includes(path)
  );

  const isViewReportingActive = ["/dashboard/jilareport", "/dashboard/viewkendratable"].some((path) =>
    location.pathname.includes(path)
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes className="svg1" size={20} /> : <FaBars size={20} />}
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header" onClick={() => navigate("/dashboard")}>
          <img src={BrandLogo} alt="Sewa Vibhag Logo" className="sidebar-logo" style={{ cursor: "pointer" }} />
        </div>

        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li>
            <Link to="/dashboard" className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`} onClick={toggleSidebar}>
              <FaTv className="icon text-primary" />
              <span>{fieldLabels[language]?.Dashboard}</span>
            </Link>
          </li>

          {/* <div className={`sidebar-section ${isViewReportingActive ? "active" : ""}`}> 📊 Reporting</div> */}
          {/* Reporting Section */}
          <div className={`sidebar-section ${isViewReportingActive ? "active" : ""}`}>📊 {fieldLabels[language]?.Reporting}</div>
          <li>
            <Link to="/dashboard/jilareport" className={`sidebar-link ${location.pathname === "/dashboard/jilareport" ? "active" : ""}`} onClick={toggleSidebar}>
              <FaClipboardList className="icon text-success" />
              <span>{fieldLabels[language]?.ViewForm}</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/viewkendratable" className={`sidebar-link ${location.pathname === "/dashboard/viewkendratable" ? "active" : ""}`} onClick={toggleSidebar}>
              <FaChartBar className="icon text-info" />
              <span>{fieldLabels[language]?.ViewReporting}</span>
            </Link>
          </li>

       
          {!isJilaUser && (
            <>
            
              {/* <div className={`sidebar-section ${isUserManagementActive ? "active" : ""}`}>👤 User Management</div> */}

              <div className={`sidebar-section ${isUserManagementActive ? "active" : ""}`}>👤 {fieldLabels[language]?.UserManagement}</div>
              <li>
                <Link
                  to={["prant", "vibhag", "jila"].includes(user_type) ? "/dashboard/create-user" : "/dashboard/create-user"}
                  className={`sidebar-link ${location.pathname.includes("create-user") ? "active" : ""}`}
                  onClick={toggleSidebar}
                >
                  <FaUserShield className="icon text-warning" />
                  <span>{fieldLabels[language]?.CreateUser}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/view-user"
                  className={`sidebar-link ${location.pathname === "/dashboard/view-user" ? "active" : ""}`}
                  onClick={toggleSidebar}
                >
                  <FaUserCheck className="icon text-success" />
                  <span>{fieldLabels[language]?.ViewUsers}</span>
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
