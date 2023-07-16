
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const userController = require('../Controllers/user');

routerApp.post('', async (req, res) => {

    res.send(await userController.createUser(req.body)); 

});

module.exports = routerApp;