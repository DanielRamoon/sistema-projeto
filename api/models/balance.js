const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  initialAmount: {
    type: Number,
    required: true,
  },
  remainingAmount: {
    type: Number,
    required: true,
  },
});

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
