import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRocket,
  FaUsers,
  FaTasks,
  FaTv,
  FaUserShield,
  FaMapMarkerAlt,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import sidelogo from "../../assests/sewavibhag.png";
import "./Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={sidelogo} alt="Sewa Vibhag Logo" className="sidebar-logo" />
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
              <FaTv className="icon text-primary" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="#" className="sidebar-link" onClick={toggleSidebar}>
              <FaUserShield className="icon text-warning" />
              <span>Create Sub Admin</span>
            </Link>
          </li>

          <li>
            <Link to="#" className="sidebar-link" onClick={toggleSidebar}>
              <FaMapMarkerAlt className="icon text-danger" />
              <span>View Sub Admin</span>
            </Link>
          </li>

          <hr />

          <div className="sidebar-section">Reporting Form</div>
          <li>
            <Link to="/dashboard/jilareport" className="sidebar-link" onClick={toggleSidebar}>
              <FaRocket className="icon text-success" />
              <span>Create Reportings</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/viewkendratable" className="sidebar-link" onClick={toggleSidebar}>
              <FaUsers className="icon text-info" />
              <span>View Reportings</span>
            </Link>
          </li>

          <li>
            <Link to="#" className="sidebar-link" onClick={toggleSidebar}>
              <FaTasks className="icon text-secondary" />
              <span>Assign Survey</span>
            </Link>
          </li>

          <hr />

          <div className="sidebar-section">NAGAR</div>
          <li>
            <Link to="#" className="sidebar-link" onClick={toggleSidebar}>
              <FaRocket className="icon" />
              <span>Create Nagar</span>
            </Link>
          </li>

          <li>
            <Link to="#" className="sidebar-link" onClick={toggleSidebar}>
              <FaUsers className="icon" />
              <span>View Nagar</span>
            </Link>
          </li>

          <hr />
        </ul>
      </div>

     
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;
