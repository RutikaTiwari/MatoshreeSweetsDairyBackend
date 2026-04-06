const express = require("express");
const router = express.Router();

const upload = require("../Middleware/upload");

const {
  addProduct,
  getProducts,
  deleteProduct
} = require("../Controller/ProductController");

// form-data (image upload)
router.post("/", upload.single("image"), addProduct);

router.get("/", getProducts);

module.exports = router;

router.delete("/:id", deleteProduct);