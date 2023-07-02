
const express = require('express');
const app = express();
app.use(express.json());

const Joi = require('joi');

require('./CRUDs/application.js')(app);

app.get('/', (req, res) => {
    // res.send(`
    // |/\ /\  |  . /\ . /\ /\   |  . /\ |/\      /\ /\ |/      . /\ /\
    // | | || -|- | |_ | |  ||  -|- | || | |  --  \  |/ |  \  / | |  |/
    // | | \/  \  | |  | \/ \/\  \  | \/ | |      \/ |_ |   \/  | \/ |_
    // Welcome to Notification Service.`);

    res.send('Welcome to Notification Service');
})

const port = process.env.port || 3001;

app.listen(port, () => console.log(`Listening on Port ${port} !`));
