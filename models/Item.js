const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  barcode: { type: String, unique: true },
  mrp: Number,
  sp1: Number,
  sp2: Number,
  sp3: Number,
  stock: Number
});

module.exports = mongoose.model("Item", itemSchema);