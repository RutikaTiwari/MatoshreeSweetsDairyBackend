const Product = require("../Model/Product");
const fs = require("fs");
const path = require("path");

// ADD product
exports.addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    const image = req.file ? `uploads/banner/${req.file.filename}` : "";

    const product = await Product.create({
      title,
      description,
      image
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // delete image
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);

      fs.unlink(imagePath, (err) => {
        if (err) console.log("Image delete error:", err);
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.log(error); // 👈 add this for debugging
    res.status(500).json({ message: "Server Error" });
  }
};