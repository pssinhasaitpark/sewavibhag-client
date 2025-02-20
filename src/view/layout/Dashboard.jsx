import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex flex-column ">
      {/* Sidebar */}
      <div
        className={`sidebar p-3 ${isSidebarOpen || !isMobile ? "d-block" : "d-none"}`}
        style={{
          top: "0",
          left: "0",
          height: "100vh",
          zIndex: 100,
          width: "250px",
          position: isMobile ? "absolute" : "fixed",
          transform: isMobile && !isSidebarOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Add a button to toggle the sidebar */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn btn-primary"
          >
            Toggle Sidebar
          </button>
        )}
      </div>

      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          marginTop: "0",
        }}
      >
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
