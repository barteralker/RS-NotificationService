
const winston = require('winston');
const pg = require('../DBConns/pgConnection');
const querySQl = require('../PostgresQueries/user');

async function createUser(user) {

    winston.info(`In Users Model - Creating New User`);

    pool = new pg.Pool(pg.credentials);

    const values = [user.name, user.email, user.password, user.application_id];

    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

module.exports = {
    createUser
}
