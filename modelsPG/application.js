
const winston = require('winston');
const pg = require('../dbConnections/pgConnection');
const queries = require('../postgresQueries/application');

async function getAllApplications() {

    winston.info(`In Applications Model - Getting All Applications`);

    pool = new pg.Pool(pg.credentials);
    const result = await pool.query(queries.GET_ALL_APPLICATIONS);
    await pool.end();   

    return result;

}

async function getFilteredApplications(appendee) {

    winston.info(`In Applications Model - Getting Filtered Applications`);

    pool = new pg.Pool(pg.credentials);

    let querySQl = queries.GET_ALL_APPLICATIONS + appendee; 
    
    const result = await pool.query(querySQl);
    await pool.end();   

    return result;

}

async function getApplicationById(id) {

    winston.info(`In Applications Model - Getting Application with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_APPLICATION_BY_ID;
    const values = [id];

    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createApplication(application) {

    winston.info(`In Applications Model - Creating New Application`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_APPLICATION;
    const values = [application.name, application.description];

    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateApplication(id, application) {

    winston.info(`In Applications Model - Updating Application with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_APPLICATION;
    const values = [application.name, application.description, id];

    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteApplication(id) {

    winston.info(`In Applications Model - Deleting Application with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_APPLICATION;
    const values = [id];

    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllApplications,
    getFilteredApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
}