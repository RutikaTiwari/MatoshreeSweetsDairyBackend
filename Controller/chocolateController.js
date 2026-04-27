const Chocolate = require("../Model/Chocolate");

// ➕ ADD
const addChocolate = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: "Name and Price required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Image required",
      });
    }

    const newChocolate = new Chocolate({
      name,
      price,
      image: req.file.path, // ✅ Cloudinary URL
    });

    const saved = await newChocolate.save();

    res.status(200).json({
      msg: "Chocolate added",
      data: saved,
    });
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET
const getChocolates = async (req, res) => {
  try {
    const data = await Chocolate.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
const deleteChocolate = async (req, res) => {
  try {
    const deleted = await Chocolate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Deleted",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addChocolate,
  getChocolates,
  deleteChocolate,
};