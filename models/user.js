const Joi = require('joi');
const jwt = require("jsonwebtoken");
const config = require('config')
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
    const token =  jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"))
    return token;
}

const User = mongoose.model("User", userSchema);


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required() // TODO: Password Complexity: joi-password-complexity
    });

    return schema.validate(user);
}

module.exports = { User, validateUser }

