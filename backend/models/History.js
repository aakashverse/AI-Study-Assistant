const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    type: { 
        type: String, 
        enum: ["summarize", "questions"], 
        required: true 
    },

    inputText: { 
        type: String, 
        required: true 
    },

    outputText: { 
        type: String,
        required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);