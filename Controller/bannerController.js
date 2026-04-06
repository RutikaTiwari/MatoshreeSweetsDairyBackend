// const Banner = require("../Model/Banner");

// // ✅ POST - Create Banner
// exports.createBanner = async (req, res) => {
//   try {
//     const { paragraph } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const banner = new Banner({
//       images: req.file.path,
//       title,
//     });

//     await banner.save();

//     res.status(201).json({
//       message: "Banner created successfully",
//       data: banner,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ GET - Get All Banners
// exports.getBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       count: banners.length,
//       data: banners,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };  



const Banner = require("../Model/Banner");

// ✅ POST - Create Banner (Multiple Images)
exports.createBanner = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Get all image paths
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



// ✅ DELETE - Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




