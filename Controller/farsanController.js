const Farsan = require("../Model/Farsan");

// ➕ ADD
const addFarsan = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: "Name and Price required",
      });
    }

    const newItem = new Farsan({
      name,
      price,
      image: req.file ? req.file.path : "",
    });

    const saved = await newItem.save();

    res.status(200).json({
      msg: "Farsan added successfully",
      data: saved,
    });

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET
const getFarsan = async (req, res) => {
  try {
    const data = await Farsan.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
const deleteFarsan = async (req, res) => {
  try {
    await Farsan.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addFarsan,
  getFarsan,
  deleteFarsan,
};