
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());

const Joi = require('joi');

const events = [
    {
        id: 1,
        application_id: 1,
        event_name: "Training Assigned",
        description: "Employee Training System"
    }
];

function validateEvent(body) {

    const schema = Joi.object({
        application_id: Joi.number().integer().min(1).required(),
        event_name: Joi.string().min(3).required(),
        description: Joi.string().min(0)
    });

    return schema.validate(body);

};

routerApp.get('', function(req, res){
    res.send(events);
});

routerApp.get('/:id', function(req, res){

    if (!(events.map((e) => e.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Event with id ${req.params.id} not found`);

    res.send(events.find( item => item.id == req.params.id))

});

routerApp.post('', function(req, res){
    
    const validationResult = validateEvent(req.body);

    if (validationResult.error) {
        res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
        return;
    };

    let id = events.map((e) => e.id).reduce((a, b) => Math.max(a, b)) + 1;

    events.push({
        id: id,
        application_id: req.body.application_id,
        event_name: req.body.event_name,
        description: req.body.description || ""
    });

    res.send(`Event with id ${id} added successfully`);

});

routerApp.put('/:id', function(req, res){

    if (!(events.map((e) => e.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Event with id ${req.params.id} not found`);
    
    const validationResult = validateEvent(req.body);

    if (validationResult.error) {
        res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
        return;
    };

    const event = events.find(a => a.id == req.params.id);

    event.application_id = req.body.application_id || event.application_id;
    event.event_name = req.body.event_name || event.event_name;
    event.description = req.body.description || event.description;

    res.send(`Event with id ${req.params.id} updated`);
});

routerApp.delete('/:id', function(req, res){

    if (!(events.map((e) => e.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Event with id ${req.params.id} not found`);

    let event = events.find( item => item.id == req.params.id);
    let idx = events.indexOf(event);
    events.splice(idx, 1);

    res.send(event);

});

module.exports = routerApp;