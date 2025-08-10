import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Doctor Search
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-700">
                Welcome, {user.first_name} {user.last_name}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
