import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // if you want to set user globally

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth(); // 🔥 use context instead of props

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!email || !password) {
        setErrorMessage("All fields are required");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      setSuccessMessage("Welcome " + res.data.user.username);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 px-6 py-10 md:p-0">
      {/* Left Section */}
      <motion.div
        className="flex items-center justify-center px-6 md:px-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center md:text-left max-w-lg">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Welcome to <span className="text-amber-500">NoteTaker</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Store your notes securely, access them anytime, and stay organized
            with ease.
          </p>

          <motion.img
            src="logo.png"
            alt="NoteTaker logo"
            className="rounded h-72 w-72 md:h-60 md:w-80 mr-6 mt-10 mx-auto md:mx-0 hidden md:block shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />
        </div>
      </motion.div>

      {/* Right Section - Form */}
      <motion.div
        className="flex items-center justify-center w-full mt-12 md:mt-0"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.form
          onSubmit={handleLogin}
          className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-5"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-orange-600 text-center">
            Login to Your Account
          </h2>

          {successMessage && (
            <p className="text-green-600 font-medium">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 font-medium">{errorMessage}</p>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Signup Link */}
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 underline">
              SIGNUP
            </a>
          </p>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-800 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
