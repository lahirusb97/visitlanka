import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ userDAta }) {
  return userDAta ? <Outlet /> : <Navigate to="/" />;
}
