const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  creator_name: String,
  comment: String,
  location: String,
  lat: Number,
  lng: Number,
});

module.exports = mongoose.model("post", PostSchema);
