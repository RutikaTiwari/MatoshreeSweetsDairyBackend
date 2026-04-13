const express = require("express");
const router = express.Router();

const upload = require("../Middleware/upload");
const {
  createBanner,
  getBanners,
  deleteBanner,
} = require("../Controller/bannerController");

// ✅ POST
router.post("/", upload.array("images", 5), createBanner);

// ✅ GET
router.get("/", getBanners);

// ✅ DELETE
router.delete("/:id", deleteBanner);

module.exports = router;