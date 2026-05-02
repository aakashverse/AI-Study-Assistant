require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");
const historyRoutes = require("./routes/history");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/history", historyRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler (always last)
app.use(errorHandler);

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));