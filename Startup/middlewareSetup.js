
const express = require('express');

const application = require('../CRUDs/application.js');
const event = require('../CRUDs/event.js');
const notification = require('../CRUDs/notification.js');
const message = require('../CRUDs/message.js');

const errorHandler = require('../Middleware/ErrorHandler.js')

module.exports = (app) => {

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Welcome to Notification Service');
    })
    
    app.use('/applications', application);
    app.use('/events', event);
    app.use('/notifications', notification);
    app.use('/messages', message);
    
    app.use(errorHandler);
    
}