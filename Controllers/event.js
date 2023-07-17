
const winston = require('winston');
const DB_Conn = require('../config/default.json').DB_CONN;
const Constants = require('../config/constants');
const Joi = require('joi');

if (DB_Conn === Constants.DB_CONNS_PG) { var eventModel = require('../PostgresModels/event'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var eventModel = require('../MongoModels/event'); };

function validateEvent(body) {

    winston.info('Validating Event Input');
    const schema = Joi.object({
        
        application_id: Joi.number().integer().min(1).required(),
        name: Joi.string().required(),
        description: Joi.string()
    });

    return schema.validate(body);

};

async function getAllEvents() {

    winston.info(`In Events Controller - Getting All Events`);

    result = await eventModel.getAllEvents();

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function getEventById(id) {

    winston.info(`In Events Controller - Getting Event with ID ${id}`);

    result = await eventModel.getEventById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return (result.rows.length > 0 ? result.rows : `Event with ID ${id} does not exist`);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result !== null ? result : `Event with ID ${id} does not exist`;

}

async function createEvent(event) {

    winston.info(`In Events Controller - Creating New Event`);

    const validationResult = validateEvent(event);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await eventModel.createEvent(event);

    if (DB_Conn === Constants.DB_CONNS_PG) return `New Event with Id : ${result.rows[0]["id"]} created`;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return `New Event with Id : ${result["_id"]} created`;
    
}

async function updateEvent(id, event) {

    winston.info(`In Events Controller - Updating Event with ID ${id}`);

    if (typeof (await getEventById(id)) === "string") return `Event with id ${id} not found`;
    
    const validationResult = validateEvent(event);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await eventModel.updateEvent(id, event);

    return `Event with Id : ${id} updated`;

}

async function deleteEvent(id) {

    winston.info(`In Events Controller - Deleting Event with ID ${id}`);

    const deletedEvent = await getEventById(id);

    if (typeof deletedEvent === "string") return `Event with id ${id} not found`;

    result = await eventModel.deleteEvent(id);

    return `Event with Id : ${id} deleted
    ${JSON.stringify(deletedEvent)}`;

}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}