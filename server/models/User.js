const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
            ref: 'Project',
        },
    ],
    // tasks: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Tasks',
    //     },
    // ],
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;