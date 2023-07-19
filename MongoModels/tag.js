
const winston = require('winston');
const Tag = require('../MongooseCollections/tag').Tag;

async function createTag(tag) {

    winston.info(`In Tags Model - Creating New Tag`);

    if(await Tag.find({"tag_name": tag}).length < 1) {
    
        const mongoTag = new Tag({
            tag_name : tag
        });  

        await mongoTag.save()
    }  

    return;

}

module.exports = {
    createTag
}