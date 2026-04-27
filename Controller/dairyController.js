const Dairy = require("../Model/Dairy");

// ➕ ADD DAIRY
const addDairy = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price } = req.body;

    // ✅ validation
    if (!name || !price) {
      return res.status(400).json({
        error: "Name and Price required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Image not uploaded",
      });
    }

    const newItem = new Dairy({
      name,
      price,
      image: req.file.path, // Cloudinary URL
    });

    const saved = await newItem.save();

    res.status(200).json({
      msg: "Dairy added successfully",
      data: saved,
    });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({
      error: err.message,
    });
  }
};

// 📥 GET ALL
const getDairy = async (req, res) => {
  try {
    const data = await Dairy.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.log("❌ FETCH ERROR:", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

// ❌ DELETE
const deleteDairy = async (req, res) => {
  try {
    const deleted = await Dairy.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

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

module.exports = {
  addDairy,
  getDairy,
  deleteDairy,
};