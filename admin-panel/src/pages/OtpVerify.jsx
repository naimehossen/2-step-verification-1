import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(30); // 30 seconds countdown
  const [resendAllowed, setResendAllowed] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // OTP input handlers
  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      inputsRef.current[5].focus();
    }
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendAllowed(true);
    }
  }, [timer]);

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setMessage("❌ Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/verify-otp", { username, otp: otpCode });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!resendAllowed) return;
    setResendAllowed(false);
    setTimer(30); // reset timer

    try {
      await api.post("/auth/resend-otp", { username }); // backend route: /auth/resend-otp
      setMessage("✅ OTP resent successfully");
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Failed to resend OTP");
      setResendAllowed(true);
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 px-4">
      <motion.form
        onSubmit={handleVerify}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm p-6 sm:p-8 rounded-2xl shadow-glass backdrop-blur-md bg-white/10 border border-white/20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white drop-shadow">
          Enter 6-digit OTP
        </h2>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-4 gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[index] = el)}
              whileFocus={{ scale: 1.1, borderColor: "#60a5fa" }}
              animate={{ scale: digit !== "" ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg sm:text-2xl font-semibold rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="flex justify-between items-center mb-6 text-sm text-white/90">
          <span>Resend OTP in: {timer}s</span>
          <button
            type="button"
            disabled={!resendAllowed}
            onClick={handleResend}
            className={`text-sm font-semibold underline ${
              resendAllowed ? "text-green-400 hover:text-green-300" : "text-white/50 cursor-not-allowed"
            }`}
          >
            Resend OTP
          </button>
        </div>

        {/* Verify Button */}
        <motion.button
          whileHover={{ scale: loading || success ? 1 : 1.05 }}
          whileTap={{ scale: loading || success ? 1 : 0.95 }}
          disabled={loading || success}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            success
              ? "bg-green-500"
              : loading
              ? "bg-indigo-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "🔄 Verifying..." : success ? "✅ Verified!" : "Verify OTP"}
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

export default OtpVerify;
