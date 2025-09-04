import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice.js";
import jwtDecode from "jwt-decode"; // ✅ correct import

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      dispatch(logout());
      alert("Session expired, please login again");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
