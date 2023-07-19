
const winston = require('winston');
const pg = require('../DBConns/pgConnection');
const queries = require('../PostgresQueries/notification');

async function getAllNotifications() {

    winston.info(`In Notifications Model - Getting All Notifications`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_NOTIFICATIONS;
    winston.info(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getNotificationById(id) {

    winston.info(`In Notifications Model - Getting Notification with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_NOTIFICATION_BY_ID;
    const values = [id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createNotification(notification) {

    winston.info(`In Notifications Model - Creating New Notification`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_NOTIFICATION;
    const values = [notification.event_id, notification.name, notification.template_subject, notification.template_body];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateNotification(id, notification) {

    winston.info(`In Notifications Model - Updating Notification with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_NOTIFICATION;
    const values = [notification.event_id, notification.name, notification.template_subject, notification.template_body, id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteNotification(id) {

    winston.info(`In Notifications Model - Deleting Notification with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_NOTIFICATION;
    const values = [id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
}