const schema = require('../config/default.json').DB_Schema;

const GET_ALL_APPLICATIONS = `SELECT * FROM ${schema}.application`;

const GET_APPLICATION_BY_ID = `SELECT * FROM ${schema}.application WHERE id = $1`;

const CREATE_APPLICATION = `INSERT INTO ${schema}.application (name, description) VALUES ($1, $2) RETURNING id`;

const UPDATE_APPLICATION = `UPDATE ${schema}.application SET name = $1, description = $2 WHERE id = $3 RETURNING *`;

const DELETE_APPLICATION = `DELETE FROM ${schema}.application WHERE id = $1`;

module.exports = {
    GET_ALL_APPLICATIONS,
    GET_APPLICATION_BY_ID,
    CREATE_APPLICATION,
    UPDATE_APPLICATION,
    DELETE_APPLICATION
}