
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const userController = require('../controllers/user');
const log = require('../middleware/Logger');
const traceIdGen = require('../utils/TraceIdGenerator');

routerApp.post('', log, async (req, res) => {

    res.send(await userController.createUser(req.body, traceIdGen.getTraceId())); 

});

module.exports = routerApp;