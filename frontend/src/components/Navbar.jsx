import React from "react";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // if you want to use context directly

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // instantly update UI
    navigate("/login");
  };

  return (
    <div className="relative z-10 top-0 left-0 w-full h-16 bg-[#F9FAFB] shadow-md shadow-gray-600">
      <nav className="flex justify-between items-center h-full px-5 md:px-10">
        {/* Logo */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 font-island"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">NoteTaker</Link>
        </motion.h2>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          
          {user ? (
            // When user is logged in
            <div className="flex items-center gap-4 text-gray-700">
              <FaUser className="text-xl" />
        
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm md:text-base font-medium transition-all duration-200"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            // When no user is logged in
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm md:text-base font-medium transition-all duration-200"
                onClick={() => navigate("/register")}
              >
                Register
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm md:text-base font-medium transition-all duration-200"
                onClick={() => navigate("/login")}
              >
                Login
              </motion.button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
