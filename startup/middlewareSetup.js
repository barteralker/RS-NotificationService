
const express = require('express');

const application = require('../routes/application.js');
const event = require('../routes/event.js');
const notification = require('../routes/notification.js');
const message = require('../routes/message.js');
const user = require('../routes/user.js');
const login = require('../routes/login.js')

const errorHandler = require('../middleware/ErrorHandler.js')

module.exports = (app) => {

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Welcome to Notification Service');
    })
    
    app.use('/applications', application);
    app.use('/events', event);
    app.use('/notifications', notification);
    app.use('/messages', message);
    app.use('/users', user);
    app.use('/login', login);
    
    app.use(errorHandler);
    
}