
const schema = require('../resources/config.json').DB_Schema;

const CREATE_USER = `INSERT INTO ${schema}.user (name, email, password, application_id) VALUES ($1, $2, $3, $4) RETURNING id`;

const GET_USER_BY_EMAIL_AND_APPLICATION = `SELECT * FROM ${schema}.user WHERE email = $1 and application_id = $2`;

 module.exports = {
    CREATE_USER,
    GET_USER_BY_EMAIL_AND_APPLICATION
}