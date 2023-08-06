
const { Project, Task, User } = require('../models');
//const Project = require('../models/Projects');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('projects');
        },

        user: async (parent, { userId }) => {
            return await User.findOne({ _id: userId }).populate('projects');
        },

        projects: async () => {
            return await Project.find().populate("tasks");
        },

        project: async (parent, { projectId }) => {
            return await Project.findOne({ _id: projectId }).populate("tasks");
        },

        tasks: async () => {
            return await Task.find();
        },

        task: async (parent, { taskId }) => {
            return await Task.findOne({ _id: taskId });
        }

    },

     Mutation: {

         //Users
        addUser: async (parent, args) => {
            return await User.create(args);
        },

        updateUser: async (parent,args) => {
            return await User.findOneAndUpdate(
                { _id: args.userId },
                args,
                { new: true }
            );
        },

         deleteUser: async (parent, { userId }) => {
            await User.findOneAndDelete(
                { _id: userId }
            );
            return userId;
         },

         //Projects
         addProject: async (parent, args) => {
            const project = await Project.create(args);
            await User.findOneAndUpdate(
                { _id: args.userId },
                { $push: { projects: project._id }}
            );
            return project;
         },

         updateProject: async (parent, args) => {
            return await Project.findOneAndUpdate(
                { _id: args.projectId },
                args,
                { new: true }
            );
         },

         deleteProject: async (parent, { projectId }) => {
             await Project.findOneAndDelete (
                { _id: projectId }
             );
             return projectId;
         },

         //Tasks
         addTask: async (parent, args ) => {
            const task = await Task.create(args);
            await Project.findOneAndUpdate(
                { _id: args.projectId },
                { $push: { tasks: task._id } },
                
            );
            return task;
         },
            //  const newTask = await Task.create(
            //      {
            //      name: args.name,
            //      comment: args.description,
            //      status: args.status,
            //      dueDate: args.dueDate,
            //      projectName: args.project,      
            //  });
            //  console.log(newTask._id);
            //  await newTask.save();
            //      console.log(args.project);
            // const project = await Project.findOneAndUpdate(
            //      { _id:  args.project },
            //      { $push: { tasks: newTask._id } },
            //      { new: true }
            //  );
            //  console.log(project);
            //  await User.findOneAndUpdate(
            //      { _id: args.userId },
            //      { $push: { projects: newTask.projectName } }
            //  );
            //  return newTask;
         //},

         updateTask: async (parent, args) => {
            return await Task.findOneAndUpdate(
                { _id: args.taskId },
                args,
                { new: true }
            );
         },

        deleteTask: async (parent, { taskId }) => {
            await Task.findOneAndDelete(
                { _id: taskId }
            );
        },
    }
}

module.exports = resolvers;
