const express = require("express");
const router = express.Router();
const History = require("../models/History");
const { protect } = require("../middleware/auth");

router.use(protect);

// get logged-in user's history
router.get("/", async (req, res) => {
  const history = await History.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(history);
});

// delete a history item
router.delete("/:id", async (req, res) => {
  await History.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ message: "Deleted" });
});

module.exports = router;