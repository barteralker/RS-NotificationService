
let server = require('../../index');

const logger = require('../../startup/loggingSetup');
const config = require('config');
require(`../../config/${config.get('instance')}.json`).DB_CONN = config.get('DB_CONN');
const DB_Conn = require(`../../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../../resources/constants');
const tagController = require('../../controllers/tag');

if (DB_Conn === Constants.DB_CONNS_PG) { var TagModel = require('../../modelsPG/tag'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var TagModel = require('../../modelsMongo/tag'); };

test('Tag Test 1 - Create Tags', async () => {

    logger.info = jest.fn();

    TagModel.createTag = jest.fn();

    tagController.createTags(['tag1', 'tag2']);

});

test('Tag Test 2 - Create Tags (Empty Tag Array)', async () => {

    logger.info = jest.fn();

    TagModel.createTag = jest.fn();

    tagController.createTags([]);

});

server.close();