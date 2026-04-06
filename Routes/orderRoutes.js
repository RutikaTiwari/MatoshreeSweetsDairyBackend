const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders
} = require("../Controller/orderController");

// POST
router.post("/", createOrder);

// GET
router.get("/", getOrders);

module.exports = router;