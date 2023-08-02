
const mongoose = require('../dbConnections/mongooseConnection').mongoose;

const tagSchema = new mongoose.Schema({
    tag_name: String
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = {
    Tag
}