
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const messageController = require('../controllers/message');
const auth = require('../Middleware/Authenticator');
const log = require('../Middleware/Logger');
const traceIdGen = require('../utils/TraceIdGenerator');

routerApp.get('/', log, async (req, res) => {

    res.send(await messageController.getAllMessages(req, traceIdGen.getTraceId())); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await messageController.getMessageById(req.params.id, traceIdGen.getTraceId())); 

});

routerApp.post('', [log, auth], async (req, res) => {

    res.send(await messageController.createMessage(req.body, traceIdGen.getTraceId())); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await messageController.updateMessage(req.params.id, req.body, traceIdGen.getTraceId())); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await messageController.deleteMessage(req.params.id, traceIdGen.getTraceId())); 

});

module.exports = routerApp;