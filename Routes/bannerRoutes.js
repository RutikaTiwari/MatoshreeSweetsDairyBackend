// const express = require("express");
// const router = express.Router();

// const upload = require("../Middleware/upload");
// const {
//   createBanner,
//   getBanners,
// } = require("../Controller/bannerController");

// // POST (upload image + paragraph)
// router.post("/", upload.single("image"), createBanner);

// // GET all banners
// router.get("/", getBanners);

// module.exports = router;



const express = require("express");
const router = express.Router();

const upload = require("../Middleware/upload");
const {
  createBanner,
  getBanners,
  deleteBanner,
} = require("../Controller/bannerController");

// ✅ POST (upload multiple images)
router.post("/", upload.array("images", 5), createBanner);

// ✅ GET all banners
router.get("/", getBanners);


// DELETE banner
router.delete("/:id", deleteBanner);

module.exports = router;