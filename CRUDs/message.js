
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const messageController = require('../Controllers/message');
const auth = require('../Middleware/Authenticator');
const log = require('../Middleware/Logger');

routerApp.get('/', log, async (req, res) => {

    res.send(await messageController.getAllMessages()); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await messageController.getMessageById(req.params.id)); 

});

routerApp.post('', [log, auth], async (req, res) => {

    res.send(await messageController.createMessage(req.body)); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await messageController.updateMessage(req.params.id, req.body)); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await messageController.deleteMessage(req.params.id)); 

});

module.exports = routerApp;