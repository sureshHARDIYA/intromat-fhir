/**
 * @name exports.getObservation
 * @static
 * @summary Observation resolver.
 */
module.exports.getObservation = function getObservation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.observations.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getObservationList
 * @static
 * @summary Observation list resolver.
 */
module.exports.getObservationList = function getObservationList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.observations.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getObservationInstance
 * @static
 * @summary Observation instance resolver.
 */
module.exports.getObservationInstance = function getObservationInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.observations.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createObservation
 * @static
 * @summary Create Observation resolver.
 */
module.exports.createObservation = function createObservation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const observation = await model.observations.createData(args.resource);
			resolve(observation)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updateObservation
 * @static
 * @summary Update Observation resolver.
 */
module.exports.updateObservation = function updateObservation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const observation = await model.observations.updateData(args.id, args.resource);
			resolve(observation)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeObservation
 * @static
 * @summary Remove Observation resolver.
 */
module.exports.removeObservation = function removeObservation(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const observation = await model.observations.removeData(args.id);
			resolve(observation)
		} catch (e) {
			reject(e);
		}
	});
};
