
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../config/constants');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

if (DB_Conn === Constants.DB_CONNS_PG) { 
    var userModel = require('../PostgresModels/user'); 
    var loginModel = require('../PostgresModels/login'); 
};

if (DB_Conn === Constants.DB_CONNS_MONGO) { 
    var userModel = require('../MongoModels/user'); 
    var loginModel = require('../MongoModels/login'); 
};

function validateLoginInfo(body) {

    winston.info('Validating Login Input');
    const schema = Joi.object({
        
        email: Joi.string().required().min(10),
        password: Joi.string().required().min(8),
        application_id: Joi.number().required().min(1)

    });

    return schema.validate(body);

};

async function login(user) {

    winston.info(`In Logins Controller - Creating New Login`);

    const validationResult = validateLoginInfo(user);
    if (validationResult.error) return `Invlaid username or password`;

    let userObj = await userModel.getUser(user);

    if (DB_Conn === Constants.DB_CONNS_PG) {

        if (userObj.rows.length < 1) return 'Invlaid username or password';
        
        userObj = userObj.rows[0];
    }

    if (DB_Conn === Constants.DB_CONNS_MONGO) {

        if (userObj.length < 1) return 'Invlaid username or password';
        
        userObj = userObj[0];
        userObj.id = userObj["_id"].toString();
    }

    const validatePassword = await bcrypt.compare(user.password, userObj.password);

    if (!validatePassword) return `Invlaid username or password`;

    loginModel.createLogin(userObj.id)

    const userJwt = jwt.sign({
        user_id: userObj.id
    }, config.get('jwtPrivateKey'));

    return userJwt;
    
}

module.exports = {
    login
}
