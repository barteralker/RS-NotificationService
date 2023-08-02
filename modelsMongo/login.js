
const winston = require('winston');
const Login = require('../mongooseCollections/login').Login;

async function createLogin(user_id) {

    winston.info(`In Logins Model - Creating New Login`);

    const mongoLogin = new Login({
        user_id: user_id
    });    

    return (await mongoLogin.save());

}

module.exports = {
    createLogin
}
