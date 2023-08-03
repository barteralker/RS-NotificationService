
const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../startup/loggingSetup');

module.exports = (req, res, next) => {

    const token = req.header('x-auth-token');

    logger.info('Authenticating Token')

    if (!token) return res.status(400).send('No Token Found');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }

    catch (err) {
        logger.info('Invalid Token Found')
        res.status(401).send('Invalid Token');
    }

}