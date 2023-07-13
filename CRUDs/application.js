
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const applicationController = require('../Controllers/application');

routerApp.get('/', async (req, res) => {

    res.send(await applicationController.getAllApplications()); 

});

routerApp.get('/:id', async (req, res) => {

    res.send(await applicationController.getApplicationById(req.params.id)); 

});

routerApp.post('', async (req, res) => {

    res.send(await applicationController.createApplication(req.body)); 

});

routerApp.put('/:id', async (req, res) => {

    res.send(await applicationController.updateApplication(req.params.id, req.body)); 

});

routerApp.delete('/:id', async (req, res) => {

    res.send(await applicationController.deleteApplication(req.params.id)); 

});

module.exports = routerApp;