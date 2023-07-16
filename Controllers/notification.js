
const debug = require('debug')('app:appDebugger');
const DB_Conn = require('../resources/config.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');

if (DB_Conn === Constants.DB_CONNS_PG) { var NotificationModel = require('../PostgresModels/Notification'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var NotificationModel = require('../MongoModels/Notification'); };

function validateNotification(body) {

    debug('Validating Notification Input');
    const schema = Joi.object({
        
        event_id: Joi.number().integer().min(1).required(),
        name: Joi.string().required(),
        template_subject: Joi.string().required(),
        template_body: Joi.string().required()
    });

    return schema.validate(body);

};

async function getAllNotifications() {

    debug(`In Notifications Controller - Getting All Notifications`);

    result = await NotificationModel.getAllNotifications();

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function getNotificationById(id) {

    debug(`In Notifications Controller - Getting Notification with ID ${id}`);

    result = await NotificationModel.getNotificationById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return (result.rows.length > 0 ? result.rows : `Notification with ID ${id} does not exist`);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result !== null ? result : `Notification with ID ${id} does not exist`;

}

async function createNotification(Notification) {

    debug(`In Notifications Controller - Creating New Notification`);

    const validationResult = validateNotification(Notification);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await NotificationModel.createNotification(Notification);

    if (DB_Conn === Constants.DB_CONNS_PG) return `New Notification with Id : ${result.rows[0]["id"]} created`;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return `New Notification with Id : ${result["_id"]} created`;
    
}

async function updateNotification(id, Notification) {

    debug(`In Notifications Controller - Updating Notification with ID ${id}`);

    if (typeof (await getNotificationById(id)) === "string") return `Notification with id ${id} not found`;
    
    const validationResult = validateNotification(Notification);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await NotificationModel.updateNotification(id, Notification);

    return `Notification with Id : ${id} updated`;

}

async function deleteNotification(id) {

    debug(`In Notifications Controller - Deleting Notification with ID ${id}`);

    const deletedNotification = await getNotificationById(id);

    if (typeof deletedNotification === "string") return `Notification with id ${id} not found`;

    result = await NotificationModel.deleteNotification(id);

    return `Notification with Id : ${id} deleted
    ${JSON.stringify(deletedNotification)}`;

}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
}