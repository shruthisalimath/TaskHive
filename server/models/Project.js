const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  endDate: {
    type: Date,
    default: null,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],

  // users: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Users',
  //   },
  // ],
});

const Project = model('Project', projectSchema);

module.exports = Project;