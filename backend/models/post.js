const mongoose = require("mongoose");

const postShema = mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: false },
  selectedFile: { type: String, required: false },
  usersLiked: { type: Array },
  creator: { type: String, required: true },
  createdAt: { type: String },
});

module.exports = mongoose.model("post", postShema);
