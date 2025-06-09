const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const inventoryRoutes = require("./routes/inventory");
const billRoutes = require("./routes/bill");

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = require("./middleware/auth");
app.use(authMiddleware);

app.use("/api/inventory", inventoryRoutes);
app.use("/api/bills", billRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));