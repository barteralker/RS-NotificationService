
const logger = require('../startup/loggingSetup');

function parseForTags(template, removeBraces) {

    logger.info(`Parsing Notification for Tags`);

    const regex = /{([^}]+)}/g;
    let tags = template.match(regex);
    if (tags && removeBraces) tags = tags.map(t => t.slice(1, -1))

    return tags === null ? [] : tags;

}

function parseAndFillTags(template, tags) {

    logger.info(`Filling out Notification template with Tags`);

    tagPlaceholders = parseForTags(template, false);

    if (tagPlaceholders.length > Object.keys(tags).length) throw new Error('Error : Not all Tag Values provided')

    let message = template;

    for (tag of Object.keys(tags)) {

        message = message.replace(`{${tag}}`, tags[tag]);
    
    }

    if (parseForTags(message, false).length > 0) throw new Error('Error : Not all Tag Values provided');

    return message;

}

module.exports = {
    parseForTags,
    parseAndFillTags
}