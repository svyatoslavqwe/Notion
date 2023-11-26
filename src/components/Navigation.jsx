import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function Navigation() {
  const { onChange } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onChange(null);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="flex space-x-4">
      <Link
        to="/home"
        className={`text-gray-500 ${
          location.pathname === "/home" ? "font-bold text-black" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/notes"
        className={`text-gray-500 ${
          location.pathname === "/notes" ? "font-bold text-black" : ""
        }`}
      >
        Notes
      </Link>
      <button
        onClick={handleLogout}
        className="text-gray-500 bg-transparent border-none"
      >
        Logout
      </button>
    </div>
  );
}
