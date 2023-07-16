
const debug = require('debug')('app:appDebugger');
const pg = require('../DBConns/pgConnection');
const queries = require('../PostgresQueries/notification');

async function getAllNotifications() {

    debug(`In Notifications Model - Getting All Notifications`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_NOTIFICATIONS;
    debug(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getNotificationById(id) {

    debug(`In Notifications Model - Getting Notification with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_NOTIFICATION_BY_ID;
    const values = [id];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createNotification(notification) {

    debug(`In Notifications Model - Creating New Notification`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_NOTIFICATION;
    const values = [notification.event_id, notification.name, template_subject, template_body];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateNotification(id, notification) {

    debug(`In Notifications Model - Updating Notification with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_NOTIFICATION;
    const values = [notification.event_id, notification.name, template_subject, template_body, id];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteNotification(id) {

    debug(`In Notifications Model - Deleting Notification with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_NOTIFICATION;
    const values = [id];

    debug(`Running Postgres query : ${querySQl}`);
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