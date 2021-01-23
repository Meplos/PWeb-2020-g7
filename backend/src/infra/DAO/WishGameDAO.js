const mongoose = require("mongoose");

const WishGameSchema = mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  platforms: {
    type: [String],
    required: true,
  },
});

module.exports = WishGameSchema;
