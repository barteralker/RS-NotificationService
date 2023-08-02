
const winston = require('winston');
const pg = require('../dbConnections/pgConnection');
const queries = require('../postgresQueries/message');

async function getAllMessages() {

    winston.info(`In Messages Model - Getting All Messages`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_MESSAGES;
    winston.info(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getFilteredMessages(appendee) {

    winston.info(`In Messages Model - Getting Filtered Messages`);

    pool = new pg.Pool(pg.credentials);

    let querySQl = queries.GET_ALL_MESSAGES + appendee; 
    
    const result = await pool.query(querySQl);
    await pool.end();   

    return result;

}

async function getMessageById(id) {

    winston.info(`In Messages Model - Getting Message with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_MESSAGE_BY_ID;
    const values = [id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createMessage(message) {

    winston.info(`In Messages Model - Creating New Message`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_MESSAGE;
    const values = [message.message_text, message.notification_type, message.timestamp];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateMessage(id, message) {

    winston.info(`In Messages Model - Updating Message with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_MESSAGE;
    const values = [message.message_text, message.notification_type, message.timestamp, id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteMessage(id) {

    winston.info(`In Messages Model - Deleting Message with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_MESSAGE;
    const values = [id];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllMessages,
    getFilteredMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}