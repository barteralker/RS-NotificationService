
const mongoose = require('mongoose');
const schemaName = require('../config/default.json').DB_Schema;
const DB_Conn = require('../config/default.json').DB_CONN;
const winston = require('winston');
const Constants = require('../config/constants');

if (DB_Conn === Constants.DB_CONNS_MONGO) {
    
    mongoose.connect(`mongodb://localhost/${schemaName}`)
        .then(() => winston.info(`Connected to MongoDB at mongodb://localhost/${schemaName}`))
        .catch(err => winston.info(`Error : ${err}`));

    module.exports = {
        mongoose
    };

}