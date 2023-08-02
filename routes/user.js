
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const userController = require('../controllers/user');
const log = require('../Middleware/Logger');

routerApp.post('', log, async (req, res) => {

    res.send(await userController.createUser(req.body)); 

});

module.exports = routerApp;