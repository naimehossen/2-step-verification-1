import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/login", { username, password });
      if (res.data.message) {
        localStorage.setItem("username", username);
        setSuccess(true);

        setTimeout(() => navigate("/otp"), 1000);
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl w-96"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-center text-white drop-shadow"
        >
          Admin Login
        </motion.h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border-none outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg transition-all duration-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border-none outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg transition-all duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Animated Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          disabled={loading || success}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
            success
              ? "bg-green-500"
              : loading
              ? "bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "🔄 Logging in..." : success ? "✅ Success!" : "Login"}
        </motion.button>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-sm text-yellow-200"
          >
            {message}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default Login;
