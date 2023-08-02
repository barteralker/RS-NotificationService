
const winston = require('winston');
const pg = require('../dbConnections/pgConnection');
const queries = require('../postgresQueries/login');

async function createLogin(user_id) {

    winston.info(`In Logins Model - Creating New Login`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_LOGIN;
    const values = [user_id, new Date().toUTCString()];

    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

module.exports = {
    createLogin
}
