
const express = require('express');
const routerApp = express.Router();
routerApp.use(express.json());
const loginController = require('../controllers/login');
const log = require('../middleware/Logger');
const traceIdGen = require('../utils/TraceIdGenerator');

routerApp.post('', log, async (req, res) => {

    res.send(await loginController.login(req.body, traceIdGen.getTraceId())); 

});

module.exports = routerApp;