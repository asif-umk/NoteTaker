import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUndo } from "react-icons/fa";

export default function CompletedTasks() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const getCompletedTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch tasks");
        }
        let filteredTasks = response.data.filter(
          (task) => task.isComplete === true
        );
        setTodo(filteredTasks);
      } catch (err) {
        console.log(err);
      }
    };

    getCompletedTasks();
  }, []);

  // Undo handler
  const handleUndo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/complete/${id}`,
        { isComplete: false }, // update status
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // remove from completed list after update
      setTodo((prev) => prev.filter((item) => item._id !== id));
      console.log("Task undone:", res.data);
    } catch (err) {
      console.error("Error undoing task:", err);
    }
  };

  // Date formatter
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] dark:bg-[#1F2937] transition-colors px-4 sm:px-6 md:px-12">
      <motion.h1 className="my-8 text-center text-lg sm:text-3xl md:text-4xl text-gray-900 dark:text-gray-100 font-bold tracking-wider">
        Hello Asif,{" "}
        <span className="opacity-60">Here is your Completed Tasks</span>
      </motion.h1>

      <div className="w-full h-full max-w-7xl bg-white dark:bg-[#111827] rounded-3xl mt-5 p-6 sm:p-10 md:p-12 flex flex-col transition-colors shadow-lg dark:shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Completed Tasks
          </h2>
          <p className="text-4xl font-extrabold   text-gray-600 dark:text-white">
            {todo.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {todo.map((item) => {
            let cardColor = "";
            if (item.priority === "low") {
              cardColor = "bg-green-50 dark:bg-green-900/30";
            } else if (item.priority === "medium") {
              cardColor = "bg-yellow-50 dark:bg-yellow-900/30";
            } else if (item.priority === "high") {
              cardColor = "bg-red-50 dark:bg-red-900/30";
            }

            return (
              <div
                key={item._id}
                className={`relative h-auto ${cardColor} p-4 rounded-lg shadow-lg border-l-4 ${
                  item.priority === "low"
                    ? "border-green-400"
                    : item.priority === "medium"
                    ? "border-yellow-400"
                    : "border-red-400"
                } transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Undo button */}
                <button
                  onClick={() => handleUndo(item._id)}
                  className="absolute top-3 right-3 text-indigo-600 hover:text-indigo-800"
                  title="Undo task"
                >
                  <FaUndo size={18} />
                </button>

                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Added on: {formatDate(item.createdAt)}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {formatDate(item.updatedAt)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
