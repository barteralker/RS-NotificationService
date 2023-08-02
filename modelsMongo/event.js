
const winston = require('winston');
const Event = require('../mongooseCollections/event').Event;

async function getAllEvents() {

    winston.info(`In Events Model - Getting All Events`);

    return (await Event.find());

}

async function getFilteredEvents(filters) {

    winston.info(`In Events Model - Getting Filtered Events`);

    return (await Event.find(filters));

}

async function getEventById(id) {

    winston.info(`In Events Model - Getting Event with ID ${id}`);

    return (await Event.findById(id));

}

async function createEvent(event) {

    winston.info(`In Events Model - Creating New Event`);

    const mongoEvent = new Event({
        name : event.name,
        application_id : event.application_id,
        description: event.description
    });    

    return (await mongoEvent.save());

}

async function updateEvent(id, event) {

    winston.info(`In Events Model - Updating Event with ID : ${id}`);

    return (await Event.findByIdAndUpdate(id, {
        name : event.name,
        application_id : event.application_id,
        description : event.description
    }));

}

async function deleteEvent(id) {

    winston.info(`In Events Model - Deleting Event with ID : ${id}`);

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