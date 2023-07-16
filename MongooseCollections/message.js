
const mongoose = require('../DBConns/mongooseConnection').mongoose;

const messageSchema = new mongoose.Schema({
    message_text: String,
    notification_type : Number,
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Message = mongoose.model('message', messageSchema);

module.exports = {
    Message
}