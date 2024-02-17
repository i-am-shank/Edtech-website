// Create router -----------
const express = require("express");
const router = express.Router();

// import controllers -----------
const { contactUsController } = require("../controllers/contactUsController");

// Attach routes -----------
router.post("/contact", contactUsController);

module.exports = router;
