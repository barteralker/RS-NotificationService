
const logger = require('../startup/loggingSetup');
const loginController = require('../../controllers/login');
const DB_Conn = require('../../config/dev.json').DB_CONN;
const Constants = require('../../resources/constants');
const bcrypt = require('bcrypt');
const config = require('config');
const userController = require('../../controllers/user');

if (DB_Conn === Constants.DB_CONNS_PG) { var loginModel = require('../../modelsPG/login'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var loginModel = require('../../modelsMongo/login'); };

test('Login Test 1 - Login (Normal Case)', async () => {

    logger.info = jest.fn();

    const retPg = [{
        'id' : 1,
        'password' : 'password.login1'
    }]

    const retMng = [{
        '_id' : 1,
        'password' : 'password.login1'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { userController.getUser = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { userController.getUser = jest.fn().mockReturnValue(retMng); };

    bcrypt.compare = jest.fn().mockReturnValue(true);

    loginModel.createLogin = jest.fn();

    let result = await loginController.login({
        'application_id' : 1,
        'email' : 'login1@test.com',
        'password' : 'password.login1'
    });

    expect(result).toMatch('1');

});

test('Login Test 2 - Login (Failing Validation)', async () => {

    logger.info = jest.fn();

    let result = await loginController.login({
        'email' : 'login1@test.com',
        'password' : 'password.login1'
    });

    expect(result).toMatch('Invalid');

    result = await loginController.login({
        'application_id' : 1,
        'password' : 'password.login1'
    });

    expect(result).toMatch('Invalid');

    result = await loginController.login({
        'application_id' : 1,
        'email' : 'login1@test.com',
    });

    expect(result).toMatch('Invalid');

});

test('Login Test 3 - Login (User does not exist)', async () => {

    logger.info = jest.fn();

    userController.getUser = jest.fn().mockReturnValue([]);

    bcrypt.compare = jest.fn().mockReturnValue(true);

    loginModel.createLogin = jest.fn();

    let result = await loginController.login({
        'application_id' : 1,
        'email' : 'login1@test.com',
        'password' : 'password.login1'
    });

    expect(result).toMatch('Invalid');

});

test('Login Test 4 - Login (Password Mismatch)', async () => {

    logger.info = jest.fn();

    bcrypt.compare = jest.fn().mockReturnValue(false);

    let result = await loginController.login({
        'application_id' : 1,
        'email' : 'login1@test.com',
        'password' : 'password.login1'
    });

    expect(result).toMatch('Invalid');

});
