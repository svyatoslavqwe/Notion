import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContextProvider";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/notes")
      .then((response) => response.json())
      .then((data) => {
        const sortedNotes = data.sort((a, b) => b.createdAt - a.createdAt);
        setNotes(sortedNotes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Note deleted");
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        throw new Error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditNote = (id) => {
    navigate(`/editnote/${id}`);
  };

  return (
    <div className="flex flex-col items-center">
      <Navigation />
      <p className="text-left mt-4 ml-4 absolute top-0 left-0">
        Hello, {user.email}
      </p>
      <h1 className="text-3xl mt-8 mb-4 font-bold">Notes</h1>
      <Link
        to="/createnote"
        className="bg-gray-300 py-2 px-6 rounded-lg text-gray-800 mb-8 w-96 text-center hover:bg-gray-400 font-bold"
      >
        Add new note
      </Link>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-gray-100 rounded-lg py-4 px-6 mb-4 flex justify-between items-center"
          >
            <div className="w-96">
              <h2 className="text-xl">
                <Link
                  to={`/viewnote/${note.id}`}
                  className="text-black no-underline hover:no-underline" // Apply no-underline class for removing underline on hover
                  onClick={() => handleViewNote(note.id)}
                >
                  {note.title}
                </Link>
              </h2>
              <p className="text-gray-600">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleEditNote(note.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg ml-2 font-bold"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
