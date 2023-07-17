
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const messageController = require('../Controllers/message');
const auth = require('../Middleware/Authenticator');

routerApp.get('/', async (req, res) => {

    res.send(await messageController.getAllMessages()); 

});

routerApp.get('/:id', async (req, res) => {

    res.send(await messageController.getMessageById(req.params.id)); 

});

routerApp.post('', auth, async (req, res) => {

    res.send(await messageController.createMessage(req.body)); 

});

routerApp.put('/:id', auth, async (req, res) => {

    res.send(await messageController.updateMessage(req.params.id, req.body)); 

});

routerApp.delete('/:id', auth, async (req, res) => {

    res.send(await messageController.deleteMessage(req.params.id)); 

});

module.exports = routerApp;