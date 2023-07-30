
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const utils = require('../Middleware/Utils');

if (DB_Conn === Constants.DB_CONNS_PG) { var MessageModel = require('../PostgresModels/message'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var MessageModel = require('../MongoModels/message'); };

function validateMessage(body) {

    winston.info('Validating Message Input');
    const schema = Joi.object({
        
        notification_type: Joi.number().integer().min(1).required(),
        message_text: Joi.string().required(),
        timestamp: Joi.date()
    });

    return schema.validate(body);

};

async function getAllMessages() {

    winston.info(`In Messages Controller - Getting All Messages`);

    if (req.header('filter') && req.header('filter') === 'true') {

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await MessageModel.getFilteredMessages(utils.postgresFilterCreator(req.body));
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await MessageModel.getFilteredMessages(req.body);

    }

    else var result = await MessageModel.getAllMessages();

    if (DB_Conn === Constants.DB_CONNS_PG) return utils.paginateResults(result.rows, req);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return utils.paginateResults(result, req);

}

async function getMessageById(id) {

    winston.info(`In Messages Controller - Getting Message with ID ${id}`);

    const result = await MessageModel.getMessageById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createMessage(message) {

    winston.info(`In Messages Controller - Creating New Message`);

    const validationResult = validateMessage(message);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    if (!message.timestamp) message.timestamp = new Date().toUTCString(); 

    const result = await MessageModel.createMessage(message);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;
    
}

async function updateMessage(id, message) {

    winston.info(`In Messages Controller - Updating Message with ID ${id}`);

    if (typeof (await getMessageById(id)) === "string") return `Message with id ${id} not found`;
    
    const validationResult = validateMessage(message);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await MessageModel.updateMessage(id, message);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function deleteMessage(id) {

    winston.info(`In Messages Controller - Deleting Message with ID ${id}`);

    const deletedMessage = await getMessageById(id);

    if (typeof deletedMessage === "string") return `Message with id ${id} not found`;

    const result = await MessageModel.deleteMessage(id);

    return deletedMessage;

}

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}