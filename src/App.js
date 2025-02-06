import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/layout/Dashboard";
import DashboardCards from "./view/components/DashboardCards";
import Jilareport from "./view/components/Jilareport";
import ViewKendraTable from "./view/components/table/ViewKendraTable";
import LoginForm from "./view/pages/login/Login";  // Import the LoginForm component

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<LoginForm />} /> {/* This is the home page with the login form */}
        
        {/* Define the Dashboard route with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardCards />} /> {/* Default route */}
          <Route path="jilareport" element={<Jilareport />} /> {/* Nested route */}
          <Route path="viewkendratable" element={<ViewKendraTable />} /> {/* Nested route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
