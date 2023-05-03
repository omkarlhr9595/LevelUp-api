const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // add more fields as necessary
});

const User = mongoose.model("User", userSchema);

module.exports = User;
