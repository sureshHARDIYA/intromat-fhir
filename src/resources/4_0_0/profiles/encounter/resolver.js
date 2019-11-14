/**
 * @name exports.getEncounter
 * @static
 * @summary Encounter resolver.
 */
module.exports.getEncounter = function getEncounter(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.encounters.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getEncounterList
 * @static
 * @summary Encounter list resolver.
 */
module.exports.getEncounterList = function getEncounterList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.encounters.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getEncounterInstance
 * @static
 * @summary Encounter instance resolver.
 */
module.exports.getEncounterInstance = function getEncounterInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.encounters.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createEncounter
 * @static
 * @summary Create Encounter resolver.
 */
module.exports.createEncounter = function createEncounter(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const {server: {model}, version, req, res} = context;
			const encounter = await model.encounters.createData(args.resource);
			resolve(encounter)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updateEncounter
 * @static
 * @summary Update Encounter resolver.
 */
module.exports.updateEncounter = function updateEncounter(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const encounter = await model.encounters.updateData(args.id, args.resource);
			resolve(encounter)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeEncounter
 * @static
 * @summary Remove Encounter resolver.
 */
module.exports.removeEncounter = function removeEncounter(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const encounter = await model.encounters.removeData(args.id);
			resolve(encounter)
		} catch (e) {
			reject(e);
		}
	});
};
