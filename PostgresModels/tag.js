
const winston = require('winston');
const pg = require('../DBConns/pgConnection');
const queries = require('../PostgresQueries/tag');

async function createTag(tag) {

    winston.info(`In Tags Model - Creating New Tag`);

    pool = new pg.Pool(pg.credentials);

    const querySQl = queries.CREATE_TAG;
    const values = [tag];

    winston.info(`Running Postgres query : ${querySQl}`);
    const result = await pool.query(querySQl, values);
    
    await pool.end();
    
    return result;

}

module.exports = {
    createTag
}