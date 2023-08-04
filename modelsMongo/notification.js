
const logger = require('../startup/loggingSetup');
const Notification = require('../mongooseCollections/notification').Notification;

async function getAllNotifications() {

    logger.info(`In Notifications Model - Getting All Notifications`);

    return (await Notification.find());

}

async function getFilteredNotifications(filters) {

    logger.info(`In Notifications Model - Getting Filtered Notifications`);

    return (await Notification.find(filters));

}

async function getNotificationById(id) {

    logger.info(`In Notifications Model - Getting Notification with ID ${id}`);

    return (await Notification.findById(id));

}

async function createNotification(notification) {

    logger.info(`In Notifications Model - Creating New Notification`);

    const mongoNotification = new Notification({
        name : notification.name,
        event_id : notification.event_id,
        template_subject : notification.template_subject,
        template_body : notification.template_body

    });    

    return (await mongoNotification.save());

}

async function updateNotification(id, notification) {

    logger.info(`In Notifications Model - Updating Notification with ID : ${id}`);

    return (await Notification.findByIdAndUpdate(id, {
        notificationText : notification.notificationText,
        notification_type : notification.notification_type
    }));

}

async function deleteNotification(id) {

    logger.info(`In Notifications Model - Deleting Notification with ID : ${id}`);

    return (await Notification.findByIdAndDelete(id));

}

module.exports = {
    getAllNotifications,
    getFilteredNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
}