
const winston = require('winston');

function parseForTags(template) {

    winston.info(`Parsing New Notification for Tags`);

    const regex = /{([^}]+)}/g;
    let tags = template.match(regex);
    tags = tags.map(t => t.slice(1, -1))

    return tags;

}

module.exports = {
    parseForTags
}