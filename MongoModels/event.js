
const debug = require('debug')('app:appDebugger');
const pg = require('../DBConns/pgConnection');
const Event = require('../MongooseCollections/event').Event;
const queries = require('../PostgresQueries/event');

async function getAllEvents() {

    debug(`In Events Model - Getting All Events`);

    return (await Event.find());

}

async function getEventById(id) {

    debug(`In Events Model - Getting Event with ID ${id}`);

    return (await Event.findById(id));

}

async function createEvent(event) {

    debug(`In Events Model - Creating New Event`);

    const mongoEvent = new Event({
        name : event.name,
        application_id : event.application_id,
        description: event.description
    });    

    return (await mongoEvent.save());

}

async function updateEvent(id, event) {

    debug(`In Events Model - Updating Event with ID : ${id}`);

    return (await Event.findByIdAndUpdate(id, {
        name : event.name,
        application_id : event.application_id,
        description : event.description
    }));

}

async function deleteEvent(id) {

    debug(`In Events Model - Deleting Event with ID : ${id}`);

    return (await Event.findByIdAndDelete(id));

}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}