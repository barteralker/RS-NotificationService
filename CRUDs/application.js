
const express = require('express');
const app = express();
app.use(express.json());

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

module.exports = function(app){

    app.get('/applications', function(req, res){
        res.send(applications);
    });

    app.get('/applications/:id', function(req, res){

        if (!(applications.map((app) => app.id).includes(parseInt(req.params.id)))) return res.status(404).send(`Application with id ${req.params.id} not found`);
    
        res.send(applications.find( item => item.id == req.params.id))

    });

    app.post('/applications', function(req, res){
        
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
    
    app.put('/applications/:id', function(req, res){

        if (!(applications.map((app) => app.id).includes(parseInt(req.params.id)))) return res.status(404).send(`App with id ${req.params.id} not found`);
        
        const validationResult = validateApp(req.body);

        if (validationResult.error) {
            res.status(400).send(`Error : ${validationResult.error.details[0].message}`)
            return;
        };
    
        const app = applications.find(a => a.id == req.params.id);

        app.name = req.body.name || app.name;
        app.description = req.body.description || app.description;

        res.send(`Applications with id ${req.params.id} updated`);
    });
    
    app.delete('/applications/:id', function(req, res){

        if (!(applications.map((app) => app.id).includes(parseInt(req.params.id)))) return res.status(404).send(`App with id ${req.params.id} not found`);

        let app = applications.find( item => item.id == req.params.id);
        let idx = applications.indexOf(app);
        applications.splice(idx, 1);
    
        res.send(app);

    });

}
