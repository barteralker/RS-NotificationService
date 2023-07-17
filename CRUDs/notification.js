
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const notificationController = require('../Controllers/notification');
const auth = require('../Middleware/Authenticator');

routerApp.get('/', async (req, res) => {

    res.send(await notificationController.getAllNotifications()); 

});

routerApp.get('/:id', async (req, res) => {

    res.send(await notificationController.getNotificationById(req.params.id)); 

});

routerApp.post('', auth, async (req, res) => {

    res.send(await notificationController.createNotification(req.body)); 

});

routerApp.put('/:id', auth, async (req, res) => {

    res.send(await notificationController.updateNotification(req.params.id, req.body)); 

});

routerApp.delete('/:id', auth, async (req, res) => {

    res.send(await notificationController.deleteNotification(req.params.id)); 

});

module.exports = routerApp;