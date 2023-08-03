
const logger = require('../startup/loggingSetup');
const Application = require('../mongooseCollections/application').Application;

async function getAllApplications(tid) {

    logger.setTraceId(tid);
    logger.info(`In Applications Model - Getting All Applications`);

    return (await Application.find());

}

async function getFilteredApplications(filters, tid) {

    logger.setTraceId(tid);
    logger.info(`In Applications Model - Getting Filtered Applications`);

    return (await Application.find(filters));

}

async function getApplicationById(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Applications Model - Getting Application with ID ${id}`);

    return (await Application.findById(id));

}

async function createApplication(application, tid) {

    logger.setTraceId(tid);
    logger.info(`In Applications Model - Creating New Application`);

    const mongoApplication = new Application({
        name : application.name,
        description: application.description
    });    

    return (await mongoApplication.save());

}

async function updateApplication(id, application, tid) {

    logger.setTraceId(tid);
    logger.info(`In Applications Model - Updating Application with ID : ${id}`);

    return (await Application.findByIdAndUpdate(id, {
        name : application.name,
        description : application.description
    }));

}

async function deleteApplication(id, tid) {

    logger.setTraceId(tid);
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