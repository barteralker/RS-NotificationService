
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const notificationController = require('../controllers/notification');
const auth = require('../Middleware/Authenticator');
const log = require('../Middleware/Logger');

routerApp.get('/', log, async (req, res) => {

    res.send(await notificationController.getAllNotifications(req)); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await notificationController.getNotificationById(req.params.id)); 

});

routerApp.post('', [log, auth], async (req, res) => {

    res.send(await notificationController.createNotification(req.body)); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await notificationController.updateNotification(req.params.id, req.body)); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await notificationController.deleteNotification(req.params.id)); 

});

routerApp.post('/send', [log, auth], async (req, res) => {

    res.send(await notificationController.sendNewNotification(req.body))

})

module.exports = routerApp;