
const config = require('config');
const schema = require(`../config/${config.get('instance')}.json`).DB_Schema;

const CREATE_TAG = `INSERT INTO ${schema}.tag (tag_name) VALUES ($1) ON CONFLICT DO NOTHING`;

module.exports = {
    CREATE_TAG
}