import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import adminRouter from './routes/adminRouter.js'
import showingRouter from './routes/showingRoute.js'
import aiRouter from "./routes/aiRoute.js"

dotenv.config();

const app = express();
const PORT = 5000;
  
// CORS config
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/user", showingRouter);
app.use("/api/ai", aiRouter );

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
console.log(process.env.HF_API_KEY ? "HF key loaded😘" : "HF key missing");
