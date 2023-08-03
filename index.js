
const express = require('express');
const app = express();
const logger = require('./startup/loggingSetup');

require('express-async-errors');
require('./startup/middlewareSetup')(app);
require('./startup/jwtSetup')();
require('./startup/unhandledError')();

const port = process.env.port || require(`./config/dev.json`).port;
app.listen(port, () => logger.info(`Listening on Port ${port} !`));