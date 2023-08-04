
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const eventController = require('../controllers/event');
const auth = require('../middleware/Authenticator');
const log = require('../middleware/Logger');
const traceIdGen = require('../utils/TraceIdGenerator');

routerApp.get('/', log, async (req, res) => {

    res.send(await eventController.getAllEvents(req, traceIdGen.getTraceId())); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await eventController.getEventById(req.params.id, traceIdGen.getTraceId())); 

});

routerApp.post('', [log, auth], async (req, res) => {

    res.send(await eventController.createEvent(req.body, traceIdGen.getTraceId())); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await eventController.updateEvent(req.params.id, req.body, traceIdGen.getTraceId())); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await eventController.deleteEvent(req.params.id, traceIdGen.getTraceId())); 

});

module.exports = routerApp;