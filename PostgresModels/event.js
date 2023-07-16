
const winston = require('winston');
const pg = require('../DBConns/pgConnection');
const queries = require('../PostgresQueries/event');

async function getAllEvents() {

    winston.info(`In Events Model - Getting All Events`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_EVENTS;
    winston.info(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getEventById(id) {

    winston.info(`In Events Model - Getting Event with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_EVENT_BY_ID;
    const values = [id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createEvent(event) {

    winston.info(`In Events Model - Creating New Event`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_EVENT;
    const values = [event.application_id, event.name, event.description];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateEvent(id, event) {

    winston.info(`In Events Model - Updating Event with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_EVENT;
    const values = [event.application_id, event.name, event.description, id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteEvent(id) {

    winston.info(`In Events Model - Deleting Event with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_EVENT;
    const values = [id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}