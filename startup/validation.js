module.exports = function () {
    const Joi = require('joi');
    Joi.objectId = require('joi-objectid')(Joi);
}