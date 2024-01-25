const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  creator_name: String,
  caption: String,
  location: String,
  // lat: Number,
  // lng: Number,

  // creator_id: String,
  // creator_name: String,
  // content: String,
});

module.exports = mongoose.model("post", PostSchema);
