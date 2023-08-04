
const express = require('express');
const app = express();
const config = require('config');
const logger = require('./startup/loggingSetup');

const instance = config.get('instance');
const connection = config.get('DB_CONN');

require(`./config/${instance}.json`).DB_CONN = connection;
require('express-async-errors');
require('./startup/middlewareSetup')(app);
require('./startup/jwtSetup')();
require('./startup/unhandledError')();

const port = process.env.port || require(`./config/${config.get('instance')}.json`).port;
const appServer = app.listen(port, () => logger.info(`Listening on Port ${port} !`));

logger.info(`Running on ${instance} insatnce`);
logger.info(`Connected to ${connection}`);

module.exports = appServer;