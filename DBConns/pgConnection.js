
const { Pool, Client } = require("pg");
const credentials = require('../config/default.json').PG_DB_credentials;

module.exports = {
    Pool,
    Client,
    credentials
}