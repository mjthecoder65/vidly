const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 255,
        trim: value => value.trim(),
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

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required()
    });

    return schema.validate(customer);
}
module.exports = { Customer, validateCustomer };