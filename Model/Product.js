const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String, // Cloudinary URL
      required: true,
    },

    // 🔥 OPTIONAL (future use)
    price: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "general",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);