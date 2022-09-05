const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: String },
    sender: { type: String },
    text: { type: String },
    type: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
