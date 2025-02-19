import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRocket,
  FaUsers,
  FaTv,
  FaUserShield,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import BrandLogo from "../../assests/brandlogo.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes className="svg1" size={20} /> : <FaBars size={20} />}
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={BrandLogo} alt="Sewa Vibhag Logo" className="sidebar-logo" />
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
              <FaTv className="icon text-primary" />
              <span>Dashboard</span>
            </Link>
          </li>

          <div className="sidebar-section">Reporting</div>
          <li>
            <Link to="/dashboard/jilareport" className="sidebar-link" onClick={toggleSidebar}>
              <FaRocket className="icon text-success" />
              <span>View Form</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/viewkendratable" className="sidebar-link" onClick={toggleSidebar}>
              <FaUsers className="icon text-info" />
              <span>View Reporting</span>
            </Link>
          </li>

          <div className="sidebar-section">User Management</div>
          <li>
            <Link to="/dashboard/create-user" className="sidebar-link" onClick={toggleSidebar}>
              <FaUserShield className="icon text-warning" />
              <span>Create User</span>
            </Link>
          </li>
        </ul>
      </div>

     

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
