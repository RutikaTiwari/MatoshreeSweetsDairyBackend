const express = require("express");
const router = express.Router();

const {
  addBakery,
  getBakery,
  deleteBakery,
} = require("../Controller/bakeryController"); // 👈 check path

const upload = require("../Middleware/upload");

router.get("/", getBakery);      // ✅ function hona chahiye
router.post("/", upload.single("image"), addBakery);
router.delete("/:id", deleteBakery);

module.exports = router;