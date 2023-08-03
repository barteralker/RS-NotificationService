
const logger = require('../startup/loggingSetup');
const Event = require('../mongooseCollections/event').Event;

async function getAllEvents(tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Model - Getting All Events`);

    return (await Event.find());

}

async function getFilteredEvents(filters, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Model - Getting Filtered Events`);

    return (await Event.find(filters));

}

async function getEventById(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Model - Getting Event with ID ${id}`);

    return (await Event.findById(id));

}

async function createEvent(event, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Model - Creating New Event`);

    const mongoEvent = new Event({
        name : event.name,
        application_id : event.application_id,
        description: event.description
    });    

    return (await mongoEvent.save());

}

async function updateEvent(id, event, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Model - Updating Event with ID : ${id}`);

    return (await Event.findByIdAndUpdate(id, {
        name : event.name,
        application_id : event.application_id,
        description : event.description
    }));

}

async function deleteEvent(id, tid) {

    logger.setTraceId(tid);
    logger.info(`In Events Model - Deleting Event with ID : ${id}`);

    return (await Event.findByIdAndDelete(id));

}

module.exports = {
    getAllEvents,
    getFilteredEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}