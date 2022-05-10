import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();

    console.log("auth.role in RequireAuth", auth?.role);

  return (
    allowedRoles?.includes(auth?.role)
    ? <Outlet />
    : auth?.username
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;