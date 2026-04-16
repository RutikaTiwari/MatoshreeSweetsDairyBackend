const Banner = require("../Model/Banner");
const cloudinary = require("../Config/cloudinary");
const fs = require("fs");

// ✅ CREATE
exports.createBanner = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({ error: "Title & Subtitle required" });
    }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "banners",
        });

        imageUrls.push(result.secure_url);

        // delete local file after upload
        fs.unlinkSync(file.path);
      }
    }

    const banner = await Banner.create({
      title,
      subtitle,
      images: imageUrls,
    });

    res.status(201).json({
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    console.error("🔥 CREATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET
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

// ✅ DELETE
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    for (let img of banner.images) {
      const publicId = img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log("🔥 DELETE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};