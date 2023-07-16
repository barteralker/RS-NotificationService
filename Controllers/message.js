
const debug = require('debug')('app:appDebugger');
const DB_Conn = require('../resources/config.json').DB_CONN;
const Constants = require('../resources/constants');
const Joi = require('joi');

if (DB_Conn === Constants.DB_CONNS_PG) { var MesageModel = require('../PostgresModels/message'); };
if (DB_Conn === Constants.DB_CONNS_MONGO) { var MesageModel = require('../MongoModels/message'); };

function validateMesage(body) {

    debug('Validating Mesage Input');
    const schema = Joi.object({
        
        notification_type: Joi.number().integer().min(1).required(),
        message_text: Joi.string().required(),
        timestamp: Joi.date
    });

    return schema.validate(body);

};

async function getAllMesages() {

    debug(`In Mesages Controller - Getting All Mesages`);

    result = await MesageModel.getAllMesages();

    if (DB_Conn === Constants.DB_CONNS_PG) return result.rows;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result;

}

async function getMesageById(id) {

    debug(`In Mesages Controller - Getting Mesage with ID ${id}`);

    result = await MesageModel.getMesageById(id);

    if (DB_Conn === Constants.DB_CONNS_PG) return (result.rows.length > 0 ? result.rows : `Mesage with ID ${id} does not exist`);
    if (DB_Conn === Constants.DB_CONNS_MONGO) return result !== null ? result : `Mesage with ID ${id} does not exist`;

}

async function createMesage(Mesage) {

    debug(`In Mesages Controller - Creating New Mesage`);

    const validationResult = validateMesage(Mesage);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    result = await MesageModel.createMesage(Mesage);

    if (DB_Conn === Constants.DB_CONNS_PG) return `New Mesage with Id : ${result.rows[0]["id"]} created`;
    if (DB_Conn === Constants.DB_CONNS_MONGO) return `New Mesage with Id : ${result["_id"]} created`;
    
}

async function updateMesage(id, Mesage) {

    debug(`In Mesages Controller - Updating Mesage with ID ${id}`);

    if (typeof (await getMesageById(id)) === "string") return `Mesage with id ${id} not found`;
    
    const validationResult = validateMesage(Mesage);
    if (validationResult.error) return `Error : ${validationResult.error.details[0].message}`;

    await MesageModel.updateMesage(id, Mesage);

    return `Mesage with Id : ${id} updated`;

}

async function deleteMesage(id) {

    debug(`In Mesages Controller - Deleting Mesage with ID ${id}`);

    const deletedMesage = await getMesageById(id);

    if (typeof deletedMesage === "string") return `Mesage with id ${id} not found`;

    result = await MesageModel.deleteMesage(id);

    return `Mesage with Id : ${id} deleted
    ${JSON.stringify(deletedMesage)}`;

}

module.exports = {
    getAllMesages,
    getMesageById,
    createMesage,
    updateMesage,
    deleteMesage
}