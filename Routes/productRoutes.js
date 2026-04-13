const express = require("express");
const router = express.Router();

const upload = require("../Middleware/upload"); // Cloudinary multer
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("../Controller/ProductController");

// ✅ CREATE (image upload → Cloudinary)
router.post("/", upload.single("image"), addProduct);

// ✅ GET ALL
router.get("/", getProducts);

// ✅ DELETE (Cloudinary se bhi delete hoga controller me)
router.delete("/:id", deleteProduct);

module.exports = router;