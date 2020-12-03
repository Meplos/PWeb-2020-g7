const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserDAO = mongoose.model("User", UserSchema);

module.exports = UserDAO;
