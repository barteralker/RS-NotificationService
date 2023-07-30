
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const utils = require('../Middleware/Utils');

if (DB_Conn === Constants.DB_CONNS_PG) { var applicationModel = require('../PostgresModels/application'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var applicationModel = require('../MongoModels/application'); };

function validateApplication(body) {

    winston.info('Validating Application Input');
    const schema = Joi.object({
        
        name: Joi.string().required().min(3).max(15),
        description: Joi.string().max(50)

    });

    return schema.validate(body);

};

async function getAllApplications(req) {

    winston.info(`In Applications Controller - Getting All Applications`);

    if (req.header('filter') && req.header('filter') === 'true') {

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await applicationModel.getFilteredApplications(utils.postgresFilterCreator(req.body));
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await applicationModel.getFilteredApplications(req.body);

    }

    else var result = await applicationModel.getAllApplications();

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function getApplicationById(id) {

    winston.info(`In Applications Controller - Getting Application with ID ${id}`);

    const result = await applicationModel.getApplicationById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createApplication(application) {

    winston.info(`In Applications Controller - Creating New Application`);

    const validationResult = validateApplication(application);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await applicationModel.createApplication(application);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;
    
}

async function updateApplication(id, application) {

    winston.info(`In Applications Controller - Updating Application with ID ${id}`);

    console.log(await getApplicationById(id));
    if (typeof (await getApplicationById(id)) === "string") return `Appliction with id ${id} not found`;
    
    const validationResult = validateApplication(application);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result =  await applicationModel.updateApplication(id, application);


    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function deleteApplication(id) {

    winston.info(`In Applications Controller - Deleting Application with ID ${id}`);

    const deletedApplication = await getApplicationById(id);

    if (typeof deletedApplication === "string") return `Appliction with id ${id} not found`;

    result = await applicationModel.deleteApplication(id);

    return deletedApplication

}

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}