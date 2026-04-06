const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  orderType: { type: String, required: true },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);