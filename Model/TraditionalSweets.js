const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
});

module.exports = mongoose.model("Sweet", sweetSchema);