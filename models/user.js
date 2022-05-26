const Joi = require('joi');
const mongoose = require("mongoose");


const User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
        get: value => value.trim(),
        set: value => value.trim(),
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1024,
    }
}));


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(1024).required()
    });

    return schema.validate(user);
}

module.exports = { User, validateUser }

