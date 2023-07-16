
const debug = require('debug')('app:appDebugger');
const pg = require('../DBConns/pgConnection');
const Notification = require('../MongooseCollections/notification').Notification;
const queries = require('../PostgresQueries/notification');

async function getAllNotifications() {

    debug(`In Notifications Model - Getting All Notifications`);

    return (await Notification.find());

}

async function getNotificationById(id) {

    debug(`In Notifications Model - Getting Notification with ID ${id}`);

    return (await Notification.findById(id));

}

async function createNotification(notification) {

    debug(`In Notifications Model - Creating New Notification`);

    const mongoNotification = new Notification({
        name : notification.name,
        event_id : notification.event_id,
        template_subject : notification.template_subject,
        template_body : notification.template_body

    });    

    return (await mongoNotification.save());

}

async function updateNotification(id, notification) {

    debug(`In Notifications Model - Updating Notification with ID : ${id}`);

    return (await Notification.findByIdAndUpdate(id, {
        notificationText : notification.notificationText,
        notification_type : notification.notification_type
    }));

}

async function deleteNotification(id) {

    debug(`In Notifications Model - Deleting Notification with ID : ${id}`);

    return (await Notification.findByIdAndDelete(id));

}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
}