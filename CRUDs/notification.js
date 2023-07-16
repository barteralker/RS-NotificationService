
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const notificationController = require('../Controllers/notification');

routerApp.get('/', async (req, res) => {

    res.send(await notificationController.getAllNotifications()); 

});

routerApp.get('/:id', async (req, res) => {

    res.send(await notificationController.getNotificationById(req.params.id)); 

});

routerApp.post('', async (req, res) => {

    res.send(await notificationController.createNotification(req.body)); 

});

routerApp.put('/:id', async (req, res) => {

    res.send(await notificationController.updateNotification(req.params.id, req.body)); 

});

routerApp.delete('/:id', async (req, res) => {

    res.send(await notificationController.deleteNotification(req.params.id)); 

});

module.exports = routerApp;