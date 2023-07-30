
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const applicationController = require('../Controllers/application');
const auth = require('../Middleware/Authenticator');
const log = require('../Middleware/Logger');

routerApp.get('/', log, async (req, res) => {

    res.send(await applicationController.getAllApplications(req)); 

});

routerApp.get('/:id', log, async (req, res) => {

    res.send(await applicationController.getApplicationById(req.params.id)); 

});

routerApp.post('', [log, auth], async (req, res, next) => {

    res.send(await applicationController.createApplication(req.body)); 

});

routerApp.put('/:id', [log, auth], async (req, res) => {

    res.send(await applicationController.updateApplication(req.params.id, req.body)); 

});

routerApp.delete('/:id', [log, auth], async (req, res) => {

    res.send(await applicationController.deleteApplication(req.params.id)); 

});

module.exports = routerApp;