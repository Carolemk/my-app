const express = require("express");
const router = express.Router();
const { savePet, getPets } = require("../controllers/petController");

router.post("/save", savePet);
router.get("/:userId", getPets);

module.exports = router;
