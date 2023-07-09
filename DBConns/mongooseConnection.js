
const mongoose = require('mongoose');
const schemaName = require('../resources/config.json').DB_Schema;
const debug = require('debug')('app:appDebugger');

mongoose.connect(`mongodb://localhost/${schemaName}`)
    .then(() => debug(`Connected to MongoDB at mongodb://localhost/${schemaName}`))
    .catch(err => debug(`Error : ${err}`));

module.exports = {
    mongoose
};