/**
 * @name exports.getLocation
 * @static
 * @summary Location resolver.
 */
module.exports.getLocation = async function (_, args, context ={}) {
	return await context.server.model.locations.getOne(args);
};

/**
 * @name exports.getLocationList
 * @static
 * @summary Location list resolver.
 */
module.exports.getLocationList = async function (_, args, context={}) {
	return await context.server.model.locations.getAll(args);
};

/**
 * @name exports.getLocationInstance
 * @static
 * @summary Location instance resolver.
 */
module.exports.getLocationInstance = async function (_, args, context ={}) {
	return await context.server.model.locations.getOne(args);
};

/**
 * @name exports.createLocation
 * @static
 * @summary Create Location resolver.
 */
module.exports.createLocation = async function (_, args, context = {}) {
	return await context.server.model.locations.createData(args.resource)
};

/**
 * @name exports.updateLocation
 * @static
 * @summary Update Location resolver.
 */
module.exports.updateLocation = async function (_, args, context = {}) {
	return await context.server.model.locations.updateData(args.id, args.resource)
};

/**
 * @name exports.removeLocation
 * @static
 * @summary Remove Location resolver.
 */
module.exports.removeLocation = async function (_, args, context = {}) {
	return await context.server.model.locations.removeData(args.id)
};
