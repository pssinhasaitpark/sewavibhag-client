import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

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

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
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
        <Sidebar isOpen={isSidebarOpen} language={language} />
      </div>

      {/* Main content */}
      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          marginTop: "0",
        }}
      >
        <Header
          onMenuClick={handleMenuClick}
          style={{
            marginLeft: isSidebarOpen && !isMobile ? "250px" : "0" // Push content for sidebar on desktop
          }}
          language={language}
          onLanguageChange={handleLanguageChange}
        />

        {isMobile && (
          <button onClick={handleMenuClick} className="d-md-none">
            ☰
          </button>
        )}

        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
