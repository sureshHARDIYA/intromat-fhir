/**
 * @name exports.getLocation
 * @static
 * @summary Location resolver.
 */
module.exports.getLocation = function getLocation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.locations.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getLocationList
 * @static
 * @summary Location list resolver.
 */
module.exports.getLocationList = function getLocationList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.locations.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getLocationInstance
 * @static
 * @summary Location instance resolver.
 */
module.exports.getLocationInstance = function getLocationInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.locations.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createLocation
 * @static
 * @summary Create Location resolver.
 */
module.exports.createLocation = function createLocation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const {server: {model}, version, req, res} = context;
			const location = await model.locations.createData(args.resource);
			resolve(location)
		} catch (e) {
			reject(e);
		}
	});
};
/**
 * @name exports.updateLocation
 * @static
 * @summary Update Location resolver.
 */
module.exports.updateLocation = function updateLocation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const location = await model.locations.updateData(args.id, args.resource);
			resolve(location)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeLocation
 * @static
 * @summary Remove Location resolver.
 */
module.exports.removeLocation = function removeLocation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const location = await model.locations.removeData(args.id);
			resolve(location)
		} catch (e) {
			reject(e);
		}
	});
};
