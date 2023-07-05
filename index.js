
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

const Joi = require('joi');

const application = require('./CRUDs/application.js')(app);
const event = require('./CRUDs/event.js')(app);
const notification = require('./CRUDs/notification.js')(app);
const message = require('./CRUDs/message.js')(app);

// app.use('/api', application);
// app.use('/api', event);
// app.use('/api', notification);
// app.use('/api', message);

app.get('/', (req, res) => {
    res.send('Welcome to Notification Service');
})

const port = process.env.port || 3001;

app.listen(port, () => console.log(`Listening on Port ${port} !`));
