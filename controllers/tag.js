
const logger = require('../startup/loggingSetup');
const DB_Conn = require('../config/dev.json').DB_CONN;
const Constants = require('../resources/constants');

if (DB_Conn === Constants.DB_CONNS_PG) { var TagModel = require('../modelsPG/tag'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var TagModel = require('../modelsMongo/tag'); };

async function createTags(tags, tid) {

    logger.setTraceId(tid);
    logger.info(`In Tags Controller - Creating Following new Tags : ${JSON.stringify(tags)}`);

    for (tag of tags) {

        await TagModel.createTag(tag, tid);

    }

    return;
}

module.exports = {
    createTags
}