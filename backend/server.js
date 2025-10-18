import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", adminRoutes);

app.get('/',(req,res)=>{
  res.send("Api working")
} )

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
