
const mongoose = require('../dbConnections/mongooseConnection').mongoose;

const notificationSchema = new mongoose.Schema({
    name: String,
    event_id : Number,
    template_subject: String,
    template_body: String
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = {
    Notification
}