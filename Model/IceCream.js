const mongoose = require("mongoose");

const iceCreamSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
  category: String, // scoop / cone / stick
});

module.exports = mongoose.model("IceCream", iceCreamSchema);