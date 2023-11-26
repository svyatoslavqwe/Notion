import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContextProvider";

export default function ViewNote() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { noteId } = useParams();

  const [note, setNote] = useState({});

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const data = await response.json();
          setNote(data);
        } else {
          throw new Error("Error fetching note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDeleteNote = async () => {
    try {
      const response = await fetch(`http://localhost:5001/notes/${note.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Note deleted");
        navigate("/notes");
      } else {
        throw new Error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navigation />
      <p className="text-left mt-4 ml-4 absolute top-0 left-0">
        Hello, {user.email}
      </p>
      <h1 className="text-3xl mt-8 mb-4 font-bold">View Note</h1>
      <div className="w-96">
        <h2 className="border border-gray-300 rounded-lg py-2 px-3 mt-2 mb-4 w-full">
          {note.title}
        </h2>
        <p className="border border-gray-300 rounded-lg py-2 px-3 mt-2 mb-4 w-full">
          {note.text}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <Link
              to={`/editnote/${noteId}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2 font-bold"
            >
              Edit
            </Link>
            <Link
              to="/notes"
              className="bg-gray-300 text-gray-900 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-lg mr-2 font-bold"
            >
              Back
            </Link>
          </div>
          <button
            onClick={handleDeleteNote}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg ml-2 font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
