
const debug = require('debug')('app:appDebugger');
const applicationModel = require('../Models/application');
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
    return (await applicationModel.getAllApplications()).rows;

}

async function getApplicationById(id) {

    debug(`In Applications Controller - Getting Application with ID ${id}`);

    result = await applicationModel.getApplicationById(id);

    return (result.rows.length > 0 ? result.rows : `Application with ID ${id} does not exist`);

}

async function createApplication(application) {

    debug(`In Applications Controller - Creating New Application`);

    const validationResult = validateApp(application);

    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await applicationModel.createApplication(application);

    return `New Application with Id : ${result.rows[0]["id"]} created`;

}

async function updateApplication(id, application) {

    debug(`In Applications Controller - Updating Application with ID ${id}`);

    if ((await applicationModel.getApplicationById(id)).rows.length < 1) return `Appliction with id ${id} not found`;
    
    const validationResult = validateApp(application);

    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await applicationModel.updateApplication(id, application);

    return `Application with Id : ${id} updated`;

}

async function deleteApplication(id) {

    debug(`In Applications Controller - Deleting Application with ID ${id}`);

    const deletedApplication = await applicationModel.getApplicationById(id);

    if (deletedApplication.rows.length < 1) return `Appliction with id ${id} not found`;

    result = await applicationModel.deleteApplication(id);

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