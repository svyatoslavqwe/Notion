import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { onChange } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          onChange(user);
          navigate("/home");
        } else {
          setError("Incorrect email address or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-5">Log in</h1>
      <input
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="text-red-500 text-center">{error}</div>}
      <button
        className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
}
