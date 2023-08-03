
const logger = require('../startup/loggingSetup');
const DB_Conn = require('../config/dev.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');
const utils = require('../utils/FilterUtils');

if (DB_Conn === Constants.DB_CONNS_PG) { var eventModel = require('../modelsPG/event'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var eventModel = require('../modelsMongo/event'); };

function validateEvent(body, tid) {

    logger.setTraceId(tid);
    logger.info('Validating Event Input');
    const schema = Joi.object({
        
        application_id: Joi.number().integer().min(1).required(),
        name: Joi.string().required().min(5).max(25),
        description: Joi.string().max(50)

    });

    return schema.validate(body);

};

async function getAllEvents(req, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Controller - Getting All Events`);

    if (req.header('filter') && req.header('filter') === 'true') {

        if (DB_Conn === Constants.DB_CONNS_PG) var result = await eventModel.getFilteredEvents(utils.postgresFilterCreator(req.body), tid);
        if (DB_Conn === Constants.DB_CONNS_MONGO) var result = await eventModel.getFilteredEvents(req.body, tid);

    }

    else var result = await eventModel.getAllEvents(tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return utils.paginateResults(result.rows, req);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return utils.paginateResults(result, req);

}

async function getEventById(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Controller - Getting Event with ID ${id}`);

    const result = await eventModel.getEventById(id, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function createEvent(event, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Controller - Creating New Event`);

    const validationResult = validateEvent(event, tid);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await eventModel.createEvent(event, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];
    
}

async function updateEvent(id, event, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Controller - Updating Event with ID ${id}`);

    if ((await getEventById(id, tid)).length === 0) return `Event with id ${id} not found`;
    
    const validationResult = validateEvent(event, tid);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    const result = await eventModel.updateEvent(id, event, tid);

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return [result];

}

async function deleteEvent(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Controller - Deleting Event with ID ${id}`);

    const deletedEvent = await getEventById(id, tid);

    if (deletedEvent.length === 0) return `Event with id ${id} not found`;

    result = await eventModel.deleteEvent(id, tid);

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