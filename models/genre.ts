import Joi from "joi"
import { Schema, model } from "mongoose";

interface IGenre {
    name: string
}
const genreSchema = new Schema<IGenre>({
    name: {
        type: String,
        minLength: 5, 
        maxLength: 50,
        trim: true,
        get: value => value.trim(),
        set: value => value.trim()
    }
});


function validateGenre(genre: IGenre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    return schema.validate(genre)
}

const Genre = model<IGenre>("Genre", genreSchema);

export { Genre, validateGenre, genreSchema };