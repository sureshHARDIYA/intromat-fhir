/**
 * @name exports.getPractitioner
 * @static
 * @summary Practitioner resolver.
 */

module.exports.getPractitioner = async function (_, args, context = {}) {
	return await context.server.model.practitioners.getOne(args);
};


/**
 * @name exports.getPractitionerList
 * @static
 * @summary Practitioner list resolver.
 */

module.exports.getPractitionerList = async function (_, args, context = {}) {
	return await context.server.model.practitioners.getAll(args);
};

/**
 * @name exports.getPractitionerInstance
 * @static
 * @summary Practitioner instance resolver.
 */

module.exports.getPractitionerInstance = async function (_, args, context = {}) {
	return await context.server.model.practitioners.getOne(args);
};


/**
 * @name exports.createPractitioner
 * @static
 * @summary Create Practitioner resolver.
 */
module.exports.createPractitioner = async function (_, args, context = {}) {
	return await context.server.model.practitioners.createData(args.resource);
};


/**
 * @name exports.updatePractitioner
 * @static
 * @summary Update Practitioner resolver.
 */

module.exports.updatePractitioner = async function (_, args, context = {}) {
	return await context.server.model.practitioners.updateData(args.id, args.resource);
};

/**
 * @name exports.removePractitioner
 * @static
 * @summary Remove Practitioner resolver.
 */
module.exports.removePractitioner = async function (_, args, context = {}) {
	return await context.server.model.practitioners.removeData(args.id);
};
