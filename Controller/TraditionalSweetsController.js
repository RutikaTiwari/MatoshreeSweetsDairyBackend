const Sweet = require("../Model/TraditionalSweets");

// ✅ Add Sweet
exports.addSweet = async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);
    console.log("📸 FILE:", req.file);

    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: "Name and Price are required",
      });
    }

    const newSweet = new Sweet({
      name,
      price,
      image: req.file ? req.file.path : "",
    });

    const savedSweet = await newSweet.save();

    console.log("✅ SAVED IN DB:", savedSweet);

    res.status(200).json({
      msg: "Sweet added successfully",
      data: savedSweet,
    });

  } catch (err) {
    console.log("❌ ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};


// ✅ Get All Sweets
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();

    console.log("📦 FETCHED SWEETS:", sweets);

    res.status(200).json(sweets);

  } catch (err) {
    console.log("❌ FETCH ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};


// ✅ DELETE Sweet
exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ DELETE ID:", id);

    const deletedSweet = await Sweet.findByIdAndDelete(id);

    if (!deletedSweet) {
      return res.status(404).json({
        error: "Sweet not found",
      });
    }

    console.log("❌ DELETED:", deletedSweet);

    res.status(200).json({
      msg: "Sweet deleted successfully",
      data: deletedSweet,
    });

  } catch (err) {
    console.log("❌ DELETE ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
};