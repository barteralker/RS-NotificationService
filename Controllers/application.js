
const debug = require('debug')('app:appDebugger');
const applicationPGModel = require('../PGModels/application');
const applicationMongoModel = require('../MongoModels/application');
const DB_Conn = require('../resources/config.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');

function validateApp(body) {

    debug('Validating Application Input');
    const schema = Joi.object({
        
        name: Joi.string().required(),
        description: Joi.string()
    });

    return schema.validate(body);

};

async function getAllApplications() {

    debug(`In Applications Controller - Getting All Applications`);
    return (await applicationPGModel.getAllApplications()).rows;

}

async function getApplicationById(id) {

    debug(`In Applications Controller - Getting Application with ID ${id}`);

    result = await applicationPGModel.getApplicationById(id);

    return (result.rows.length > 0 ? result.rows : `Application with ID ${id} does not exist`);

}

async function createApplication(application) {

    debug(`In Applications Controller - Creating New Application`);

    const validationResult = validateApp(application);

    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    if (DB_Conn === Constants.DB_CONNS_PG) {

        result = await applicationPGModel.createApplication(application);
        return `New Application with Id : ${result.rows[0]["id"]} created`;
    
    }

    if (DB_Conn === Constants.DB_CONNS_MONGO) {

        result = await applicationMongoModel.createApplication(application);
        return `New Application with Id : ${result["_id"]} created`;
    
    }
    

    // return `
    // New Application with Id : ${result.pgResult.rows[0]["id"]} created in Postgres DB
    // New Application with Id : ${result.mongoResult["_id"]} created in Mongo DB`;

}

async function updateApplication(id, application) {

    debug(`In Applications Controller - Updating Application with ID ${id}`);

    if ((await applicationPGModel.getApplicationById(id)).rows.length < 1) return `Appliction with id ${id} not found`;
    
    const validationResult = validateApp(application);

    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await applicationPGModel.updateApplication(id, application);

    return `Application with Id : ${id} updated`;

}

async function deleteApplication(id) {

    debug(`In Applications Controller - Deleting Application with ID ${id}`);

    const deletedApplication = await applicationPGModel.getApplicationById(id);

    if (deletedApplication.rows.length < 1) return `Appliction with id ${id} not found`;

    result = await applicationPGModel.deleteApplication(id);

    return `Application with Id : ${id} deleted
    ${JSON.stringify(deletedApplication.rows[0])}`;

}

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}