const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
  user: {
    unique: true,
    type: String,
    required: true,
  },
  wishlist: {
    type: Array,
    required: false,
  },
});

const WishlistDAO = mongoose.model("Wishlist", WishlistSchema);

module.exports = WishlistDAO;
