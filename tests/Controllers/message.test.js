
const logger = require('../../startup/loggingSetup');
const messageController = require('../../controllers/message');
const DB_Conn = require('../../config/dev.json').DB_CONN;
const Constants = require('../../resources/constants');
const express = require('express');

if (DB_Conn === Constants.DB_CONNS_PG) { var messageModel = require('../../modelsPG/message'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var messageModel = require('../../modelsMongo/message'); };

test('Message Test 1 - Get All Messages', async () => {

    logger.info = jest.fn();

    const ret = [{
        'notification_type' : 1,
        'message_text' : 'Msg1',
        'timestamp' : '2023-07-20 06:00:10.000'
    }, {
        'notification_type' : 1,
        'message_text' : 'Msg2',
        'timestamp' : '2023-07-20 06:00:10.000'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.getAllMessages = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.getAllMessages = jest.fn().mockReturnValue(ret); };

    let result = await messageController.getAllMessages(express.request);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                message_text: 'Msg1'
            })
        ])
    );

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                message_text: 'Msg2'
            })
        ])
    );

});

test('Message Test 2 - Get Message by Id', async () => {

    logger.info = jest.fn();

    const ret = [{
        'notification_type' : 1,
        'message_text' : 'Msg1',
        'timestamp' : '2023-07-20 06:00:10.000'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.getMessageById = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.getMessageById = jest.fn().mockReturnValue(ret); };

    let result = await messageController.getMessageById(1);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                message_text: 'Msg1'
            })
        ])
    );

});

test('Message Test 3 - Get Message by Id (no results)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.getMessageById = jest.fn().mockReturnValue({ 'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.getMessageById = jest.fn().mockReturnValue([]); };

    let result = await messageController.getMessageById(1);

    expect(result).toStrictEqual([]);

});

test('Message Test 4 - Fail Message Validation', async () => {

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
        messageModel.createMessage = jest.fn().mockReturnValue(retPg); 
        messageModel.updateMessage = jest.fn().mockReturnValue(retPg); 
    };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { 
        messageModel.createMessage = jest.fn().mockReturnValue(retMng); 
        messageModel.updateMessage = jest.fn().mockReturnValue(retMng); 
    };

    let resultCreate = await messageController.createMessage({});
    let resultUpdate = await messageController.createMessage({});

    expect(resultCreate).toMatch('Error');
    expect(resultUpdate).toMatch('Error');

});

test('Message Test 5 - Create Message', async () => {

    logger.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = {
        '_id' : 1
    }

    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.createMessage = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.createMessage = jest.fn().mockReturnValue(retMng); };

    let result = await messageController.createMessage({
        'notification_type' : 1,
        'message_text' : 'Msg1'
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

test('Message Test 6 - Update Message', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.getMessageById = jest.fn().mockReturnValue({'rows' : [1]}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.getMessageById = jest.fn().mockReturnValue([1]); };

    const retPg = {
        'rows' : [{
            'id' : 1,
            'notification_type' : 1,
            "message_text": `Message no. 1`,
            'timestamp' : '2023-07-31 08:02:21.000'
        }]
    }

    const retMng = {
        '_id' : 1,
        'notification_type' : 1,
        "message_text": `Message no. 1`,
        'timestamp' : '2023-07-31 08:02:21.000'
}
    
    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.updateMessage = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.updateMessage = jest.fn().mockReturnValue(retMng); };


    let result = await messageController.updateMessage(1, {
        'notification_type' : 1,
        'message_text' : 'Message no. 1'
    });

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                message_text: 'Message no. 1'
            })
        ])
    )

});

test('Message Test 7 - Update / Delete Message (message Id not found)', async () => {

    logger.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { messageModel.getMessageById = jest.fn().mockReturnValue({'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { messageModel.getMessageById = jest.fn().mockReturnValue([]); };

    let resultUpdate = await messageController.updateMessage(1, {
        'notification_type' : 1,
        'message_text' : 'Msg1'
    });

    let resultDelete = await messageController.deleteMessage(1);

    expect(resultUpdate).toMatch('not found');
    expect(resultDelete).toMatch('not found');

});

test('Message Test 8 - Delete Message', async () => {

    logger.info = jest.fn();

    messageController.getMessageById = jest.fn().mockReturnValue({});

    messageModel.deleteMessage = jest.fn();

    let result = await messageController.deleteMessage(1);

    expect(result).toMatch('1');

});