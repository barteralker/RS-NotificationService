
const mongoose = require('../dbConnections/mongooseConnection').mongoose;

const loginSchema = new mongoose.Schema({
    user_id: String,
    timestamp: {
        type: String,
        default: new Date().toUTCString()
    }
});

const Login = mongoose.model('login', loginSchema);

module.exports = {
    Login
}