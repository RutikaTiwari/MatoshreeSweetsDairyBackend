const Product = require("../Model/Product");
const cloudinary = require("../Config/cloudinary");

// ✅ ADD PRODUCT (Cloudinary)
exports.addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Cloudinary image URL
    const image = req.file ? req.file.path : "";

    const product = await Product.create({
      title,
      description,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("ADD ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ DELETE PRODUCT (Cloudinary se bhi delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 Cloudinary delete
    if (product.image) {
      try {
        const publicId = product.image.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (err) {
        console.log("Cloudinary delete error:", err);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};