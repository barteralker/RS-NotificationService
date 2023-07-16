
const { Pool, Client } = require("pg");
const credentials = require('../resources/config.json').PG_DB_credentials;

module.exports = {
    Pool,
    Client,
    credentials
}