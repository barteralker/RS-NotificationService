
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const notificationController = require('../controllers/notification');
const auth = require('../middleware/Authenticator');
const log = require('../middleware/Logger');
const traceIdGen = require('../utils/TraceIdGenerator');

routerApp.get('/', log, async (req, res) => {

    res.send(await notificationController.getAllNotifications(req, traceIdGen.getTraceId())); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await notificationController.getNotificationById(req.params.id, traceIdGen.getTraceId())); 

});

routerApp.post('', [log, auth], async (req, res) => {

    res.send(await notificationController.createNotification(req.body, traceIdGen.getTraceId())); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await notificationController.updateNotification(req.params.id, req.body, traceIdGen.getTraceId())); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await notificationController.deleteNotification(req.params.id, traceIdGen.getTraceId())); 

});

routerApp.post('/send', [log, auth], async (req, res) => {

    res.send(await notificationController.sendNewNotification(req.body, traceIdGen.getTraceId()))

})

module.exports = routerApp;