
const logger = require('../startup/loggingSetup');

function generateString(length) {

    const characters ='0123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getTraceId() {

    const traceId = generateString(16);

    logger.setTraceId(traceId);
    logger.info('New Trace ID Genereated');

    return traceId;
}

module.exports = {
    getTraceId
}