const GiftPack = require("../Model/GiftPack");

// ➕ ADD GIFT PACK
const addGiftPack = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: "Name and Price are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Image is required",
      });
    }

    const newPack = new GiftPack({
      name,
      price,
      image: req.file.path, // Cloudinary URL
    });

    const saved = await newPack.save();

    res.status(201).json({
      msg: "Gift Pack added successfully",
      data: saved,
    });

  } catch (err) {
    console.log("❌ ADD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET ALL
const getGiftPacks = async (req, res) => {
  try {
    const data = await GiftPack.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.log("❌ FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
const deleteGiftPack = async (req, res) => {
  try {
    const deleted = await GiftPack.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      msg: "Deleted successfully",
      data: deleted,
    });

  } catch (err) {
    console.log("❌ DELETE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addGiftPack,
  getGiftPacks,
  deleteGiftPack,
};