const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,  
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 1024,
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Projects',
        },
    ],
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tasks',
        },
    ],
});

const Users = model('Users', userSchema);

module.exports = Users;