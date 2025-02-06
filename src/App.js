
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./view/layout/Dashboard";
import DashboardCards from "./view/components/DashboardCards";
import Jilareport from "./view/components/Jilareport";
import ViewKendraTable from "./view/components/table/ViewKendraTable";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the Dashboard route with nested routes */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardCards />} /> {/* Default route */}
          <Route path="dashboard/jilareport" element={<Jilareport />} /> {/* Nested route */}
          <Route path="/dashboard/viewkendratable" element={<ViewKendraTable />} /> {/* Nested route */}
        </Route>
      </Routes>
    </Router>
  );
}
export default App;