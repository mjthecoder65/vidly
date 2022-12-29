const Joi = require('joi');
import { Schema, model } from "mongoose";


interface IUser{
    name: string;
    isGold: boolean;
    phone: string
}

const customerSchema = new Schema<IUser>({
    name: {
        type: String,
        minLength: 5,
        maxLength: 255,
        get: value => value.trim(),
        set: value => value.trim(),
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    }
});

const Customer = model<IUser>("Customer", customerSchema);

function validateCustomer(customer: IUser) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required()
    });

    return schema.validate(customer);
}
export { Customer, validateCustomer };