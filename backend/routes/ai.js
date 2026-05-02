const express = require("express");
const router = express.Router();
const { summarizeText, generateQuestions } = require("../services/aiService");
const { protect } = require("../middleware/auth");

// All AI routes require login
router.use(protect);

router.post("/summarize", summarizeText);
router.post("/questions", generateQuestions);

module.exports = router;