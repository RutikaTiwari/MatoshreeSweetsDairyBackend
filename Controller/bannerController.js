const Banner = require("../Model/Banner");
const cloudinary = require("../Config/cloudinary");

// ✅ POST - Create Banner (Cloudinary Images)
exports.createBanner = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // ✅ Cloudinary URLs
    const imagePaths = req.files.map(file => file.path);

    const banner = new Banner({
      images: imagePaths,
      title,
    });

    await banner.save();

    res.status(201).json({
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET - Get All Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE - Delete Banner + Cloudinary Images
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // 🔥 Cloudinary se images delete karo
    for (let img of banner.images) {
      const publicId = img.split("/").pop().split(".")[0]; 
      // example: banners/abc123

      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    // DB se delete
    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};