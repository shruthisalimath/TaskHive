const db = require('../config/connection');
const { User, Project, Task } = require('../models');
const usersSeeds = require('./usersSeeds.json');
const projectsSeeds = require('./projectsSeeds.json');
const tasksSeeds = require('./tasksSeeds.json');

db.once('open', async () => {
  try {
    await Project.deleteMany({});
    await User.deleteMany({});
    await Task.deleteMany({});

    // Seed Users
    await User.create(usersSeeds);

    // Seed Projects 
    await Project.create(projectsSeeds);

    // Seed Tasks
    await Task.create(tasksSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
