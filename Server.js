// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const dotenv = require("dotenv");

// dotenv.config();

// const connectDB = require("./Config/Db");

// const app = express();

// // ✅ DB connect
// connectDB();

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Static folder (images access)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Routes
// app.use("/api/products", require("./Routes/productRoutes"));
// app.use("/api/orders", require("./Routes/orderRoutes"));
// app.use("/api/banners", require("./Routes/bannerRoutes"));

// // ✅ Root route (IMPORTANT)
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// // ✅ Server start (LAST)
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./Config/Db");

const app = express();

// DB connect
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/orders", require("./Routes/orderRoutes"));
app.use("/api/banners", require("./Routes/bannerRoutes"));
app.use("/api/sweets", require("./Routes/TraditionalSweetsRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 GLOBAL ERROR HANDLER (ADD THIS)
app.use((err, req, res, next) => {
  console.log("🔥 GLOBAL ERROR FULL:", err);
  console.log("🔥 MESSAGE:", err.message);
  console.log("🔥 STACK:", err.stack);

  res.status(500).json({
    error: err.message || "Something went wrong",
  });
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});