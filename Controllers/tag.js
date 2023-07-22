
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');

if (DB_Conn === Constants.DB_CONNS_PG) { var TagModel = require('../PostgresModels/tag'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var TagModel = require('../MongoModels/tag'); };

async function createTags(tags) {

    winston.info(`In Tags Controller - Creating Following new Tags : ${JSON.stringify(tags)}`);

    for (tag of tags) {

        await TagModel.createTag(tag);

    }
}

module.exports = {
    createTags
}