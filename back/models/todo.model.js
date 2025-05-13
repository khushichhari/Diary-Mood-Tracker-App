const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, // Ensures that a task value is always provided
  },
  done: {
    type: Boolean,
    default: false, // Defaults to false if not explicitly set
  },
});

const TodoModel = mongoose.model('todos', TodoSchema);
module.exports = TodoModel;
