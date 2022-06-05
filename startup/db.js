const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => winston.info("Connected to MongoDB....."))
}