import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import RequireAuth from "../components/RequireAuth";
import Navigation from "../components/Navigation";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <RequireAuth>
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-left mt-4 ml-4 absolute top-0 left-0">
          Hello, {user.email}
        </p>
        <div className="flex flex-col items-center">
          <Navigation />
          <h1 className="text-3xl mt-8 mb-4 font-bold">About me</h1>
          <p className="text-center">Email: {user.email}</p>
          <p className="text-center">
            Date sign up: {new Date(user.createdAt).toLocaleString()}
          </p>
          <Link
            to="/notes"
            className="bg-gray-300 py-2 px-6 rounded-lg text-gray-800 mt-8 w-96 text-center hover:bg-gray-400 font-bold"
          >
            Go to Notes
          </Link>
        </div>
      </div>
    </RequireAuth>
  );
}
