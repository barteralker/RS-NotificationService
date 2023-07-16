
const debug = require('debug')('app:appDebugger');
const express = require('express');
const app = express();
const winston = require('winston');
require('express-async-errors');

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
debug(`Connecting to ${DB_Conn} DB..!!`)

const port = process.env.port || require('./resources/config.json').port;
app.listen(port, () => debug(`Listening on Port ${port} !`));