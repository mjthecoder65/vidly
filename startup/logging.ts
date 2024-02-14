const winston = require('winston');
require("winston-mongodb");
require("express-async-errors"); 

module.exports =  function () { 

    process.on('uncaughtException',(err) => {
        console.log(err.message)
        console.log("WE GOT AN UNCAUGHT EXCEPTION");
        console.log(err.message)
        winston.error(err.message, err);
    });
    
    winston.add(
        new winston.transports.File({ filename: 'logfile.log'}),
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        );
}
