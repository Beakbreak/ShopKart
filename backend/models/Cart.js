const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  items: {
    type: Array,
    default: [],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
