
const express = require('express');
const app = express();
const winston = require('winston');

require('express-async-errors');
require('./Startup/middlewareSetup')(app);

winston.add(new winston.transports.File({ filename: './logs/logs.log' }));

process.on('uncaughtException', (exp) => {
    winston.error('UNCAUGHT EXCEPTION');
    winston.error(exp.message, exp);
});

process.on('unhandledRejection', (exp) => {
    winston.error('UNHADLED PROMISE REJECTION');
    winston.error(exp.message, exp);
});

const DB_Conn = require('./resources/config.json').DB_CONN;
winston.info(`Connecting to ${DB_Conn} DB..!!, ${new Date().toUTCString()}`)

const port = process.env.port || require('./resources/config.json').port;
app.listen(port, () => winston.info(`Listening on Port ${port} !`));