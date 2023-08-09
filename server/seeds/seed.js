const db = require('../config/connection');
const { Users, Projects, Tasks } = require('../models');
const usersSeeds = require('./usersSeeds.json');
const projectsSeeds = require('./projectsSeeds.json');
const tasksSeeds = require('./tasksSeeds.json');

db.once('open', async () => {
  try {
    await Projects.deleteMany();
    await Users.deleteMany();
    await Tasks.deleteMany();

    // Seed Users
    await Users.create(usersSeeds);

    // Seed Projects 
    await Projects.create(projectsSeeds);

    // Seed Tasks
    await Tasks.create(tasksSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
