import Joi from "joi";
import mongoose from "mongoose"
import { genreSchema }  from "./genre"

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5, 
        maxLength: 255,
        trim: true,
        get: value => value.trim(),
        set: value => value.trim()
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255
    },

    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255
    }
})

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.object().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    });

    return schema.validate(movie);
}

export { Movie, validateMovie };