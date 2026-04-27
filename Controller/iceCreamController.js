const IceCream = require("../Model/IceCream");

// ➕ ADD ICE CREAM
const addIceCream = async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);
    console.log("📸 FILE:", req.file);

    const { title, price, category } = req.body;

    // ✅ Validation
    if (!title || !price || !category) {
      return res.status(400).json({
        error: "Title, Price and Category are required",
      });
    }

    const newItem = new IceCream({
      title,
      price,
      category,
      image: req.file ? req.file.path : "", // Cloudinary URL
    });

    const saved = await newItem.save();

    console.log("✅ SAVED:", saved);

    res.status(200).json({
      msg: "IceCream added successfully",
      data: saved,
    });

  } catch (err) {
    console.log("❌ ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};

// 📥 GET ALL ICE CREAM
const getIceCream = async (req, res) => {
  try {
    const data = await IceCream.find().sort({ createdAt: -1 });

    console.log("📦 FETCHED:", data);

    res.status(200).json(data);

  } catch (err) {
    console.log("❌ FETCH ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};

// ❌ DELETE ICE CREAM
const deleteIceCream = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await IceCream.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    console.log("🗑️ DELETED:", deleted);

    res.status(200).json({
      msg: "Deleted successfully",
      data: deleted,
    });

  } catch (err) {
    console.log("❌ DELETE ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};

// ✅ EXPORT ALL
module.exports = {
  addIceCream,
  getIceCream,
  deleteIceCream,
};