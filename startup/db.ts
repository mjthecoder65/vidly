import winston from "winston"
import mongoose from "mongoose"
import config from "config"

module.exports =  function() {
    mongoose.set("strictQuery", false)
    mongoose.connect(config.get("mongoURI"))
    .then(() => winston.info("Connected to MongoDB....."))
    .catch((error) => console.log("Failed to connect to the Database"))
}