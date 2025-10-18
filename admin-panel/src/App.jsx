import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import OtpVerify from "./pages/OtpVerify.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // যখনই route পরিবর্তন হয় বা reload হয়, token update করো
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log("🔹 Path:", location.pathname, "| 🔸 Token:", storedToken);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OtpVerify />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={
          token ? (
            <Dashboard />
          ) : (
            <>
              {console.warn("🚫 No token found, redirecting to login")}
              <Navigate to="/" replace />
            </>
          )
        }
      />

      {/* fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
