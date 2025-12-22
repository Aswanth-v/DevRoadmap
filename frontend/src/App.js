import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import Authentication from "./components/Authenticaton";
import Dashboard from "./page/admin/Dashbaord";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Exclusive from "./page/common/Exclusive";
import Favorate from "./page/Favorate";
const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          <Authentication isAuthenticated={isAuthenticated} user={user}>
            <Login />
          </Authentication>
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          <Authentication isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
            <Register />
          </Authentication>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* Unauthorized Page */}
      <Route path="/unauth-page" element={<h1>Not Allowed</h1>} />
      <Route path="/exclusive" element={<Exclusive />} />
      <Route path="/fav" element={<Favorate />} />

    </Routes>
  );
};

export default App;
