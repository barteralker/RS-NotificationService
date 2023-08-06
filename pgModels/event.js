
const logger = require('../startup/loggingSetup');
const pg = require('../dbConnections/pgConnection');
const queries = require('../postgresQueries/event');

async function getAllEvents() {

    logger.info(`In Events Model - Getting All Events`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_EVENTS;
    logger.info(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getFilteredEvents(appendee) {

    logger.info(`In Events Model - Getting Filtered Events`);

    pool = new pg.Pool(pg.credentials);

    let querySQl = queries.GET_ALL_EVENTS + appendee; 
    
    const result = await pool.query(querySQl);
    await pool.end();   

    return result;

}

async function getEventById(id) {

    logger.info(`In Events Model - Getting Event with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_EVENT_BY_ID;
    const values = [id];

    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createEvent(event) {

    logger.info(`In Events Model - Creating New Event`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_EVENT;
    const values = [event.application_id, event.name, event.description];

    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateEvent(id, event) {

    logger.info(`In Events Model - Updating Event with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_EVENT;
    const values = [event.application_id, event.name, event.description, id];

    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteEvent(id) {

    logger.info(`In Events Model - Deleting Event with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_EVENT;
    const values = [id];

    logger.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllEvents,
    getFilteredEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}