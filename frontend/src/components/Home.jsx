import { useState, useEffect } from "react";

import { FaSearch, FaSort, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Notes from "./Tasks";

import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [success, setSuccess] = useState("");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const updateCounts = (latestTodo) => {
    setTodo(latestTodo);
  };

  // inside Home.jsx
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(""); // clear after 3 sec
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const completedCount = todo.filter((item) => item.isComplete).length;
  const uncompletedCount = todo.filter((item) => !item.isComplete).length;

  const filteredAndSorted = todo
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if ( sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortOrder === "desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortOrder === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortOrder === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        {
          title,
          description,
          priority,
          date: currentDate,
          isComplete: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔥 Update state instantly
      setTodo((prev) => [...prev, res.data]);

      setSuccess("Todo added successfully");
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setPriority("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };
  return (
    <div className="min-h-screen h-full">
      {success && (
        <motion.div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {success}
        </motion.div>
      )}
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] transition-colors px-4 sm:px-6 md:px-12"
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="my-8 text-center text-lg sm:text-3xl md:text-4xl text-gray-900 font-bold tracking-wider">
          Hello {user.username},{" "}
          <span className="opacity-60">start planning your day</span>
        </motion.h1>

        <motion.div className="w-full max-w-7xl bg-white rounded-3xl mt-5 p-6 sm:p-10 md:p-12 flex flex-col transition-colors shadow-lg">
          <motion.div className="flex flex-col md:flex-row gap-6 md:gap-4 mb-4">
            <div className="w-full md:w-1/3 flex flex-col gap-y-7">
              <motion.div className=" w-full space-y-1 text-center md:text-left  lg:flex lg:flex-row sm:felx sm:flex-col">
                <div className="space-y-2">
                  <h1 className="font-island text-5xl text-indigo-600 font-bold">
                    {days[new Date().getDay()]}
                  </h1>
                  <h1 className="font-abhaya text-2xl sm:text-3xl font-bold tracking-wider text-gray-900 0">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </h1>
                </div>

                <div className="flex items-center justify-center md:w-1/2">
                  <h1 className="font-abhaya text-2xl sm:text-3xl font-bold tracking-wider text-indigo-600">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </h1>
                </div>
              </motion.div>

              <motion.div className="h-44 flex gap-4 justify-around bg-gray-100  p-6 rounded-xl">
                <motion.button
                  className="bg-white  text-black  p-1 w-1/2  rounded-lg shadow-md flex flex-col items-center text-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <a href="/completedTasks">
                    <p className="text-lg md:text-sm lg:text-lg font-semibold mb-3 ">
                      Completed Tasks
                    </p>
                    <p className="text-3xl font-extrabold">{completedCount}</p>
                  </a>
                </motion.button>

                <motion.button
                  className="bg-white  text-black  p-1 w-1/2 rounded-lg shadow-md flex flex-col items-center text-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-lg  md:text-sm lg:text-lg font-semibold mb-3">
                    Remaining Tasks
                  </p>
                  <p className="text-3xl font-extrabold">{uncompletedCount}</p>
                </motion.button>
              </motion.div>
            </div>

            <motion.div className="w-full md:w-2/3 bg-[#EEF2F6] shadow-md  rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-extrabold text-xl sm:text-2xl pb-3 text-gray-700 ">
                  Add new Task
                </h2>
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className=" bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg "
                >
                  + Add Task
                </motion.button>
              </div>
              {isModalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/40 z-40 px-4"
                >
                  <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-xl relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                    >
                      ✕
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                      Add New Task
                    </h2>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col space-y-5"
                    >
                      {/* Title Input */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          required
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter Title"
                          className="h-10 px-3 bg-white text-gray-800 focus:outline-none rounded-lg shadow"
                        />
                      </div>

                      {/* Description Input */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter Description"
                          className="h-10 px-3 bg-white text-gray-800 focus:outline-none rounded-lg shadow"
                          required
                        />
                      </div>

                      {/* Priority Select */}
                      <div className="flex flex-col">
                        <select
                          onChange={(e) => setPriority(e.target.value)}
                          required
                          className="h-10 px-2 bg-white text-gray-800 focus:outline-none rounded-lg shadow"
                        >
                          <option value="">Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      {/* Submit Button */}
                      <button className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm md:text-base font-medium transition-all duration-200">
                        Add
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              <div className="w-full h-[1px] bg-gray-300   my-4"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="bg-white  h-10 w-full sm:w-auto px-3 rounded-md flex items-center shadow">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-md bg-transparent text-gray-800   p-1 focus:outline-none"
                  />
                  <FaSearch className="ml-2 text-gray-600  " />
                </div>

                <div className="bg-white h-10 w-full sm:w-auto px-3 rounded-md flex items-center shadow">
                  <h2 className="font-semibold p-2 text-gray-800">Sort By</h2>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-transparent text-gray-800 focus:outline-none"
                  >
                    <option value="asc">Title (A → Z)</option>
                    <option value="desc">Title (Z → A)</option>
                    <option value="priority">Priority</option>
                    <option value="date">Newest First</option>
                  </select>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-300 my-4"></div>

              <div>
                <h2 className="font-semibold text-lg text-gray-800 mb-4">
                  Your Tasks
                </h2>
                {/* <Notes todo={todo} setTodo={setTodo} /> */}
                <Notes todo={filteredAndSorted} setTodo={setTodo} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
