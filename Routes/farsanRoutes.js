const express = require("express");
const router = express.Router();

const {
  addFarsan,
  getFarsan,
  deleteFarsan,
} = require("../Controller/farsanController");

const upload = require("../Middleware/upload");

// Routes
router.get("/", getFarsan);
router.post("/", upload.single("image"), addFarsan);
router.delete("/:id", deleteFarsan);

module.exports = router;