const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: [true, "Please add an index"],
    },
    asin: {
      type: String,
      required: [true, "Please add an ASIN"],
    },
    description: {
      type: [String],
      required: [true, "Please add a description"],
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
    },
    imageURLHighRes: {
      type: [String],
      default: [],
      required: [true, "Please add a high resolution image URL"],
    },
    avgRating: {
      type: Number,
      required: [true, "Please add an average rating"],
    },
  },
  { primaryKey: "index" }
);

module.exports = mongoose.model("Product", ProductSchema);
