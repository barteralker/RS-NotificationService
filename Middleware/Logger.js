
const winston = require('winston');

module.exports = (req, res, next) => {

    if (req.body && Object.keys(req.body).length > 0)
        winston.info(`API Request : ${req.method} call to ${req.originalUrl} at ${new Date().toUTCString()}, with params : ${JSON.stringify(req.body)}, returned Status Code ${res.statusCode}`);
    
    else
        winston.info(`API Request : ${req.method} call to ${req.originalUrl} at ${new Date().toUTCString()}, returned Status Code ${res.statusCode}`);

    next();

}