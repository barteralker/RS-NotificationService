
const winston = require('winston');
const eventController = require('../../Controllers/event');
const DB_Conn = require('../../config/default.json').DB_CONN;
const Constants = require('../../resources/constants');

if (DB_Conn === Constants.DB_CONNS_PG) { var eventModel = require('../../PostgresModels/event'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var eventModel = require('../../MongoModels/event'); };

test('Event Test 1 - Get All Events', async () => {

    winston.info = jest.fn();

    const ret = [{
        'application_id' : 1,
        'name' : 'Ev1',
        'description' : 'Event No. 1'
    }, {
        'application_id' : 1,
        'name' : 'Ev2',
        'description' : 'Event No. 2'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { eventModel.getAllEvents = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { eventModel.getAllEvents = jest.fn().mockReturnValue(ret); };

    let result = await eventController.getAllEvents();

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ev1'
            })
        ])
    );

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ev2'
            })
        ])
    );

});

test('Event Test 2 - Get Event by Id', async () => {

    winston.info = jest.fn();

    const ret = [{
        'application_id' : 1,
        'name' : 'Ev1',
        'description' : 'Event No. 1'
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { eventModel.getEventById = jest.fn().mockReturnValue({ 'rows' : ret}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { eventModel.getEventById = jest.fn().mockReturnValue(ret); };

    let result = await eventController.getEventById(1);

    expect(result).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: 'Ev1'
            })
        ])
    );

});

test('Event Test 3 - Get Event by Id (no results)', async () => {

    winston.info = jest.fn();

    if (DB_Conn === Constants.DB_CONNS_PG) { eventModel.getEventById = jest.fn().mockReturnValue({ 'rows' : []}); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { eventModel.getEventById = jest.fn().mockReturnValue(null); };

    let result = await eventController.getEventById(1);

    expect(result).toMatch('does not exist');

});

test('Event Test 4 - Fail Event Validation', async () => {

    winston.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = [{
        '_id' : 1
    }]

    if (DB_Conn === Constants.DB_CONNS_PG) { 
        eventModel.createEvent = jest.fn().mockReturnValue(retPg); 
        eventModel.updateEvent = jest.fn().mockReturnValue(retPg); 
    };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { 
        eventModel.createEvent = jest.fn().mockReturnValue(retMng); 
        eventModel.updateEvent = jest.fn().mockReturnValue(retMng); 
    };

    let resultCreate = await eventController.createEvent({});
    let resultUpdate = await eventController.createEvent({});

    expect(resultCreate).toMatch('Error');
    expect(resultUpdate).toMatch('Error');

});

test('Event Test 5 - Create Event', async () => {

    winston.info = jest.fn();

    const retPg = {
        'rows' : [{
            'id' : 1
        }]
    }

    const retMng = {
        '_id' : 1
    }

    if (DB_Conn === Constants.DB_CONNS_PG) { eventModel.createEvent = jest.fn().mockReturnValue(retPg); };
    if (DB_Conn === Constants.DB_CONNS_MONGO) { eventModel.createEvent = jest.fn().mockReturnValue(retMng); };

    let result = await eventController.createEvent({
        'application_id' : 1,
        'name' : 'Ev1'
    });

    expect(result).toMatch('1');

});

test('Event Test 6 - Update Event', async () => {

    winston.info = jest.fn();

    eventController.getEventById = jest.fn().mockReturnValue({});

    eventModel.updateEvent = jest.fn();

    let result = await eventController.updateEvent(1, {
        'application_id' : 1,
        'name' : 'Ev1'
    });

    expect(result).toMatch('1');

});

test('Event Test 7 - Update / Delete Event (event Id not found)', async () => {

    winston.info = jest.fn();

    eventController.getEventById = jest.fn().mockReturnValue('not found');

    let resultUpdate = await eventController.updateEvent(1, {
        'application_id' : 1,
        'name' : 'Ev1'
    });

    let resultDelete = await eventController.deleteEvent(1);

    expect(resultUpdate).toMatch('not found');
    expect(resultDelete).toMatch('not found');

});

test('Event Test 8 - Delete Event', async () => {

    winston.info = jest.fn();

    eventController.getEventById = jest.fn().mockReturnValue({});

    eventModel.deleteEvent = jest.fn();

    let result = await eventController.deleteEvent(1);

    expect(result).toMatch('1');

});