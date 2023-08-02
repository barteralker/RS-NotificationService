
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const eventController = require('../controllers/event');
const auth = require('../Middleware/Authenticator');
const log = require('../Middleware/Logger');

routerApp.get('/', log, async (req, res) => {

    res.send(await eventController.getAllEvents(req)); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await eventController.getEventById(req.params.id)); 

});

routerApp.post('', [log, auth], async (req, res) => {

    res.send(await eventController.createEvent(req.body)); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await eventController.updateEvent(req.params.id, req.body)); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await eventController.deleteEvent(req.params.id)); 

});

module.exports = routerApp;