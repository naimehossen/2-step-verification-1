import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  const username = "admin123";
  const password = "admin12345"; // Login password
  const email = "n33937407@gmail.com";

  const exists = await Admin.findOne({ username });
  if (exists) {
    console.log("Admin already exists");
    return process.exit();
  }

  const admin = new Admin({ username, password, email });
  await admin.save();
  console.log("Admin account created successfully");
  mongoose.disconnect();
};

createAdmin();
