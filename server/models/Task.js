const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: String, 
  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Completed'],
  },
  dueDate: Date,
  projectName: {
    type: Schema.Types.ObjectId,
    ref: 'Projects', 
  },
  // assignedTo: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Users', 
  // },
});

const Task = model('Task', taskSchema);

module.exports = Task;
