import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 drop-shadow">
          🎉 Welcome, Admin!
        </h1>
        <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base px-2 sm:px-0">
          You have successfully logged in. Use the dashboard to manage your app.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 w-full sm:w-auto"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
