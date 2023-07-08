
const { Pool, Client } = require("pg");
const credentials = require('../resources/config.json').DB_config;

module.exports = {
    Pool,
    Client,
    credentials
}