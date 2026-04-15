const Sweet = require("../Model/TraditionalSweets");

// Add Sweet
exports.addSweet = async (req, res) => {
  try {
    const { name, price } = req.body;

    const newSweet = new Sweet({
      name,
      price,
      image: req.file.path, // Cloudinary URL
    });

    await newSweet.save();
    res.json(newSweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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