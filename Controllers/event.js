
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const utils = require('../Middleware/Utils');

if (DB_Conn === Constants.DB_CONNS_PG) { var eventModel = require('../PostgresModels/event'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var eventModel = require('../MongoModels/event'); };

function validateEvent(body) {

    winston.info('Validating Event Input');
    const schema = Joi.object({
        
        application_id: Joi.number().integer().min(1).required(),
        name: Joi.string().required().min(5).max(25),
        description: Joi.string().max(50)

    });

    return schema.validate(body);

};

async function getAllEvents(req) {

    winston.info(`In Events Controller - Getting All Events`);

    if (req.header('filter') && req.header('filter') === 'true') {

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await eventModel.getFilteredEvents(utils.postgresFilterCreator(req.body));
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await eventModel.getFilteredEvents(req.body);

    }

    else var result = await eventModel.getAllEvents();

    if (DB_Conn === Constants.DB_CONNS_PG) return utils.paginateResults(result.rows, req);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return utils.paginateResults(result, req);

}

async function getEventById(id) {

    winston.info(`In Events Controller - Getting Event with ID ${id}`);

    const result = await eventModel.getEventById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createEvent(event) {

    winston.info(`In Events Controller - Creating New Event`);

    const validationResult = validateEvent(event);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await eventModel.createEvent(event);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];
    
}

async function updateEvent(id, event) {

    winston.info(`In Events Controller - Updating Event with ID ${id}`);

    if ((await getEventById(id)).length === 0) return `Event with id ${id} not found`;
    
    const validationResult = validateEvent(event);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await eventModel.updateEvent(id, event);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];

}

async function deleteEvent(id) {

    winston.info(`In Events Controller - Deleting Event with ID ${id}`);

    const deletedEvent = await getEventById(id);

    if (deletedEvent.length === 0) return `Event with id ${id} not found`;

    result = await eventModel.deleteEvent(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return deletedEvent;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [deletedEvent];

}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}