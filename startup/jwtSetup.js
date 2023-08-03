
const logger = require('../startup/loggingSetup');
const config = require('config');

module.exports = () => {

    if (!(config.get('jwtPrivateKey'))) {

        throw new Error('FATAL : jwtPrivateKey not defined')
        
    }

}
