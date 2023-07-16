
const debug = require('debug')('app:appDebugger');
const pg = require('../DBConns/pgConnection');
const Message = require('../MongooseCollections/message').Message;
const queries = require('../PostgresQueries/message');

async function getAllMessages() {

    debug(`In Messages Model - Getting All Messages`);

    return (await Message.find());

}

async function getMessageById(id) {

    debug(`In Messages Model - Getting Message with ID ${id}`);

    return (await Message.findById(id));

}

async function createMessage(message) {

    debug(`In Messages Model - Creating New Message`);

    const mongoMessage = new Message({
        message_text : message.message_text,
        notification_type : message.notification_type
    });    

    return (await mongoMessage.save());

}

async function updateMessage(id, message) {

    debug(`In Messages Model - Updating Message with ID : ${id}`);

    return (await Message.findByIdAndUpdate(id, {
        message_text : message.message_text,
        notification_type : message.notification_type
    }));

}

async function deleteMessage(id) {

    debug(`In Messages Model - Deleting Message with ID : ${id}`);

    return (await Message.findByIdAndDelete(id));

}

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}