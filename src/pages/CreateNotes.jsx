import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContextProvider";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const { user } = useContext(UserContext);

  const generateRandomAuthorId = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const validateForm = () => {
    const errors = [];

    if (title.trim() === "") {
      errors.push("Title cannot be empty");
    }

    if (text.trim() === "") {
      errors.push("Note body cannot be empty");
    }

    return errors;
  };

  const handleCreateNote = async () => {
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch("http://localhost:5001/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorId: generateRandomAuthorId(),
            title,
            text,
            createdAt: Date.now(),
          }),
        });

        if (response.ok) {
          console.log("Note created");
          setTitle("");
          setText("");
          setErrors([]);
        } else {
          throw new Error("Error creating note");
        }
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navigation />
      <p className="text-left mt-4 ml-4 absolute top-0 left-0">
        Hello, {user.email}
      </p>
      <h1 className="text-2xl font-bold mb-5">Create new note</h1>
      <input
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-1/3"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-1/3 h-40"
        placeholder="Note Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex">
        <button
          className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold hover:bg-gray-300 h-full"
          onClick={handleCreateNote}
        >
          Create
        </button>
        <Link
          to="/notes"
          className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold hover:bg-gray-300 text-gray-800 ml-4 h-full"
        >
          Back
        </Link>
      </div>
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
