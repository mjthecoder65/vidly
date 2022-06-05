const winston = require('winston');

module.exports = function(err, req, res, next) {
    // TODO: logging errors
    // Logging Level: Determine the important of the message we are going to log
    /*  
        1. error
        2. warn
        3. info
        4. verbose
        5. debug
        6. silly
    */

    // winston.log()
    winston.error(err.message, err);
    res.status(500).send("ERROR(500): Internal Server Error");
}

