const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  creator_name: String,
  creatorid: String,
  coord: Object,
  caption: String,
});

module.exports = mongoose.model("post", PostSchema);
