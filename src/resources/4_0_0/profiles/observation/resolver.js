/**
 * @name exports.getObservation
 * @static
 * @summary Observation resolver.
 */
module.exports.getObservation = async function (_, args, context = {}) {
	return await context.server.model.observations.getOne(args);
};

/**
 * @name exports.getObservationList
 * @static
 * @summary Observation list resolver.
 */

module.exports.getObservationList = async function (_, args, context = {}) {
	return await context.server.model.observations.getAll(args);
};

/**
 * @name exports.getObservationInstance
 * @static
 * @summary Observation instance resolver.
 */

module.exports.getObservationInstance = async function (_, args, context = {}) {
	return await context.server.model.observations.getOne(args);
};


/**
 * @name exports.createObservation
 * @static
 * @summary Create Observation resolver.
 */

module.exports.createObservation = async function (_, args, context = {}) {
	return await context.server.model.observations.createData(args.resource);
};


/**
 * @name exports.updateObservation
 * @static
 * @summary Update Observation resolver.
 */

module.exports.updateObservation = async function (_, args, context = {}) {
	return await context.server.model.observations.updateData(args.id, args.resource);
};

/**
 * @name exports.removeObservation
 * @static
 * @summary Remove Observation resolver.
 */

module.exports.removeObservation = async function (_, args, context = {}) {
	return await context.server.model.observations.removeData(args.id);
};

