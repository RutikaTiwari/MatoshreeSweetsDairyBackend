const Sweet = require("../Model/TraditionalSweets");

// Add Sweet
exports.addSweet = async (req, res) => {
  try {
    res.json({ msg: "Sweet added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSweets = async (req, res) => {
  res.json([]);
};

// Get All Sweets
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};