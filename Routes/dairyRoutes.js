const express = require("express");
const router = express.Router();

const {
  addDairy,
  getDairy,
  deleteDairy,
} = require("../Controller/dairyController");

const upload = require("../Middleware/upload");

// ✅ IMPORTANT (image upload)
router.post("/", upload.single("image"), addDairy);

// GET
router.get("/", getDairy);

// DELETE
router.delete("/:id", deleteDairy);

module.exports = router;