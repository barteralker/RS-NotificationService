
const logger = require('../startup/loggingSetup');

module.exports = (req, res, next) => {

    if (req.body && Object.keys(req.body).length > 0)
        logger.info(`${req.method} call to ${req.originalUrl}`, req.body);

    else
        logger.info(`${req.method} call to ${req.originalUrl}`);

    next();

}