
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const loginController = require('../Controllers/login');

routerApp.post('', async (req, res) => {

    res.send(await loginController.login(req.body)); 

});

module.exports = routerApp;