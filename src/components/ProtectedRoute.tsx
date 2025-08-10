import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  console.log('ProtectedRoute rendered');
  const isAuthenticated = AuthService.isAuthenticated();
  console.log('isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('User authenticated, rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
