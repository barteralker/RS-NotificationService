
const mongoose = require('../dbConnections/mongooseConnection').mongoose;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    application_id: Number
});

const User = mongoose.model('user', userSchema);

module.exports = {
    User
}