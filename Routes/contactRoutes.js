const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts,
  deleteContact,
} = require("../Controller/contactController");

// ✅ Send Message
router.post("/add", addContact);

// ✅ Get All Messages (Admin)
router.get("/", getContacts);

// ✅ Delete Message
router.delete("/:id", deleteContact);

module.exports = router;