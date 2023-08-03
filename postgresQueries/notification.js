
const schema = require(`../config/dev.json`).DB_Schema;

const GET_ALL_NOTIFICATIONS = `SELECT * FROM ${schema}.notification`;

const GET_NOTIFICATION_BY_ID = `SELECT * FROM ${schema}.notification WHERE id = $1`;

const CREATE_NOTIFICATION = `INSERT INTO ${schema}.notification (event_id, name, template_subject, template_body) VALUES ($1, $2, $3, $4) RETURNING id`;

const UPDATE_NOTIFICATION = `UPDATE ${schema}.notification SET event_id = $1, name = $2, template_subject = $3, template_body = $4 WHERE id = $5 RETURNING *`;

const DELETE_NOTIFICATION = `DELETE FROM ${schema}.notification WHERE id = $1`;

module.exports = {
    GET_ALL_NOTIFICATIONS,
    GET_NOTIFICATION_BY_ID,
    CREATE_NOTIFICATION,
    UPDATE_NOTIFICATION,
    DELETE_NOTIFICATION
}