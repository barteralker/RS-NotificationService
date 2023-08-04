
const logger = require('../startup/loggingSetup');
const Message = require('../mongooseCollections/message').Message;

async function getAllMessages() {

    logger.info(`In Messages Model - Getting All Messages`);

    return (await Message.find());

}

async function getFilteredMessages(filters) {

    logger.info(`In Messages Model - Getting Filtered Messages`);

    return (await Message.find(filters));

}

async function getMessageById(id) {

    logger.info(`In Messages Model - Getting Message with ID ${id}`);

    return (await Message.findById(id));

}

async function createMessage(message) {

    logger.info(`In Messages Model - Creating New Message`);

    const mongoMessage = new Message({
        message_text : message.message_text,
        notification_type : message.notification_type
    });    

    return (await mongoMessage.save());

}

async function updateMessage(id, message) {

    logger.info(`In Messages Model - Updating Message with ID : ${id}`);

    return (await Message.findByIdAndUpdate(id, {
        message_text : message.message_text,
        notification_type : message.notification_type
    }));

}

async function deleteMessage(id) {

    logger.info(`In Messages Model - Deleting Message with ID : ${id}`);

    return (await Message.findByIdAndDelete(id));

}

module.exports = {
    getAllMessages,
    getFilteredMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}