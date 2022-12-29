
import Joi from "joi";


module.exports = function () {
    Joi.object = require('joi-objectid')(Joi);
}