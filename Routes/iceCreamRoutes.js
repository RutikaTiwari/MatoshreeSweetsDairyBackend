const express = require("express");
const router = express.Router();

const {
  addIceCream,
  getIceCream,
  deleteIceCream,
} = require("../Controller/iceCreamController");

const upload = require("../Middleware/upload");

// Routes
router.get("/", getIceCream);
router.post("/", upload.single("image"), addIceCream);
router.delete("/:id", deleteIceCream);

module.exports = router;