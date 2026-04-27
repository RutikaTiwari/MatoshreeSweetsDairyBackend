const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addChocolate,
  getChocolates,
  deleteChocolate,
} = require("../Controller/chocolateController");

// ➕ POST
router.post("/", upload.single("image"), addChocolate);

// 📥 GET
router.get("/", getChocolates);

// ❌ DELETE
router.delete("/:id", deleteChocolate);

module.exports = router;