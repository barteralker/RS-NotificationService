const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const bcrypt = require('bcrypt');

if (DB_Conn === Constants.DB_CONNS_PG) { var userModel = require('../modelsPG/user'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var userModel = require('../modelsMongo/user'); };

function validateUser(body) {

    winston.info('Validating User Input');
    const schema = Joi.object({
        
        name: Joi.string().required().min(5).max(25),
        email: Joi.string().required().min(10).max(30),
        password: Joi.string().required().min(8).max(18),
        application_id: Joi.number().required().min(1)

    });

    return schema.validate(body);

};

async function createUser(user) {

    winston.info(`In Users Controller - Creating New User`);

    const validationResult = validateUser(user);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const userExists = await checkUserExistence(user);

    if (!userExists) {

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        result = await userModel.createUser(user);

        if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
        if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];
    
    }

    else return 'Error: User already registered'
    
}

async function checkUserExistence(user) {

    winston.info(`In Users Controller - Checking if User exists`);

    result = await userModel.getUser(user);
    
    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows.length > 0;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result.length > 0;

}

async function getUser(user) {

    winston.info(`In Users Controller - Getting User`);

    result = await userModel.getUser(user);
    
    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

module.exports = {
    createUser,
    getUser
}
