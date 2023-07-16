
const express = require('express');
const app = express();
const winston = require('winston');
require('express-async-errors');

process.on('uncaughtException', (exp) => {
    winston.error(exp.message, exp);
})

winston.add(new winston.transports.File({ filename: './logs/logs.log' }));

app.use(express.json());

const Joi = require('joi');

const application = require('./CRUDs/application.js');
const event = require('./CRUDs/event.js');
const notification = require('./CRUDs/notification.js');
const message = require('./CRUDs/message.js');

const errorHandler = require('./Middleware/ErrorHandler.js')

app.get('/', (req, res) => {
    res.send('Welcome to Notification Service');
})

app.use('/applications', application);
app.use('/events', event);
app.use('/notifications', notification);
app.use('/messages', message);

app.use(errorHandler);

const DB_Conn = require('./resources/config.json').DB_CONN;
winston.info(`Connecting to ${DB_Conn} DB..!!, ${new Date().toUTCString()}`)

const port = process.env.port || require('./resources/config.json').port;
app.listen(port, () => winston.info(`Listening on Port ${port} !`));