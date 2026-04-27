const Bakery = require("../Model/Bakery");

// ✅ Add
const addBakery = async (req, res) => {
  try {
    const { name, price } = req.body;

    const newItem = new Bakery({
      name,
      price,
      image: req.file ? req.file.path : "", // ✅ Cloudinary URL
    });

    const saved = await newItem.save();

    res.status(200).json({
      msg: "Bakery item added",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get
const getBakery = async (req, res) => {
  try {
    const items = await Bakery.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete
const deleteBakery = async (req, res) => {
  try {
    await Bakery.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addBakery, getBakery, deleteBakery };