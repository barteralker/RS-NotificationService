
const mongoose = require('../dbConnections/mongooseConnection').mongoose;

const eventSchema = new mongoose.Schema({
    name: String,
    application_id : Number,
    description: {
        type: String,
        default: ""
    }
});

const Event = mongoose.model('event', eventSchema);

module.exports = {
    Event
}