
const schema = require(`../config/dev.json`).DB_Schema;

const GET_ALL_EVENTS = `SELECT * FROM ${schema}.event`;

const GET_EVENT_BY_ID = `SELECT * FROM ${schema}.event WHERE id = $1`;

const CREATE_EVENT = `INSERT INTO ${schema}.event (application_id, name, description) VALUES ($1, $2, $3) RETURNING id`;

const UPDATE_EVENT = `UPDATE ${schema}.event SET application_id = $1, name = $2, description = $3 WHERE id = $4 RETURNING *`;

const DELETE_EVENT = `DELETE FROM ${schema}.event WHERE id = $1`;

module.exports = {
    GET_ALL_EVENTS,
    GET_EVENT_BY_ID,
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
}