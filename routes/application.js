
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const applicationController = require('../controllers/application');
const auth = require('../middleware/Authenticator');
const log = require('../middleware/Logger');
const traceIdGen = require('../utils/TraceIdGenerator');

routerApp.get('/', log, async (req, res) => {

    res.send(await applicationController.getAllApplications(req, traceIdGen.getTraceId())); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await applicationController.getApplicationById(req.params.id, traceIdGen.getTraceId())); 

});

routerApp.post('', [log, auth], async (req, res, next) => {

    res.send(await applicationController.createApplication(req.body, traceIdGen.getTraceId())); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await applicationController.updateApplication(req.params.id, req.body, traceIdGen.getTraceId())); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await applicationController.deleteApplication(req.params.id, traceIdGen.getTraceId())); 

});

module.exports = routerApp;