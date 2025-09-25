import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";
import { set } from "mongoose";

export default function Tasks({ todo, setTodo }) {
  const [editID, setEditID] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Fetch todos
  useEffect(() => {


    const fetchTodo = async () => {
      try {
        console.log("Fetching tasks...");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        setTodo(response.data);
        setTodo(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTodo();
  }, []);

  // ✅ Mark task complete/incomplete
  const handleComplete = async (id) => {
  
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/notes/complete/${id}`, // backend route
      {}, // empty body, because toggle handled in backend
      {
        headers: {
          Authorization: `Bearer ${token}`, // token goes in config, not body
        },
      }
    );

    console.log("Updated note:", data);

  setTodo((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? data : note))
    );
  } catch (error) {
    console.error(
      "Error completing task:",
      error.response?.data?.message || error.message
    );
  }
};


  // ✅ Delete task
  const handleDelete = async (id) => {
 
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, 
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTodos = todo.filter((item) => item._id !== id);
      setTodo(updatedTodos);
      console.log("Task deleted:", id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Save edited task
  const handleSave = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
        {
          title: editData.title,
          description: editData.description,
        },
        { withCredentials: true , headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTodos = todo.map((item) =>
        item._id === id ? { ...item, ...editData } : item
      );
      setTodo(updatedTodos);
      console.log("Task updated:", id);

      setEditID(null);
      setEditData({ title: "", description: "" });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Date formatting
  function formatDate(dateString) {
    if (!dateString) return "";
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", options).replace(",", "");
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {todo
          .filter((item) => !item.isComplete) // show only incomplete
          .map((item) => {
            let cardColor = "";
            if (item.priority === "low") {
              cardColor = "bg-green-50 ";
            } else if (item.priority === "medium") {
              cardColor = "bg-yellow-50 ";
            } else if (item.priority === "high") {
              cardColor = "bg-red-50 ";
            }

            return (
              <div
                key={item._id}
                className={`relative h-auto ${cardColor} p-4 rounded-lg rounded-l-xl shadow-lg border-l-6 
              ${
                item.priority === "low"
                  ? "border-green-400"
                  : item.priority === "medium"
                  ? "border-yellow-400"
                  : "border-red-400"
              } transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                {editID === item._id ? (
                  <>
                    {/* Editable fields */}
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full p-2 mb-2 rounded-md bg-transparent border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400  text-gray-800  placeholder-gray-400"
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 rounded-md bg-transparent border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400  text-gray-800  placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleSave(item._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {/* Normal display */}
                    <h3 className="font-semibold text-gray-700 ">
                      {item.title}
                    </h3>
                    <p className="text-gray-700  mt-2">{item.description}</p>
                    <p className="text-xs text-gray-700 mt-3">
                      Added on: {formatDate(item.createdAt)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {formatDate(item.updatedAt)}
                    </p>
                  </>
                )}

                {/* Action buttons */}
                <div className="absolute bottom-3 right-3 flex flex-col items-end space-y-3">
                  <button onClick={() => handleComplete(item._id)}>
                    <FaCheck className="text-gray-600 hover:text-green-500" />
                  </button>
                  <button
                    onClick={() => {
                      setEditID(item._id);
                      setEditData({
                        title: item.title,
                        description: item.description,
                      });
                    }}
                  >
                    <FaEdit className="text-gray-600 hover:text-blue-500" />
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <FaTrash className="text-gray-600  hover:text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
