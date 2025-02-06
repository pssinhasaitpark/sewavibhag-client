  import React, { useState } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import {
    FaRocket,
    FaUsers,
    FaTasks,
    FaTv,
    FaUserShield,
    FaMapMarkerAlt,
  } from "react-icons/fa";
  import { Link } from "react-router-dom"; 
  import sidelogo from "../../assests/sewavibhag.png";
import "./Sidebar.css"
  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); 
    const [isMobileOpen, setIsMobileOpen] = useState(false); 

  
    const toggleMobileSidebar = () => {
      setIsMobileOpen(!isMobileOpen);
    };

    return (
      <div className="d-flex p-3">
        {/* Sidebar */}
        <div
          className={`bg-white ${isOpen ? "d-block" : "d-none d-md-block"} sidebar`}
          style={{
            position: "fixed",  
            top: "0",  
            left: "0",
            height: "100vh",  
            width: "250px",  // Sidebar width
            zIndex: 100,  // Ensure the sidebar stays on top
            transition: "transform 0.3s ease",  // Smooth transition for toggle
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",  // Added Shadow for aesthetic
            borderRadius: "8px",  // Rounded corners
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <img
              alt="RSS logo"
              className="mb-5"
              src={sidelogo}
              style={{ width: "100px", height: "auto" }}
            />
          </div>

          <div className="px-3">
            <ul className="list-unstyled">
              {/* Sidebar links */}
              <li>
                <Link
                  to="/dashboard"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", // Added gap between icon and text
                  }}
                >
                  <FaTv className="text-primary" />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", 
                  }}
                >
                  <FaUserShield className="text-warning" />
                  <span>Create Sub Admin</span>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", 
                  }}
                >
                  <FaMapMarkerAlt className="text-danger" />
                  <span>View Sub Admin</span>
                </Link>
              </li>

              <hr />

              <div className="text-muted text-xs px-2">Reporting Form</div>
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
                    gap: "10px",  
                  }}
                >
                  <FaRocket className="text-success" />
                  <span> Create Reportings</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/viewkendratable"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", // Added gap between icon and text
                  }}
                >
                  <FaUsers className="text-info" />
                  <span>View Reportings</span>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", // Added gap between icon and text
                  }}
                >
                  <FaTasks className="text-secondary" />
                  <span>Assign Survey</span>
                </Link>
              </li>

              <hr />

              {/* Nagar Section */}
              <div className="text-muted text-xs px-2">NAGAR</div>
              <li>
                <Link
                  to="#"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", // Added gap between icon and text
                  }}
                >
                  <FaRocket />
                  <span>Create Nagar</span>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="sidebar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    gap: "10px", 
                  }}
                >
                  <FaUsers />
                  <span>View Nagar</span>
                </Link>
              </li>

              <hr />
              {/* <div className="text-muted text-xs px-2">BASTI</div> */}
             

           
            </ul>
          </div>
        </div>

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
            onClick={toggleMobileSidebar} 
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
                // transform: "translateX(0)",
              }}
            >
              <div className="d-flex flex-column align-items-center py-4">
                <img
                  alt="RSS logo"
                  className="mb-4"
                  src={sidelogo}
                  style={{ width: "50px" }}
                />
              </div>
              <ul className="list-unstyled">
          
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
                      gap: "10px", 
                    }}
                  >
                    <FaTv className="text-primary" />
                    <span>Dashboard</span>
                  </Link>
                </li>
          
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Sidebar;




 