const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const {
  addSweet,
  getSweets,
} = require("../Controller/TraditionalSweetsController");

router.post("/", upload.single("image"), addSweet);
router.get("/", getSweets);

module.exports = router;