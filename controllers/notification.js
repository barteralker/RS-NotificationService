
const logger = require('../startup/loggingSetup');
const DB_Conn = require('../config/dev.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const tagController = require('./tag');
const messageController = require('./message');
const notificationParser = require('../utils/NotificationParser');
const utils = require('../utils/FilterUtils');

if (DB_Conn === Constants.DB_CONNS_PG) { var NotificationModel = require('../modelsPG/notification'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var NotificationModel = require('../modelsMongo/notification'); };

function validateNotification(body, validator, tid) {

    if (validator === 'newTemplate') {
        logger.setTraceId(tid);
    logger.info('Validating Notification Input');
        const schema = Joi.object({
            
            event_id: Joi.number().integer().min(1).required(),
            name: Joi.string().required().min(5).max(25),
            template_subject: Joi.string().required().min(5).max(25),
            template_body: Joi.string().required().min(20)

        });

        return schema.validate(body);
    }

    if (validator === 'newNotification') {
        logger.setTraceId(tid);
    logger.info('Validating New Notification Input');
        const schema = Joi.object({
            
            notification_type: Joi.number().integer().min(1).required(),
            tags: Joi.object().required(),
            receiver_email: Joi.string().required().min(10).max(30),

        });

        return schema.validate(body);
    }

};

async function getAllNotifications(req, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Controller - Getting All Notifications`);

    if (req.header('filter') && req.header('filter') === 'true') {

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await NotificationModel.getFilteredNotifications(utils.postgresFilterCreator(req.body), tid);
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await NotificationModel.getFilteredNotifications(req.body, tid);

    }

    else var result = await NotificationModel.getAllNotifications();

    if (DB_Conn === Constants.DB_CONNS_PG) return utils.paginateResults(result.rows, req, tid);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return utils.paginateResults(result, req, tid);

}

async function getNotificationById(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Controller - Getting Notification with ID ${id}`);

    const result = await NotificationModel.getNotificationById(id, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createNotification(notification, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Controller - Creating New Notification`);

    const validationResult = validateNotification(notification, 'newTemplate', tid);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await tagController.createTags(notificationParser.parseForTags(notification.template_body, true), tid);

    const result = await NotificationModel.createNotification(notification, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];
    
}

async function updateNotification(id, notification, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Controller - Updating Notification with ID ${id}`);

    if ((await getNotificationById(id, tid)).length === 0) return `Notification with id ${id} not found`;
    
    const validationResult = validateNotification(notification, 'newTemplate', tid);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await tagController.createTags(notificationParser.parseForTags(notification.template_body, true), tid);

    const result = await NotificationModel.updateNotification(id, notification, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];

}

async function deleteNotification(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Controller - Deleting Notification with ID ${id}`);

    const deletedNotification = await getNotificationById(id, tid);

    if (deletedNotification.length === 0) return `Notification with id ${id} not found`;

    const result = await NotificationModel.deleteNotification(id, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return deletedNotification;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [deletedNotification];

}

async function sendNewNotification(notificationDetails, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Controller - Sending new Notification to ${notificationDetails.receiver_email}`);

    const validationResult = validateNotification(notificationDetails, 'newNotification', tid);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const notification = await getNotificationById(notificationDetails.notification_type, tid);
    if (notification.length === 0) return `Error : Invalid Notification Type`;

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

    messageController.createMessage(messageObject, tid);

    return notificationDetails;

}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    sendNewNotification
}