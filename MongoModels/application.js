
const debug = require('debug')('app:appDebugger');
const pg = require('../DBConns/pgConnection');
const Application = require('../MongooseCollections/application').Application;
const queries = require('../PostgresQueries/application');

async function getAllApplications() {

    debug(`In Applications Model - Getting All Applications`);

    return (await Application.find());

}

async function getApplicationById(id) {

    debug(`In Applications Model - Getting Application with ID ${id}`);

    const result = await Application.findById(id);

    return result;

}

async function createApplication(application) {

    debug(`In Applications Model - Creating New Application`);

    const mongoApplication = new Application({
        name : application.name,
        description: application.description
    });    

    const result = await mongoApplication.save();

    return result;

}

async function updateApplication(id, application) {

    debug(`In Applications Model - Updating Application with ID : ${id}`);

    const result = await Application.findByIdAndUpdate(id, {
        name : application.name,
        description : application.description
    });

    return result;

}

async function deleteApplication(id) {

    debug(`In Applications Model - Deleting Application with ID : ${id}`);

    const result = await Application.findByIdAndDelete(id);

    return result;

}

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}