
const { Projects, Tasks, Users } = require('../models');
//const Project = require('../models/Projects');


const resolvers = {
    Query: {
        users: async () => {
            return await Users.find();
        },

        user: async (parent, { userId }) => {
            return await Users.findOne({ _id: userId });
        },

        projects: async () => {
            return await Projects.find();
        },

        project: async (parent, { projectId }) => {
            return await Projects.findOne({ _id: projectId }).populate("tasks");
        },

        tasks: async () => {
            return await Tasks.find();
        },

        task: async (parent, { taskId }) => {
            return await Tasks.findOne({ _id: taskId });
        }

    },

    Mutation: {

        //Users
        addUser: async (parent, args) => {
            const newUser = await Users.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: args.password
            });
            await newUser.save();
            return newUser;
        },

        updateUser: async (parent,args) => {
            const saveUser = await Users.findOneAndUpdate(
                { _id: args.userId },
                {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                },
                { new: true},
            );
            
            return saveUser;
        },

        deleteUser: async (parent, { userId }) => {
            const deletedUser = await Users.findByIdAndDelete ({
                _id: userId
            });
            return deletedUser;
        },

        //Projects
        addProject: async (parent, args) => {
            const newProject = await Projects.create({
                name: args.name,
                description: args.description,
                startDate: args.startDate
            });
            await newProject.save();
            return newProject;
        },

        updateProject: async (parent, args) => {
            const saveProject = await Projects.findOneAndUpdate(
                { _id: args.projectId },
                {
                    name: args.name,
                    description: args.description,
                    startDate: args.startDate
                },
                { new: true },
            );
            return saveProject;
        },

        deleteProject: async (parent, { projectId }) => {
            const project = await Projects.findByIdAndDelete ({
                _id: projectId
            });
            return project;
        },

        //Tasks
        addTask: async (parent, args ) => {
            const newTask = await Tasks.create(
                {
                name: args.name,
                comment: args.description,
                status: args.status,
                dueDate: args.dueDate,
                projectName: args.project,
                
            });
            console.log(newTask._id);
            await newTask.save();
                console.log(args.project);
           const project = await Projects.findOneAndUpdate(
                { _id:  args.project },
                { $push: { tasks: newTask._id } },
                { new: true }
            );
            console.log(project);
            await Users.findOneAndUpdate(
                { _id: args.userId },
                { $push: { projects: newTask.projectName } }
            );
            return newTask;
        },

        updateTask: async (parent, args) => {
            const saveTask = await Tasks.findOneAndUpdate(
                { _id: args.taskId },
                {
                    name: args.name,
                    comment: args.description,
                    status: args.status,
                    dueDate: args.dueDate,
                    project: args.projectId,
                    assignedTo: args.userId
                },
                { new: true },
            );
            await saveTask.save();
                console.log(saveTask);
            const project = await Projects.findOneAndUpdate(
                { _id: project },
                { $push: { Tasks: saveTask.taskId } }
            );
                console.log(saveTask.project);
            await Users.findOneAndUpdate(
                { _id: args.userId },
                { $push: { projects: saveTask.projectId } }
            );

            return saveTask;
        },

        deleteTask: async (parent, { projectId, taskId }) => {
            const deletedTask = await Tasks.findOneAndUpdate (
                { _id: projectId },
                { $pull: { tasks: { _id: taskId}}},
                { new: true}
            );

            //  const project = await Projects.findOneAndUpdate(
            //      { _id: args. project },
            //      { $pull: { Tasks: deletedTask._id } }
            //  );

            //  await Users.findOneAndUpdate(
            //     { _id: userId },
            //     { $pull: { Tasks: deletedTask.tasktId } }
            //  );
            return deletedTask;
        },

        
    }
}

module.exports = resolvers;
