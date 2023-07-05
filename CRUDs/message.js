
const express = require('express');
const app = express();
app.use(express.json());

const Joi = require('joi');

const messages = [];

function validateMessage(body) {

    const schema = Joi.object({
        event_id: Joi.number().integer().min(1).required(),
        notification_name: Joi.string().min(3).required(),
        template_subject: Joi.string().required(),
        template_body: Joi.string().required()
    });

    return schema.validate(body);

};

module.exports = function(app){

    app.get('/messages', function(req, res){
        res.send(messages);
    });

    app.get('/messages/:id', function(req, res){

        if (!(messages.map((m) => m.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Message with id ${req.params.id} not found`);
    
        res.send(messages.find( item => item.id == req.params.id))

    });

    app.post('/messages', function(req, res){
        
        const validationResult = validateMessage(req.body);

        if (validationResult.error) {
            res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
            return;
        };
    
        let id = messages.map((m) => m.id).reduce((a, b) => Math.max(a, b)) + 1;
    
        messages.push({
            id: id,
            notification_type: req.body.notification_type,
            messageText: req.body.messageText,
        });
    
        res.send(`Message with id ${id} added successfully`);
    
    });
    
    app.put('/messages/:id', function(req, res){

        if (!(messages.map((m) => m.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Message with id ${req.params.id} not found`);
        
        const validationResult = validateMessage(req.body);

        if (validationResult.error) {
            res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
            return;
        };
    
        const message = messages.find(a => a.id == req.params.id);

        message.notification_type = req.body.notification_type || message.notification_type;
        message.messageText = req.body.messageText || message.messageText;

        res.send(`Message with id ${req.params.id} updated`);
    });
    
    app.delete('/messages/:id', function(req, res){

        if (!(messages.map((m) => m.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Message with id ${req.params.id} not found`);

        let message = messages.find( item => item.id == req.params.id);
        let idx = messages.indexOf(message);
        messages.splice(idx, 1);
    
        res.send(message);

    });
}