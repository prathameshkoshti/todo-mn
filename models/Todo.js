const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  desc: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  isComplete: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
});
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
