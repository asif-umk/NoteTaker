// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const dummyNotes = [
    { id: 1, title: "Shopping List", content: "Milk, Bread, Eggs, Coffee ☕" },
    { id: 2, title: "Ideas 💡", content: "Start a blog, Learn React, Build Note App" },
    { id: 3, title: "Reminder", content: "Doctor’s appointment at 5 PM" },
  ];

  return (
    <div className="text-white py-12 px-6">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Note Taker 📝</h1>
        <p className="text-gray-300 text-lg">
          Organize your thoughts, save important reminders, and never forget an idea again.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Dummy Notes Preview */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNotes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-yellow-400">{note.title}</h2>
            <p className="text-gray-300 mt-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


