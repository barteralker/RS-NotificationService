
const { Pool, Client } = require("pg");
const config = require('config');
const credentials = require('../config/dev.json').PG_DB_credentials;

credentials.password = config.get('password');

module.exports = {
    Pool,
    Client,
    credentials
}