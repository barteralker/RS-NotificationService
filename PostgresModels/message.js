
const debug = require('debug')('app:appDebugger');
const pg = require('../DBConns/pgConnection');
const queries = require('../PostgresQueries/message');

async function getAllMessages() {

    debug(`In Messages Model - Getting All Messages`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_ALL_MESSAGES;
    debug(`Running Postgres query : ${querySQl}`);

    const result = await pool.query(querySQl);

    await pool.end();   

    return result;

}

async function getMessageById(id) {

    debug(`In Messages Model - Getting Message with ID ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_MESSAGE_BY_ID;
    const values = [id];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();

    return result;

}

async function createMessage(message) {

    debug(`In Messages Model - Creating New Message`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_MESSAGE;
    const values = [message.message_text, message.notification_type, message.timestamp];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function updateMessage(id, message) {

    debug(`In Messages Model - Updating Message with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.UPDATE_MESSAGE;
    const values = [message.message_text, message.notification_type, message.timestamp, id];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

async function deleteMessage(id) {

    debug(`In Messages Model - Deleting Message with ID : ${id}`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.DELETE_MESSAGE;
    const values = [id];

    debug(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();   

    return result;

}

module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}