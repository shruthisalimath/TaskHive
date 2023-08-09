const { Project, Task, User } = require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate({
                path: 'projects',
                populate: { path: 'tasks' },
            });
        },

        user: async (parent, { userId }) => {
            return await User.findOne({ _id: userId }).populate({
                path: 'projects',
                populate: { path: 'tasks' },
            });
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
        },

        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .populate({
                        path: 'projects',
                        populate: 'tasks',
                    });
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {

        //Users
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };

        },

        // Adding a third argument to the resolver to access data in our `context`
        updateUser: async (parent, args, context) => {
            // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: args.userId },
                    args,
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        //Setting up mutation so a logged in user can only remove their user profile and no one else's
        deleteUser: async (parent, { userId }, context) => {
            if (context.user) {
              const deletedUser = await User.findOneAndDelete({ _id: userId });
              if (!deletedUser) {
                throw new UserInputError("User not found");
              }
      
              // Delete projects associated with the deleted user
              await Project.deleteMany({ _id: { $in: deletedUser.projects } });
      
              // Delete tasks associated with the deleted user's projects
              await Task.deleteMany({ projectName: { $in: deletedUser.projects } });
      
              return userId;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

        //Login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        //Projects
        // Add a third argument to the resolver to access data in our `context`
        addProject: async (parent, args, context) => {
            // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in    
            if (context.user) {
                const project = await Project.create(args);
                await User.findOneAndUpdate(
                    { _id: args.userId },//The args object should be accessed directly from the args parameter of  resolver function, not from the context object (so taking context off). 
                    { $push: { projects: project._id } }
                );
                return project;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        updateProject: async (parent, args, context) => {
            if (context.user) {
                return await Project.findOneAndUpdate(
                    { _id: args.projectId },
                    args,
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteProject: async (parent, { projectId }, context) => {
            if (context.user) {
            const deletedProject = await Project.findOneAndDelete({ _id: projectId });
            if (!deletedProject) {
            throw new UserInputError(`Project not found`);
            }
            
            // Remove the project's reference from associated users
            await User.updateMany(
            { projects: projectId },
            { $pull: { projects: projectId } }
            );
            
            // Delete tasks associated with the deleted project
            await Task.deleteMany({ projectName: projectId });
            
            return projectId;
            }
            throw new AuthenticationError('You need to be logged in!');
            },

        //Tasks
        // Add a third argument to the resolver to access data in our `context`
        addTask: async (parent, args, context) => {
            // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in    
            if (context.user) {
                const task = await Task.create(args);
                await Project.findOneAndUpdate(
                    { _id: args.projectId },
                    { $push: { tasks: task._id } },
                );
                task.projectId = args.projectId;
                return task;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        // addTask: async (parent, args) => {
        //     const project = await Project.findOneAndUpdate(
        //         { _id: args.project },
        //         { $push: { tasks: args } },
        //         { new: true }
        //     );

        //     await User.findOneAndUpdate(
        //         { _id: args.userId },
        //         { $push: { projects: project._id } }
        //     );

        //     return project.tasks[project.tasks.length - 1];
        // },

        updateTask: async (parent, args, context) => {
            if (context.user) {
                return await Task.findOneAndUpdate(
                    { _id: args.taskId },
                    args,
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteTask: async (parent, { taskId }, context) => {
            if (context.user) {
            const deletedTask = await Task.findOneAndDelete({ _id: taskId });
            if (!deletedTask) {
            throw new UserInputError(`Task not found`);
            }
            
            // Remove the task's reference from associated projects
            await Project.updateMany(
            { tasks: taskId },
            { $pull: { tasks: taskId } }
            );
            
            return taskId;
            }
            throw new AuthenticationError('You need to be logged in!');
            },
    }
}

module.exports = resolvers;
