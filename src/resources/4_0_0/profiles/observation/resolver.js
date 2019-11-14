/**
 * @name exports.getObservation
 * @static
 * @summary Observation resolver.
 */
module.exports.getObservation = async function getObservation(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model, app }, version, req, res } = context;
			return (await model.observations.getOne(args));
		} catch (e) {
			console.log('Observation error: ', e);
		}
};

/**
 * @name exports.getObservationList
 * @static
 * @summary Observation list resolver.
 */
module.exports.getObservationList = async function getObservationList(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			return (await model.observations.getAll(args));
		} catch (e) {
			console.log('Observation error: ', e);
		}
};

/**
 * @name exports.getObservationInstance
 * @static
 * @summary Observation instance resolver.
 */
module.exports.getObservationInstance = async function getObservationInstance(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			return (await model.observations.getOne(args));
		} catch (e) {
			console.log('Observation error: ', e);
		}
};

/**
 * @name exports.createObservation
 * @static
 * @summary Create Observation resolver.
 */
module.exports.createObservation = async function createObservation(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			const observation = await model.observations.createData(args.resource);
			return (observation)
		} catch (e) {
			console.log('Observation error: ', e);
		}
};

/**
 * @name exports.updateObservation
 * @static
 * @summary Update Observation resolver.
 */
module.exports.updateObservation = async function updateObservation(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			const observation = await model.observations.updateData(args.id, args.resource);
			return (observation)
		} catch(e) {
			console.log('Observation error: ', e);
		}
};

/**
 * @name exports.removeObservation
 * @static
 * @summary Remove Observation resolver.
 */
module.exports.removeObservation = async function removeObservation(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			const observation = await model.observations.removeData(args.id);
			return (observation)
		} catch (e) {
			console.log('Observation error: ', e);
		}
};
