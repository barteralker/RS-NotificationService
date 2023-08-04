
let server = require('../../index');

const logger = require('../../startup/loggingSetup');
const notificationController = require('../../controllers/notification');
const config = require('config');
require(`../../config/${config.get('instance')}.json`).DB_CONN = config.get('DB_CONN');
const DB_Conn = require(`../../config/${config.get('instance')}.json`).DB_CONN;
const Constants = require('../../resources/constants');
const tagController = require('../../controllers/tag');
const messageController = require('../../controllers/message');
const express = require('express');

if (DB_Conn === Constants.DB_CONNS_PG) { var notificationModel = require('../../modelsPG/notification'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var notificationModel = require('../../modelsMongo/notification'); };

test('Notification Test 1 - Get All Notifications', async () => {

    logger.info = jest.fn();

    const ret = [{
        'event_id' : 1,
        'name' : 'Ntf1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {user},
        
        This is {template1}`
    }, {
        'event_id' : 1,
        'name' : 'Ntf2',
        'template_subject' : 'Notification No. 2',
        'template_body' : `Hello {user},
        
        This is {template2}`
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getAllNotifications = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getAllNotifications = jest.fn().mockReturnValue(ret); };

    let result = await notificationController.getAllNotifications(express.request);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ntf1'
            })
        ])
    );

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ntf2'
            })
        ])
    );

});

test('Notification Test 2 - Get Notification by Id', async () => {

    logger.info = jest.fn();

    const ret = [{
        'event_id' : 1,
        'name' : 'Ntf1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {user},
        
        This is {template1}`
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue(ret); };

    let result = await notificationController.getNotificationById(1);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ntf1'
            })
        ])
    );

});

test('Notification Test 3 - Get Notification by Id (no results)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({ 'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue([]); };

    let result = await notificationController.getNotificationById(1);

    expect(result).toStrictEqual([]);

});

test('Notification Test 4 - Fail Notification Validation', async () => {

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
        notificationModel.createNotification = jest.fn().mockReturnValue(retPg); 
        notificationModel.updateNotification = jest.fn().mockReturnValue(retPg); 
    };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { 
        notificationModel.createNotification = jest.fn().mockReturnValue(retMng); 
        notificationModel.updateNotification = jest.fn().mockReturnValue(retMng); 
    };

    let resultCreate = await notificationController.createNotification({});
    let resultUpdate = await notificationController.createNotification({});

    expect(resultCreate).toMatch('Error');
    expect(resultUpdate).toMatch('Error');

});

test('Notification Test 5 - Create Notification', async () => {

    logger.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = {
        '_id' : 1
    }

    tagController.createTags = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.createNotification = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.createNotification = jest.fn().mockReturnValue(retMng); };

    let result = await notificationController.createNotification({
        'event_id' : 1,
        'name' : 'Ntf No. 1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {user},
        
        This is {template1}`
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

test('Notification Test 6 - Update Notification', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({'rows' : [1]}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue([1]); };
    
    const retPg = {
        'rows' : [{
            'id' : 1,
            'event_id' : 1,
            'name' : 'Ntf No. 1',
            'template_subject' : 'Notification No. 1',
            'template_body' : `Hello {user},
            
            This is {template1}`
        }]
    }

    const retMng = {
        '_id' : 1,
        'event_id' : 1,
        'name' : 'Ntf No. 1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {user},
        
        This is {template1}`
    }

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.updateNotification = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.updateNotification = jest.fn().mockReturnValue(retMng); };

    tagController.createTags = jest.fn();

    let result = await notificationController.updateNotification(1, {
        'event_id' : 1,
        'name' : 'Ntf No. 1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {user},
        
        This is {template1}`

    });

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ntf No. 1'
            })
        ])
    )

});

test('Notification Test 7 - Update / Delete Notification (notification Id not found)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue([]); };

    let resultUpdate = await notificationController.updateNotification(1, {
        'event_id' : 1,
        'name' : 'Ntf1'
    });

    let resultDelete = await notificationController.deleteNotification(1);

    expect(resultUpdate).toMatch('not found');
    expect(resultDelete).toMatch('not found');

});

test('Notification Test 8 - Delete Notification', async () => {

    logger.info = jest.fn();

    notificationController.getNotificationById = jest.fn().mockReturnValue({});

    notificationModel.deleteNotification = jest.fn();

    let result = await notificationController.deleteNotification(1);

    expect(result).toMatch('1');

});

test('Notification Test 9 - Send Notification', async () => {

    logger.info = jest.fn();

    const ret = [{
        'event_id' : 1,
        'name' : 'Ntf1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {tag1},
        
        This is {tag2}`
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue(ret); };

    messageController.createMessage = jest.fn();

    let result = await notificationController.sendNewNotification({
        'notification_type' : 1,
        'tags' : {
            'tag1' : 'value1',
            'tag2' : 'value2'
        },
        'receiver_email' : 'test_123@abc.com'
    });

    expect(result).toEqual(
        expect.objectContaining({
            receiver_email: 'test_123@abc.com'
        })
    )


});

test('Notification Test 10 - Send Notification (Validation Failed)', async () => {

    logger.info = jest.fn();

    let result1 = await notificationController.sendNewNotification({
        'tags' : {
            'tag1' : 'value1',
            'tag2' : 'value2'
        },
        'receiver_email' : 'test_123@abc.com'
    });

    let result2 = await notificationController.sendNewNotification({
        'notification_type' : 1,
        'receiver_email' : 'test_123@abc.com'
    });

    let result3 = await notificationController.sendNewNotification({
        'notification_type' : 1,
        'tags' : {
            'tag1' : 'value1',
            'tag2' : 'value2'
        },
    });

    expect(result1).toMatch('Error');
    expect(result2).toMatch('Error');
    expect(result3).toMatch('Error');

});

test('Notification Test 11 - Send Notification (Notification Type does not exist)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({ 'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue([]); };

    messageController.createMessage = jest.fn();

    let result = await notificationController.sendNewNotification({
        'notification_type' : 1,
        'tags' : {
            'tag1' : 'value1',
            'tag2' : 'value2'
        },
        'receiver_email' : 'test_123@abc.com'
    });

    expect(result).toMatch('Error');

});

test('Notification Test 12 - Send Notification (Inconsistent Tags)', async () => {

    logger.info = jest.fn();

    const ret = [{
        'event_id' : 1,
        'name' : 'Ntf1',
        'template_subject' : 'Notification No. 1',
        'template_body' : `Hello {tag1},
        
        This is {tag2}`
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { notificationModel.getNotificationById = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { notificationModel.getNotificationById = jest.fn().mockReturnValue(ret); };

    messageController.createMessage = jest.fn();

    let result1 = await notificationController.sendNewNotification({
        'notification_type' : 1,
        'tags' : {
            'tag1' : 'value1',
        },
        'receiver_email' : 'test_123@abc.com'
    });

    expect(result1).toMatch('Error');

});

server.close();