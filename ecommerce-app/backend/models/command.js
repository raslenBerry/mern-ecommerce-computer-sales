const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    adress: { type: Object, required: false },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Command = mongoose.model("Command", commandSchema);

module.exports = Command;
