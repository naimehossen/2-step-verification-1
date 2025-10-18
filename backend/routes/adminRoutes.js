import express from "express";
import { loginAdmin, verifyOtp } from "../controllers/adminController.js";
import Admin from "../models/Admin.js";
import transporter from "../utils/email.js";

const router = express.Router();
router.post("/login", loginAdmin);
router.post("/verify-otp", verifyOtp);
// Resend OTP
// adminRoutes.js
router.post("/resend-otp", async (req, res) => {
  try {
    const { username } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpire = new Date(Date.now() + 5 * 60 * 1000);
    await admin.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Your OTP Code",
      text: `OTP: ${otp} (valid for 5 minutes)`,
    });

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
