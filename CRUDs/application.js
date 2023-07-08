
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const applicationController = require('../Controllers/application');

const Joi = require('joi');

const applications = [
    {
        id: 1,
        name: "ETS",
        description: "Employee Training System"
    }
];

function validateApp(body) {

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string()
    });

    return schema.validate(body);

};

routerApp.get('/', function(req, res){

    ( async() => {

        res.send(await applicationController.getAllApplications()); 

    })();

});

routerApp.get('/:id', function(req, res){

    ( async() => {

        res.send(await applicationController.getApplicationById(req.params.id)); 

    })();

});

routerApp.post('', function(req, res){

    ( async() => {

        res.send(await applicationController.createApplication(req.body)); 

    })();    

});

routerApp.put('/:id', function(req, res){

    ( async() => {

        res.send(await applicationController.updateApplication(req.params.id, req.body)); 

    })();

});

routerApp.delete('/:id', function(req, res){

    ( async() => {

        res.send(await applicationController.deleteApplication(req.params.id)); 

    })();

});

module.exports = routerApp;