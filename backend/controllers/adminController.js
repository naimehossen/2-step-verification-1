import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import transporter from "../utils/email.js";
import jwt from "jsonwebtoken";

// Login Route
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password.trim(), admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpire = new Date(Date.now() + 5 * 60 * 1000);
    await admin.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Your OTP Code",
      text: `OTP: ${otp} (valid for 5 minutes)`
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// OTP Verification Route
export const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    if (!admin.otp || !admin.otpExpire || new Date() > admin.otpExpire)
      return res.status(400).json({ message: "OTP expired, login again" });

    if (admin.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    admin.otp = null;
    admin.otpExpire = null;
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
