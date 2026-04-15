const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");

const {
  addSweet,
  getSweets,
  deleteSweet,
} = require("../Controller/TraditionalSweetsController");

// POST
router.post("/", upload.single("image"), addSweet);

// GET
router.get("/", getSweets);

// DELETE
router.delete("/:id", deleteSweet);

module.exports = router;