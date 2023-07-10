const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  todoIds: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Todo",
    },
  ],
});
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
