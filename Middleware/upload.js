// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../Config/cloudinary");

// // ✅ Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "banners",
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

// // ✅ multer config
// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("📂 Uploading:", file.originalname);

    return {
      folder: "banners",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;