import Joi from 'joi';
import { Schema, model } from "mongoose";


const rentalSchema = new Schema({
    customer: {
        type: new Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minLength: 5, 
                maxLength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                trim: true,
                minLength:5,
                maxLength:50
            }
        }),
        required: true
    },
    movie: {
        type: new Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minLength: 5,
                maxLength: 255
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            }

        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        tyep: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})


const Rental = model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.object().required(),
        movieId: Joi.object().required()
    });

    return schema.validate(rental)
}


export { Rental, validateRental };