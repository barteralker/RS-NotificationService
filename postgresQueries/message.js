
const config = require('config');
const schema = require(`../config/${config.get('instance')}.json`).DB_Schema;

const GET_ALL_MESSAGES = `SELECT * FROM ${schema}.message`;

const GET_MESSAGE_BY_ID = `SELECT * FROM ${schema}.message WHERE id = $1`;

const CREATE_MESSAGE = `INSERT INTO ${schema}.message (message_text, notification_type, timestamp) VALUES ($1, $2, $3) RETURNING id`;

const UPDATE_MESSAGE = `UPDATE ${schema}.message SET message_text = $1, notification_type = $2, timestamp = $3 WHERE id = $4 RETURNING *`;

const DELETE_MESSAGE = `DELETE FROM ${schema}.message WHERE id = $1`;

module.exports = {
    GET_ALL_MESSAGES,
    GET_MESSAGE_BY_ID,
    CREATE_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE
}