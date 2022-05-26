const Joi = require('joi');
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5, 
        maxLength: 50,
        trim: true,
        get: value => value.trim(),
        set: value => value.trim()
    }
});


// A function for validating Genre.
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    return schema.validate(genre)
}

const Genre = mongoose.model("Genre", genreSchema);

module.exports = { Genre, validateGenre };