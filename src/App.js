import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./view/redux/store/AuthStore";
import PrivateRoute from "./view/routes/privateRoutes/PrivateRoutes";
import Dashboard from "./view/layout/Dashboard";
import DashboardCards from "./view/components/DashboardCards";
import Jilareport from "./view/components/Jilareport";
import ViewKendraTable from "./view/components/table/ViewKendraTable";
import Login from "./view/pages/login/Login";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (

 
  

    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardCards />} />
              <Route path="jilareport" element={<Jilareport />} />
              <Route path="viewkendratable" element={<ViewKendraTable />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
