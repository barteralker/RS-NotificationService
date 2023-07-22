
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const tagController = require('./tag');
const messageController = require('./message');
const notificationParser = require('../Middleware/NotificationParser');

if (DB_Conn === Constants.DB_CONNS_PG) { var NotificationModel = require('../PostgresModels/notification'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var NotificationModel = require('../MongoModels/notification'); };

function validateNotification(body, validator) {

    if (validator === 'newTemplate') {
        winston.info('Validating Notification Input');
        const schema = Joi.object({
            
            event_id: Joi.number().integer().min(1).required(),
            name: Joi.string().required(),
            template_subject: Joi.string().required(),
            template_body: Joi.string().required()

        });

        return schema.validate(body);
    }

    if (validator === 'newNotification') {
        winston.info('Validating New Notification Input');
        const schema = Joi.object({
            
            notification_type: Joi.number().integer().min(1).required(),
            tags: Joi.object(),
            receiver_email: Joi.string().required().min(10),

        });

        return schema.validate(body);
    }

};

async function getAllNotifications() {

    winston.info(`In Notifications Controller - Getting All Notifications`);

    result = await NotificationModel.getAllNotifications();

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function getNotificationById(id) {

    winston.info(`In Notifications Controller - Getting Notification with ID ${id}`);

    result = await NotificationModel.getNotificationById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return (result.rows.length > 0 ? result.rows : `Notification with ID ${id} does not exist`);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result !== null ? result : `Notification with ID ${id} does not exist`;

}

async function createNotification(notification) {

    winston.info(`In Notifications Controller - Creating New Notification`);

    const validationResult = validateNotification(notification, 'newTemplate');
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await tagController.createTags(notificationParser.parseForTags(notification.template_body, true));

    result = await NotificationModel.createNotification(notification);

    if (DB_Conn === Constants.DB_CONNS_PG) return `New Notification with Id : ${result.rows[0]["id"]} created`;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return `New Notification with Id : ${result["_id"]} created`;
    
}

async function updateNotification(id, notification) {

    winston.info(`In Notifications Controller - Updating Notification with ID ${id}`);

    if (typeof (await getNotificationById(id)) === "string") return `Notification with id ${id} not found`;
    
    const validationResult = validateNotification(notification, 'newTemplate');
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await NotificationModel.updateNotification(id, notification);

    return `Notification with Id : ${id} updated`;

}

async function deleteNotification(id) {

    winston.info(`In Notifications Controller - Deleting Notification with ID ${id}`);

    const deletedNotification = await getNotificationById(id);

    if (typeof deletedNotification === "string") return `Notification with id ${id} not found`;

    result = await NotificationModel.deleteNotification(id);

    return `Notification with Id : ${id} deleted
    ${JSON.stringify(deletedNotification)}`;

}

async function sendNewNotification(notificationDetails) {

    winston.info(`In Notifications Controller - Sending new Notification to ${notificationDetails.receiver_email}`);

    const validationResult = validateNotification(notificationDetails, 'newNotification');
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const notification = await getNotificationById(notificationDetails.notification_type);
    if (typeof (notification) === "string") return `Invalid Notification Type`;

    const template = notification[0].template_body;
    const messageObject = {
        notification_type : notificationDetails.notification_type
    };

    try {
        messageObject.message_text = notificationParser.parseAndFillTags(template, notificationDetails.tags);
    }

    catch (err) {
        return err.message;
    }

    messageController.createMessage(messageObject);

    return `Notification Sent to ${notificationDetails.receiver_email}`;

}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    sendNewNotification
}