
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');

if (DB_Conn === Constants.DB_CONNS_PG) { var applicationModel = require('../PostgresModels/application'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var applicationModel = require('../MongoModels/application'); };

function validateApplication(body) {

    winston.info('Validating Application Input');
    const schema = Joi.object({
        
        name: Joi.string().required(),
        description: Joi.string()
    });

    return schema.validate(body);

};

async function getAllApplications() {

    winston.info(`In Applications Controller - Getting All Applications`);

    result = await applicationModel.getAllApplications();

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function getApplicationById(id) {

    winston.info(`In Applications Controller - Getting Application with ID ${id}`);

    result = await applicationModel.getApplicationById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return (result.rows.length > 0 ? result.rows : `Application with ID ${id} does not exist`);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result !== null ? result : `Application with ID ${id} does not exist`;

}

async function createApplication(application) {

    winston.info(`In Applications Controller - Creating New Application`);

    const validationResult = validateApplication(application);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await applicationModel.createApplication(application);

    if (DB_Conn === Constants.DB_CONNS_PG) return `New Application with Id : ${result.rows[0]["id"]} created`;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return `New Application with Id : ${result["_id"]} created`;
    
}

async function updateApplication(id, application) {

    winston.info(`In Applications Controller - Updating Application with ID ${id}`);

    if (typeof (await getApplicationById(id)) === "string") return `Appliction with id ${id} not found`;
    
    const validationResult = validateApplication(application);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await applicationModel.updateApplication(id, application);

    return `Application with Id : ${id} updated`;

}

async function deleteApplication(id) {

    winston.info(`In Applications Controller - Deleting Application with ID ${id}`);

    const deletedApplication = await getApplicationById(id);

    if (typeof deletedApplication === "string") return `Appliction with id ${id} not found`;

    result = await applicationModel.deleteApplication(id);

    return `Application with Id : ${id} deleted
    ${JSON.stringify(deletedApplication)}`;

}

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}