const winston = require('winston');
const DB_Conn = require('../resources/config.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const bcrypt = require('bcrypt');

if (DB_Conn === Constants.DB_CONNS_PG) { var userModel = require('../PostgresModels/user'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var userModel = require('../MongoModels/user'); };

function validateUser(body) {

    winston.info('Validating User Input');
    const schema = Joi.object({
        
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(8),
        application_id: Joi.number().required().min(1)

    });

    return schema.validate(body);

};

async function createUser(user) {

    winston.info(`In Users Controller - Creating New User`);

    const validationResult = validateUser(user);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    result = await userModel.createUser(user);

    if (DB_Conn === Constants.DB_CONNS_PG) return `New User with Id : ${result.rows[0]["id"]} created`;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return `New User with Id : ${result["_id"]} created`;
    
}

module.exports = {
    createUser
}
