
const winston = require('winston');
const pg = require('../DBConns/pgConnection');
const queries = require('../PostgresQueries/user');

async function createUser(user) {

    winston.info(`In Users Model - Creating New User`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_USER;
    const values = [user.name, user.email, user.password, user.application_id];

    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

async function getUser(user) {

    winston.info(`In Users Model - Getting User`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.GET_USER_BY_EMAIL_AND_APPLICATION;
    const values = [user.email, user.application_id];

    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

module.exports = {
    createUser,
    getUser
}
