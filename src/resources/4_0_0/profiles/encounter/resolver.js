/**
 * @name exports.getEncounter
 * @static
 * @summary Encounter resolver.
 */

module.exports.getEncounter = async function (_, args, context ={}) {
	return await context.server.model.encounters.getOne(args);
};

/**
 * @name exports.getEncounterList
 * @static
 * @summary Encounter list resolver.
 */
module.exports.getEncounterList = async function (_, args, context={}) {
	return await context.server.model.encounters.getAll(args);
};

/**
 * @name exports.getEncounterInstance
 * @static
 * @summary Encounter instance resolver.
 */
module.exports.getEncounterInstance = async function (_, args, context ={}) {
	return await context.server.model.encounters.getOne(args);
};

/**
 * @name exports.createEncounter
 * @static
 * @summary Create Encounter resolver.
 */
module.exports.createEncounter = async function (_, args, context = {}) {
	return await context.server.model.encounters.createData(args.resource)
};

/**
 * @name exports.updateEncounter
 * @static
 * @summary Update Encounter resolver.
 */
module.exports.updateEncounter = async function (_, args, context = {}) {
	return await context.server.model.encounters.updateData(args.id, args.resource)
};

/**
 * @name exports.removeEncounter
 * @static
 * @summary Remove Encounter resolver.
 */
module.exports.removeEncounter = async function (_, args, context = {}) {
	return await context.server.model.encounters.removeData(args.id)
};
