
const mongoose = require('../DBConns/mongooseConnection').mongoose;

const applicationSchema = new mongoose.Schema({
    name: String,
    description: {
        type: String,
        default: ""
    }
});

const Application = mongoose.model('application', applicationSchema);

module.exports = {
    Application
}