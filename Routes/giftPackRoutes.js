const express = require("express");
const router = express.Router();

const {
  addGiftPack,
  getGiftPacks,
  deleteGiftPack,
} = require("../Controller/giftPackController");

// 👇 your Cloudinary multer middleware
const upload = require("../Middleware/upload");

// ➕ Add Gift Pack
router.post("/", upload.single("image"), addGiftPack);

// 📥 Get All Gift Packs
router.get("/", getGiftPacks);

// ❌ Delete
router.delete("/:id", deleteGiftPack);

module.exports = router;