// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema(
//   {
//     images: {
//       type: String, // store file path
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Banner", bannerSchema);

const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);