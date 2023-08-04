
const express = require('express');
const app = express();
const config = require('config');
const logger = require('./startup/loggingSetup');

require(`./config/${config.get('instance')}.json`).DB_CONN = config.get('DB_CONN')

require('express-async-errors');
require('./startup/middlewareSetup')(app);
require('./startup/jwtSetup')();
require('./startup/unhandledError')();

const port = process.env.port || require(`./config/${config.get('instance')}.json`).port;
const appServer = app.listen(port, () => logger.info(`Listening on Port ${port} !`));

module.exports = appServer;