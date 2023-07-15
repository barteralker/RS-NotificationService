
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const eventController = require('../Controllers/event');

routerApp.get('/', async (req, res) => {

    res.send(await eventController.getAllEvents()); 

});

routerApp.get('/:id', async (req, res) => {

    res.send(await eventController.getEventById(req.params.id)); 

});

routerApp.post('', async (req, res) => {

    res.send(await eventController.createEvent(req.body)); 

});

routerApp.put('/:id', async (req, res) => {

    res.send(await eventController.updateEvent(req.params.id, req.body)); 

});

routerApp.delete('/:id', async (req, res) => {

    res.send(await eventController.deleteEvent(req.params.id)); 

});

module.exports = routerApp;