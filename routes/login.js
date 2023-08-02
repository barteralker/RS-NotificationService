
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const loginController = require('../controllers/login');
const log = require('../Middleware/Logger');

routerApp.post('', log, async (req, res) => {

    res.send(await loginController.login(req.body)); 

});

module.exports = routerApp;