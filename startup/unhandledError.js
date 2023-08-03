
const logger = require('../startup/loggingSetup');

module.exports = () => {

    process.on('uncaughtException', (exp) => {
        logger.error(`UNCAUGHT EXCEPTION : ${exp.message}`);
    });

    process.on('unhandledRejection', (exp) => {
        logger.error('UNHADLED PROMISE REJECTION');
    });
    
}