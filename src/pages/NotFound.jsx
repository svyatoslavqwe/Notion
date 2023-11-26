import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function NotFound() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-5">404</h2>
      <h1 className="text-3xl font-bold mb-5">Page Not Found</h1>
      {user?.id ? (
        <Link
          to="/home"
          className="text-blue-500 underline text-xl font-bold mb-3"
        >
          Go to Home
        </Link>
      ) : (
        <Link
          to="/login"
          className="text-blue-500 underline text-xl font-bold mb-3"
        >
          Go to Login
        </Link>
      )}
    </div>
  );
}
