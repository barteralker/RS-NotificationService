
const schema = require('../resources/config.json').DB_Schema;

const CREATE_LOGIN = `INSERT INTO ${schema}.login (user_id, timestamp) VALUES ($1, $2)`;

 module.exports = {
    CREATE_LOGIN
}