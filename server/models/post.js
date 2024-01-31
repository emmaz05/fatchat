const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  coord: Object,
  caption: String,
  loc_name: String,
  // lat: Number,
  // lng: Number,

  // creator_id: String,
  // creator_name: String,
  // content: String,
});

module.exports = mongoose.model("post", PostSchema);
