
const logger = require('../startup/loggingSetup');
const Tag = require('../mongooseCollections/tag').Tag;

async function createTag(tag, tid) {

    logger.setTraceId(tid);
    logger.info(`In Tags Model - Creating New Tag`);

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