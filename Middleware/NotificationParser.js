
const winston = require('winston');

function parseForTags(template, removeBraces) {

    winston.info(`Parsing Notification for Tags`);

    const regex = /{([^}]+)}/g;
    let tags = template.match(regex);
    if (removeBraces) tags = tags.map(t => t.slice(1, -1))

    return tags;

}

function parseAndFillTags(template, tags) {

    winston.info(`Filling out Notification template with Tags`);

    tagPlaceholders = parseForTags(template, false);

    if (tagPlaceholders.length !== Object.keys(tags).length) throw new Error('Not all Tag Values provided')

    let message = template;

    for (tag of Object.keys(tags)) {

        message = message.replace(`{${tag}}`, tags[tag]);
    
    }

    return message;

}

module.exports = {
    parseForTags,
    parseAndFillTags
}