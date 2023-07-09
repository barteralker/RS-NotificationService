
const mongoose = require('mongoose');
const schemaName = require('../resources/config.json').DB_Schema;
const DB_Conn = require('../resources/config.json').DB_CONN;
const debug = require('debug')('app:appDebugger');
const Constants = require('../resources/constants');

if (DB_Conn === Constants.DB_CONNS_MONGO) {
    
    mongoose.connect(`mongodb://localhost/${schemaName}`)
        .then(() => debug(`Connected to MongoDB at mongodb://localhost/${schemaName}`))
        .catch(err => debug(`Error : ${err}`));

    const applicationSchema = new mongoose.Schema({
        name : String,
        description : {
            type : String,
            default : ""
        }
    });

    const Application = mongoose.model('application', applicationSchema);

        
    module.exports = {
        mongoose,
        Application
    };

}