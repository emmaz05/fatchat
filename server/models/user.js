const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  picture: String,
});

// compile model from schema
const User = mongoose.model("user", UserSchema);

module.exports = User;
