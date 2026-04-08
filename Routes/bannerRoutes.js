const express = require("express");
const router = express.Router();

const upload = require("../Middleware/upload");
const {
  createBanner,
  getBanners,
  deleteBanner,
} = require("../Controller/bannerController");

// ✅ POST - Upload banner images (Cloudinary)
router.post(
  "/",
  upload.array("images", 5),
  async (req, res, next) => {
    try {
      // 🔥 Cloudinary URLs extract
      const imageUrls = req.files.map((file) => file.path);

      // 👉 controller ko data bhejo
      req.body.images = imageUrls;

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createBanner
);

// ✅ GET all banners
router.get("/", getBanners);

// ✅ DELETE banner
router.delete("/:id", deleteBanner);

module.exports = router;