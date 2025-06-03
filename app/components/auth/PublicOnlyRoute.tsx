import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicOnlyRoute = () => {
  const isAuthenticated = localStorage.getItem("authToken");

  return isAuthenticated ? (
    <Navigate
      to="/dashboard"
      replace
    />
  ) : (
    <Outlet />
  );
};

export default PublicOnlyRoute;
