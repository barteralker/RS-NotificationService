
const mongoose = require('mongoose');
const schemaName = require('../config/dev.json').DB_Schema;
const DB_Conn = require('../config/dev.json').DB_CONN;
const logger = require('../startup/loggingSetup');
const Constants = require('../resources/constants');

if (DB_Conn === Constants.DB_CONNS_MONGO) {
    
    mongoose.connect(`mongodb://localhost/${schemaName}`)
        .then(() => logger.info(`Connected to MongoDB at mongodb://localhost/${schemaName}`))
        .catch(err => logger.info(`Error : ${err}`));

    module.exports = {
        mongoose
    };

}