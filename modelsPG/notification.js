
const logger = require('../startup/loggingSetup');
const pg = require('../dbConnections/pgConnection');
const queries = require('../postgresQueries/notification');

async function getAllNotifications(tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Model - Getting All Notifications`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_NOTIFICATIONS;
    logger.setTraceId(tid);
    logger.info(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getFilteredNotifications(appendee, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Model - Getting Filtered Notifications`);

    pool = new pg.Pool(pg.credentials);

    let querySQl = queries.GET_ALL_NOTIFICATIONS + appendee; 
    
    const result = await pool.query(querySQl);
    await pool.end();   

    return result;

}

async function getNotificationById(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Model - Getting Notification with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_NOTIFICATION_BY_ID;
    const values = [id];

    logger.setTraceId(tid);
    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createNotification(notification, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Model - Creating New Notification`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_NOTIFICATION;
    const values = [notification.event_id, notification.name, notification.template_subject, notification.template_body];

    logger.setTraceId(tid);
    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateNotification(id, notification, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Model - Updating Notification with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_NOTIFICATION;
    const values = [notification.event_id, notification.name, notification.template_subject, notification.template_body, id];

    logger.setTraceId(tid);
    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteNotification(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Notifications Model - Deleting Notification with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_NOTIFICATION;
    const values = [id];

    logger.setTraceId(tid);
    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllNotifications,
    getFilteredNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
}