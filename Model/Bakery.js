const mongoose = require("mongoose");

const bakerySchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
});

module.exports = mongoose.model("Bakery", bakerySchema);