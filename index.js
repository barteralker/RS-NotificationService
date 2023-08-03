
const express = require('express');
const app = express();
const winston = require('winston');

require('express-async-errors');
require('./startup/loggingSetup')(winston);
require('./startup/middlewareSetup')(app);
require('./startup/jwtSetup')();

const port = process.env.port || require('./config/dev.json').port;
app.listen(port, () => winston.info(`Listening on Port ${port} !`));