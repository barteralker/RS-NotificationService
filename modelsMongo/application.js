
const logger = require('../startup/loggingSetup');
const Application = require('../mongooseCollections/application').Application;

async function getAllApplications() {

    logger.info(`In Applications Model - Getting All Applications`);

    return (await Application.find());

}

async function getFilteredApplications(filters) {

    logger.info(`In Applications Model - Getting Filtered Applications`);

    return (await Application.find(filters));

}

async function getApplicationById(id) {

    logger.info(`In Applications Model - Getting Application with ID ${id}`);

    return (await Application.findById(id));

}

async function createApplication(application) {

    logger.info(`In Applications Model - Creating New Application`);

    const mongoApplication = new Application({
        name : application.name,
        description: application.description
    });    

    return (await mongoApplication.save());

}

async function updateApplication(id, application) {

    logger.info(`In Applications Model - Updating Application with ID : ${id}`);

    return (await Application.findByIdAndUpdate(id, {
        name : application.name,
        description : application.description
    }));

}

async function deleteApplication(id) {

    logger.info(`In Applications Model - Deleting Application with ID : ${id}`);

    return (await Application.findByIdAndDelete(id));

}

module.exports = {
    getAllApplications,
    getFilteredApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}