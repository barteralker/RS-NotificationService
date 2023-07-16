const schema = require('../resources/config.json').DB_Schema;

module.exports = `INSERT INTO ${schema}.user (name, email, password, application_id) VALUES ($1, $2, $3, $4) RETURNING id`;
