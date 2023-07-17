
const express = require('express');
const app = express();
const winston = require('winston');

require('express-async-errors');
require('./Startup/loggingSetup')(winston);
require('./Startup/middlewareSetup')(app);
require('./Startup/jwtSetup')();

const port = process.env.port || require('./config/default.json').port;
app.listen(port, () => winston.info(`Listening on Port ${port} !`));