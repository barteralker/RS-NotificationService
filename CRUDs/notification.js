
const express = require('express');
const app = express();
app.use(express.json());

const Joi = require('joi');

const notifications = [{
    id: 1,
    event_id: 1, 
    notification_name: "Training Assigned Notification",
    template_subject: "ETS Training Assigned",
    template_body: `
    Dear {username}

    You have been assigned the following course.
    
    Course Name : {course_title}
    Course Code : {coures_code} 
    
    Regards,
    `
}];

function validateNotification(body) {

    const schema = Joi.object({
        event_id: Joi.number().integer().min(1).required(),
        notification_name: Joi.string().min(3).required(),
        template_subject: Joi.string().required(),
        template_body: Joi.string().required()
    });

    return schema.validate(body);

};

module.exports = function(app){

    app.get('/notifications', function(req, res){
        res.send(notifications);
    });

    app.get('/notifications/:id', function(req, res){

        if (!(notifications.map((n) => n.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Notification with id ${req.params.id} not found`);
    
        res.send(notifications.find( item => item.id == req.params.id))

    });

    app.post('/notifications', function(req, res){
        
        const validationResult = validateNotification(req.body);

        if (validationResult.error) {
            res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
            return;
        };
    
        let id = notifications.map((n) => n.id).reduce((a, b) => Math.max(a, b)) + 1;
    
        notifications.push({
            id: id,
            event_id: req.body.event_id,
            notification_name: req.body.notification_name,
            template_subject: req.body.template_subject,
            template_body: req.body.template_body
        });
    
        res.send(`Notification with id ${id} added successfully`);
    
    });
    
    app.put('/notifications/:id', function(req, res){

        if (!(notifications.map((n) => n.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Notification with id ${req.params.id} not found`);
        
        const validationResult = validateNotification(req.body);

        if (validationResult.error) {
            res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
            return;
        };
    
        const notification = notifications.find(a => a.id == req.params.id);

        notification.event_id = req.body.event_id || notification.event_id;
        notification.notification_name = req.body.notification_name || notification.notification_name;
        notification.template_subject = req.body.template_subject || notification.template_subject;
        notification.template_body = req.body.template_body || notification.template_body;

        res.send(`Notification with id ${req.params.id} updated`);
    });
    
    app.delete('/notifications/:id', function(req, res){

        if (!(notifications.map((n) => n.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Notification with id ${req.params.id} not found`);

        let notification = notifications.find( item => item.id == req.params.id);
        let idx = notifications.indexOf(notification);
        notifications.splice(idx, 1);
    
        res.send(notification);

    });

}