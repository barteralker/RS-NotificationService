
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());

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
    res.send(applications);
});

routerApp.get('/:id', function(req, res){

    if (!(applications.map((app) => app.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Application with id ${req.params.id} not found`);

    res.send(applications.find( item => item.id == req.params.id))

});

routerApp.post('', function(req, res){
    
    const validationResult = validateApp(req.body);

    if (validationResult.error) {
        res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
        return;
    };

    let id = applications.map((app) => app.id).reduce((a, b) => Math.max(a, b)) + 1;

    applications.push({
        id: id,
        name: req.body.name,
        description: req.body.description || ""
    });

    res.send(`Application with id ${id} added successfully`);

});

routerApp.put('/:id', function(req, res){

    if (!(applications.map((app) => app.id).includes(parseInt(req.params.id)))) return res.status(404).send(`App with id ${req.params.id} not found`);
    
    const validationResult = validateApp(req.body);

    if (validationResult.error) {
        res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
        return;
    };

    const application = applications.find(a => a.id == req.params.id);

    application.name = req.body.name || application.name;
    application.description = req.body.description || application.description;

    res.send(`Application with id ${req.params.id} updated`);
});

routerApp.delete('/:id', function(req, res){

    if (!(applications.map((app) => app.id).includes(parseInt(req.params.id)))) return res.status(404).send(`App with id ${req.params.id} not found`);

    let app = applications.find( item => item.id == req.params.id);
    let idx = applications.indexOf(app);
    applications.splice(idx, 1);

    res.send(app);

});

module.exports = routerApp;