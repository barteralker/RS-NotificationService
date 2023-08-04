
const logger = require('../startup/loggingSetup');
const config = require('config');
const DB_Conn = require(`../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const utils = require('../utils/FilterUtils');

if (DB_Conn === Constants.DB_CONNS_PG) { var applicationModel = require('../modelsPG/application'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var applicationModel = require('../modelsMongo/application'); };

function validateApplication(body, validator) {

    if (validator === Constants.VALIDATOR_CREATE_UPDATE) {

        logger.info(`Validating Application Input`);
        
        const schema = Joi.object({
            
            name: Joi.string().required().min(3).max(15),
            description: Joi.string().max(50)

        });

        return schema.validate(body);

    }

    else if (validator === Constants.VALIDATOR_FILTER) {

        logger.info(`Validating Application Filters`);
        
        const schema = Joi.object({
            
            name: Joi.string().max(15),
            description: Joi.string().max(50)

        });

        return schema.validate(body);

    }

};

async function getAllApplications(req) {

    logger.info(`In Applications Controller - Getting All Applications`);

    if (req.header('filter') && req.header('filter') === 'true') {

        const validationResult = validateApplication(req.body, Constants.VALIDATOR_FILTER);
        if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;    

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await applicationModel.getFilteredApplications(utils.postgresFilterCreator(req.body));
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await applicationModel.getFilteredApplications(req.body);

    }

    else var result = await applicationModel.getAllApplications();

    if (DB_Conn === Constants.DB_CONNS_PG) return utils.paginateResults(result.rows, req);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return utils.paginateResults(result, req);

}

async function getApplicationById(id) {

    logger.info(`In Applications Controller - Getting Application with ID ${id}`);

    const result = await applicationModel.getApplicationById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createApplication(application) {

    logger.info(`In Applications Controller - Creating New Application`);

    const validationResult = validateApplication(application, Constants.VALIDATOR_CREATE_UPDATE);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    let exists = await applicationModel.getFilteredApplications(utils.postgresFilterCreator({"name" : application.name}));
    if (DB_Conn === Constants.DB_CONNS_PG) exists = exists.rows;
    exists = exists.length > 0;

    if (!exists) {
    
        var result = await applicationModel.createApplication(application);

        if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
        if (DB_Conn === Constants.DB_CONNS_MONGO) return result;
    
    }

    else throw new Error('Application already exists');
    
}

async function updateApplication(id, application) {

    logger.info(`In Applications Controller - Updating Application with ID ${id}`);

    if ((await getApplicationById(id)).length === 0) return `Appliction with id ${id} not found`;
    
    const validationResult = validateApplication(application, Constants.VALIDATOR_CREATE_UPDATE);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result =  await applicationModel.updateApplication(id, application);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];

}

async function deleteApplication(id) {

    logger.info(`In Applications Controller - Deleting Application with ID ${id}`);

    const deletedApplication = await getApplicationById(id);

    if (deletedApplication.length === 0) return `Appliction with id ${id} not found`;

    result = await applicationModel.deleteApplication(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return deletedApplication;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [deletedApplication];

}

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}