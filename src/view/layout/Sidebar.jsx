import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRocket,
  FaUsers,
  FaTasks,
  FaTv,
  FaUserShield,
  FaMapMarkerAlt,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom"; 
import sidelogo from "../../assests/sewavibhag.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile sidebar state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-white ${isOpen ? "d-block" : "d-none d-md-block"} sidebar`}
        style={{
          position: "fixed",  // Fixed positioning to stick to the top
          top: "0",  // Sidebar sticks to the top of the page
          left: "0",
          height: "100vh",  // Full height of the viewport
          width: "250px",  // Sidebar width
          zIndex: 100,  // Ensure the sidebar stays on top
          transition: "transform 0.3s ease",  // Smooth transition for toggle
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",  // Added Shadow for aesthetic
          borderRadius: "8px",  // Rounded corners
        }}
      >
        <div className="d-flex flex-column align-items-center py-4">
          <img
            alt="RSS logo"
            className="mb-4"
            src={sidelogo}
            style={{ width: "100px", height: "auto" }}
          />
        </div>

        <div className="px-3">
          <ul className="list-unstyled">
            {/* Sidebar links */}
            <li>
              <Link
                to="/"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaTv className="text-primary mr-2" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/create-sub-admin"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaUserShield className="text-warning mr-2" />
                <span>Create Sub Admin</span>
              </Link>
            </li>

            <li>
              <Link
                to="/view-sub-admin"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaMapMarkerAlt className="text-danger mr-2" />
                <span>View Sub Admin</span>
              </Link>
            </li>

            <hr />

            {/* App User Section */}
            <div className="text-muted text-xs px-2">APP USER</div>
            <li>
              <Link
                to="/dashboard/jilareport" 
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaRocket className="text-success mr-2" />
                <span>Create User</span>
              </Link>
            </li>

            <li>
              <Link
                to="/view-user"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaUsers className="text-info mr-2" />
                <span>View User</span>
              </Link>
            </li>

            <li>
              <Link
                to="/assign-survey"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaTasks className="text-secondary mr-2" />
                <span>Assign Survey</span>
              </Link>
            </li>

            <hr />

            {/* Nagar Section */}
            <div className="text-muted text-xs px-2">NAGAR</div>
            <li>
              <Link
                to="/create-nagar"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaRocket className="mr-2" />
                <span>Create Nagar</span>
              </Link>
            </li>

            <li>
              <Link
                to="/view-nagar"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaUsers className="mr-2" />
                <span>View Nagar</span>
              </Link>
            </li>

            <hr />

            {/* Basti Section */}
            <div className="text-muted text-xs px-2">BASTI</div>
            <li>
              <Link
                to="/create-basti"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaRocket className="mr-2" />
                <span>Create Basti</span>
              </Link>
            </li>

            <li>
              <Link
                to="/view-basti"
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
              >
                <FaUsers className="mr-2" />
                <span>View Basti</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Hamburger Menu Button for Mobile View */}
      <div
        className="d-md-none"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: "110",
        }}
      >
        <FaBars size={30} onClick={toggleMobileSidebar} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div
          className="mobile-sidebar-overlay"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "100",
          }}
          onClick={toggleMobileSidebar} // Close when clicking on overlay
        >
          <div
            className="bg-white sidebar p-3"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "250px",
              height: "100vh",
              zIndex: "101",
              boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              transition: "transform 0.3s ease",
              transform: "translateX(0)",
            }}
          >
            <div className="d-flex flex-column align-items-center py-4">
              <img
                alt="RSS logo"
                className="mb-4"
                src={sidelogo}
                style={{ width: "100px", height: "auto" }}
              />
            </div>
            <ul className="list-unstyled">
              {/* Same sidebar links for mobile */}
              <li>
                <Link
                  to="/"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                  }}
                >
                  <FaTv className="text-primary mr-2" />
                  <span>Dashboard</span>
                </Link>
              </li>
              {/* More links... */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
