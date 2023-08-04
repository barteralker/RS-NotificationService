
let server = require('../../index');

const logger = require('../../startup/loggingSetup');
const applicationController = require('../../controllers/application');
const config = require('config');
require(`../../config/${config.get('instance')}.json`).DB_CONN = config.get('DB_CONN');
const DB_Conn = require(`../../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../../resources/constants');
const express = require('express');

if (DB_Conn === Constants.DB_CONNS_PG) { var applicationModel = require('../../modelsPG/application'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var applicationModel = require('../../modelsMongo/application'); };

test('Application Test 1 - Get All Applications', async () => {

    logger.info = jest.fn();

    const ret = [{
        'name' : 'App1',
        'description' : 'Application No. 1'
    }, {
        'name' : 'App2',
        'description' : 'Application No. 2'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getAllApplications = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getAllApplications = jest.fn().mockReturnValue(ret); };

    let result = await applicationController.getAllApplications(express.request);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'App1'
            })
        ])
    );

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'App2'
            })
        ])
    );

});

test('Application Test 2 - Get Application by Id', async () => {

    logger.info = jest.fn();

    const ret = [{
        'name' : 'App1',
        'description' : 'Application No. 1'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getApplicationById = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getApplicationById = jest.fn().mockReturnValue(ret); };

    let result = await applicationController.getApplicationById(1);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'App1'
            })
        ])
    );

});

test('Application Test 3 - Get Application by Id (no results)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getApplicationById = jest.fn().mockReturnValue({ 'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getApplicationById = jest.fn().mockReturnValue([]); };

    let result = await applicationController.getApplicationById(1);

    expect(result).toStrictEqual([]);

});

test('Application Test 4 - Fail Application Validation', async () => {

    logger.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = [{
        '_id' : 1
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { 
        applicationModel.createApplication = jest.fn().mockReturnValue(retPg); 
        applicationModel.updateApplication = jest.fn().mockReturnValue(retPg); 
    };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { 
        applicationModel.createApplication = jest.fn().mockReturnValue(retMng); 
        applicationModel.updateApplication = jest.fn().mockReturnValue(retMng); 
    };

    let resultCreate = await applicationController.createApplication({});
    let resultUpdate = await applicationController.createApplication({});

    expect(resultCreate).toMatch('Error');
    expect(resultUpdate).toMatch('Error');

});

test('Application Test 5 - Create Application', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getFilteredApplications = jest.fn().mockReturnValue({'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getFilteredApplications = jest.fn().mockReturnValue([]); };

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = [{
        '_id' : 1
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.createApplication = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.createApplication = jest.fn().mockReturnValue(retMng); };

    let result = await applicationController.createApplication({
        'name' : 'App1'
    });

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

test('Application Test 6 - Update Application', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getApplicationById = jest.fn().mockReturnValue({'rows' : [10]}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getApplicationById = jest.fn().mockReturnValue([10]); };

    const retPg = {
        'rows' : [{
            'id' : 1,
            'name' : 'App1',
            'description' : 'desc1'
        }]
    }

    const retMng = {
        '_id' : 1,
        'name' : 'App1',
        'description' : 'desc1'
    }

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.updateApplication = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.updateApplication = jest.fn().mockReturnValue(retMng); };


    let result = await applicationController.updateApplication(1, {
        'name' : 'App1'
    });

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'App1'
            })
        ])
    );


});

test('Application Test 7 - Update / Delete Application (application Id not found)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getApplicationById = jest.fn().mockReturnValue({'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getApplicationById = jest.fn().mockReturnValue([]); };

    let resultUpdate = await applicationController.updateApplication(1, {
        'name' : 'App1'
    });

    let resultDelete = await applicationController.deleteApplication(1);

    expect(resultUpdate).toMatch('not found');
    expect(resultDelete).toMatch('not found');

});

test('Application Test 8 - Delete Application', async () => {

    logger.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1,
            'name' : 'App1',
            'description' : 'desc1'
        }]
    }

    const retMng = {
        '_id' : 1,
        'name' : 'App1',
        'description' : 'desc1'
    }

    if (DB_Conn === Constants.DB_CONNS_PG) { applicationModel.getApplicationById = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { applicationModel.getApplicationById = jest.fn().mockReturnValue(retMng); };

    applicationModel.deleteApplication = jest.fn();

    let result = await applicationController.deleteApplication(1);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'App1'
            })
        ])
    );


});

server.close();