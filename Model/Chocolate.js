const mongoose = require("mongoose");

const chocolateSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chocolate", chocolateSchema);