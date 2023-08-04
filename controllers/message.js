
const logger = require('../startup/loggingSetup');
const config = require('config');
const DB_Conn = require(`../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const utils = require('../utils/FilterUtils');

if (DB_Conn === Constants.DB_CONNS_PG) { var MessageModel = require('../modelsPG/message'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var MessageModel = require('../modelsMongo/message'); };

function validateMessage(body) {

    logger.info('Validating Message Input');
    const schema = Joi.object({
        
        notification_type: Joi.number().integer().min(1).required(),
        message_text: Joi.string().required(),
        timestamp: Joi.date()

    });

    return schema.validate(body);

};

async function getAllMessages(req) {

    logger.info(`In Messages Controller - Getting All Messages`);

    if (req.header('filter') && req.header('filter') === 'true') {

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await MessageModel.getFilteredMessages(utils.postgresFilterCreator(req.body));
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await MessageModel.getFilteredMessages(req.body);

    }

    else var result = await MessageModel.getAllMessages();

    if (DB_Conn === Constants.DB_CONNS_PG) return utils.paginateResults(result.rows, req);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return utils.paginateResults(result, req);

}

async function getMessageById(id) {

    logger.info(`In Messages Controller - Getting Message with ID ${id}`);

    const result = await MessageModel.getMessageById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createMessage(message) {

    logger.info(`In Messages Controller - Creating New Message`);

    const validationResult = validateMessage(message);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    if (!message.timestamp) message.timestamp = new Date().toUTCString(); 

    const result = await MessageModel.createMessage(message);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];
    
}

async function updateMessage(id, message) {

    logger.info(`In Messages Controller - Updating Message with ID ${id}`);

    if ((await getMessageById(id)).length === 0) return `Message with id ${id} not found`;
    
    const validationResult = validateMessage(message);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await MessageModel.updateMessage(id, message);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];

}

async function deleteMessage(id) {

    logger.info(`In Messages Controller - Deleting Message with ID ${id}`);

    const deletedMessage = await getMessageById(id);

    if (deletedMessage.length === 0) return `Message with id ${id} not found`;

    result = await MessageModel.deleteMessage(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return deletedMessage;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [deletedMessage];

}

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}