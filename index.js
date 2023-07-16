
const express = require('express');
const app = express();
const winston = require('winston');

require('express-async-errors');
require('./Startup/middlewareSetup')(app);
require('./Startup/loggingSetup')(winston);

const port = process.env.port || require('./resources/config.json').port;
app.listen(port, () => winston.info(`Listening on Port ${port} !`));