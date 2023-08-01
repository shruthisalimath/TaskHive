const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String, 
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  dueDate: Date,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Projects', 
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Users', 
  },
});

const Task = model('Task', taskSchema);

module.exports = Task;
