
const { Projects, Tasks, Users } = require('../models');


const resolvers = {
    Query: {
        projects: async () => {
            return await Projects.find();
        }
    },
    }

module.exports = resolvers;
