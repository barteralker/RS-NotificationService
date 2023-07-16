
const winston = require('winston');
const User = require('../MongooseCollections/user').User;

async function createUser(user) {

    winston.info(`In Users Model - Creating New User`);

    const mongoUser = new User({
        name : user.name,
        email: user.email,
        password: user.password,
        application_id: user.application_id
    });    

    return (await mongoUser.save());

}

module.exports = {
    createUser
}