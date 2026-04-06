const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./Config/Db");

const app = express();

// ✅ DB connect
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Static folder (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes (ALL BEFORE listen)
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/orders", require("./Routes/orderRoutes"));
app.use("/api/banners", require("./Routes/bannerRoutes"));

// ✅ Server start (LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});