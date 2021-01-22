const mongoose = require("mongoose");
const WishGameSchema = require("./WishGameDAO");

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
  wishlist: {
    type: [WishGameSchema],
    required: false,
  },
});

const UserDAO = mongoose.model("User", UserSchema);

module.exports = UserDAO;
