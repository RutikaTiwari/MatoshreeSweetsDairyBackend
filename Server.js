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
app.use("/api/TraditionalSweets", require("./Routes/TraditionalSweetsRoutes"));
app.use("/api/bakery", require("./Routes/bakeryRoutes"));
app.use("/api/icecream", require("./Routes/iceCreamRoutes"));
app.use("/api/farsan", require("./Routes/farsanRoutes"));
app.use("/api/dairy", require("./Routes/dairyRoutes"));
app.use("/api/contact", require("./Routes/contactRoutes"));
app.use("/api/chocolates", require("./Routes/chocolateRoutes"));
app.use("/api/giftpacks", require("./Routes/giftPackRoutes"));
app.use("/api/auth", require("./Routes/authRoutes"));

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