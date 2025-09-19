import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NonHome from "./components/NonHome";
import LoadingScreen from "./components/LoadingScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import CompletedTasks from "./components/CompletedTasks";

function AppRoutes() {
  const { user, loading, setUser } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <NonHome />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/home" /> : <Register setUser={setUser} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />}
        />
        
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" />}
        />
        <Route
        path="/completedTasks" 
        element={user ? <CompletedTasks/> :<Navigate to="/" /> } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F2937] via-[#374151] to-[#111827]">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}
