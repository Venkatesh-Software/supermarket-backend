const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customerName: String,
  items: [
    {
      barcode: String,
      name: String,
      mrp: Number,
      sp: Number,
      sp2: Number,
      sp3: Number,
      quantity: Number
    }
  ],
  total: Number,
  totalSavings: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", billSchema);