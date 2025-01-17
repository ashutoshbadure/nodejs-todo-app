const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("ToDo", ToDoSchema);
