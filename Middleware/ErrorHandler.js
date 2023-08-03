
const logger = require('../startup/loggingSetup');

module.exports = (err, req, res, next) => {

    logger.error(err.message, err);

    res.status(500).send(err.message);

}