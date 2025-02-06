import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Sidebar */}
      <div
        className={`sidebar p-3 position-fixed ${isSidebarOpen ? "d-block" : "d-none d-md-block"}`}
        style={{
          top: "0",  // Sidebar sticks directly to the top
          left: "0",
          height: "100vh",  // Full height of the viewport
          zIndex: 100,
          width: "250px",  // Sidebar width
          transition: "transform 0.3s ease-in-out", // Smooth transition for sidebar toggle
        }}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0", // Adjust for sidebar toggle
          transition: "margin-left 0.3s ease-in-out", // Smooth transition for content area shift
          marginTop: "0", // Make sure the content starts from the top without any margin from the header
        }}
      >
        {/* Header - Adjust the margin to shift it to the right */}
        <Header onMenuClick={handleMenuClick} style={{ marginLeft: isSidebarOpen ? "250px" : "0" }} />

        {/* Content Area */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
