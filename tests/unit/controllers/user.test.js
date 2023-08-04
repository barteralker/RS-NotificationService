
let server = require('../../../index');

const logger = require('../../../startup/loggingSetup');
const userController = require('../../../controllers/user');
const config = require('config');
const DB_Conn = require(`../../../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../../../resources/constants');

if (DB_Conn === Constants.DB_CONNS_PG) { var userModel = require('../../../modelsPG/user'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var userModel = require('../../../modelsMongo/user'); };

test('User Test 1 - Create User', async () => {

    logger.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = {
        '_id' : 1
    }

    if (DB_Conn === Constants.DB_CONNS_PG) { userModel.getUser = jest.fn().mockReturnValue({ 'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { userModel.getUser = jest.fn().mockReturnValue([]); };

    if (DB_Conn === Constants.DB_CONNS_PG) { userModel.createUser = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { userModel.createUser = jest.fn().mockReturnValue(retMng); };

    let result = await userController.createUser({
        'application_id' : 1,
        'name' : 'User1',
        'email' : 'user1@test.com',
        'password' : 'password.user1'
    });

    // expect(result).toMatch('1');
    expect(result.length).toBe(1);

    if (DB_Conn === Constants.DB_CONNS_PG) {
        expect.arrayContaining([
            expect.objectContaining({
                id: '1'
            })
        ])
    }

    if (DB_Conn === Constants.DB_CONNS_MONGO) {
        expect.arrayContaining([
            expect.objectContaining({
                _id: '1'
            })
        ])
    }


});

test('User Test 2 - Fail User Validation', async () => {

    logger.info = jest.fn();

    let result1 = await userController.createUser({
        'name' : 'User1',
        'email' : 'user1@test.com',
        'password' : 'password.user1'
    });

    expect(result1).toMatch('Error');

    let result2 = await userController.createUser({
        'application_id' : 1,
        'email' : 'user1@test.com',
        'password' : 'password.user1'
    });

    expect(result2).toMatch('Error');

    let result3 = await userController.createUser({
        'application_id' : 1,
        'name' : 'User1',
        'password' : 'password.user1'
    });

    expect(result3).toMatch('Error');

    let result4 = await userController.createUser({
        'application_id' : 1,
        'name' : 'User1',
        'email' : 'user1@test.com',
    });

    expect(result4).toMatch('Error');

});

test('User Test 3 - Create User (User already exists)', async () => {

    logger.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = [{
        '_id' : 1
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { userModel.getUser = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { userModel.getUser = jest.fn().mockReturnValue(retMng); };

    if (DB_Conn === Constants.DB_CONNS_PG) { userModel.createUser = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { userModel.createUser = jest.fn().mockReturnValue(retMng); };

    let result = await userController.createUser({
        'application_id' : 1,
        'name' : 'User1',
        'email' : 'user1@test.com',
        'password' : 'password.user1'
    });

    expect(result).toMatch('Error');

});

test('User Test 4 - Get User', async () => {

    logger.info = jest.fn();

    const ret = [{
        'id' : 1, 
        'application_id' : 1,
        'name' : 'User1',
        'email' : 'user1@test.com',
        'password' : 'password.user1'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { userModel.getUser = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { userModel.getUser = jest.fn().mockReturnValue(ret); };

    let result = await userController.getUser({
        'application_id' : '1',
        'email' : 'user1@test.com',
        'password' : 'password.user1'
    });

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'User1'
            })
        ])
    );


});

server.close();