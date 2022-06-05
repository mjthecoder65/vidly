const winston = require('winston');
require("winston-mongodb");
require("express-async-errors"); 

module.exports = function () { 

    process.on('uncaughtException',(err) => {
        console.log("WE GOT AN UNCAUGHT EXCEPTION");
        winston.error(err.message, err);
    });
    
    winston.add(
        new winston.transports.File({ filename: 'logfile.log'}),
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        );
    winston.add(new winston.transports.MongoDB({ 
        db: process.env.MONGO_URL,
        level: 'error',
        options: { useUnifiedTopology: true }
    }));
}
