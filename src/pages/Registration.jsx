import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function validateForm() {
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email");
    }

    if (password.length < 8) {
      errors.push("The password must contain at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("The password must contain at least one capital letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("The password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      errors.push("The password must contain at least one number");
    }

    if (password !== repeatPassword) {
      errors.push("Password mismatch");
    }

    return errors;
  }

  function handleRegistration() {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      const userData = {
        email,
        password,
        createdAt: Date.now(),
      };

      fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((newUser) => {
          newUser.createdAt = userData.createdAt;
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-5">Sign up</h1>
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
      <input
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button
        className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold"
        onClick={handleRegistration}
      >
        Sign up
      </button>
      {errors.length > 0 && (
        <div className="text-red-500 text-center">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
