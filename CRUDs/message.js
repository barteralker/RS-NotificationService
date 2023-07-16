
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const messageController = require('../Controllers/message');

routerApp.get('/', async (req, res) => {

    res.send(await messageController.getAllMessages()); 

});

routerApp.get('/:id', async (req, res) => {

    res.send(await messageController.getMessageById(req.params.id)); 

});

routerApp.post('', async (req, res) => {

    res.send(await messageController.createMessage(req.body)); 

});

routerApp.put('/:id', async (req, res) => {

    res.send(await messageController.updateMessage(req.params.id, req.body)); 

});

routerApp.delete('/:id', async (req, res) => {

    res.send(await messageController.deleteMessage(req.params.id)); 

});

module.exports = routerApp;