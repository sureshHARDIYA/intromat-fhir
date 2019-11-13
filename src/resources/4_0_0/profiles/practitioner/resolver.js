/**
 * @name exports.getPractitioner
 * @static
 * @summary Practitioner resolver.
 */
module.exports.getPractitioner = function getPractitioner(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.practitioners.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getPractitionerList
 * @static
 * @summary Practitioner list resolver.
 */
module.exports.getPractitionerList = function getPractitionerList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.practitioners.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getPractitionerInstance
 * @static
 * @summary Practitioner instance resolver.
 */
module.exports.getPractitionerInstance = function getPractitionerInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.practitioners.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createPractitioner
 * @static
 * @summary Create Practitioner resolver.
 */
module.exports.createPractitioner = function createPractitioner(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const practitioner = await model.practitioners.createData(args.resource);
			resolve(practitioner)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updatePractitioner
 * @static
 * @summary Update Practitioner resolver.
 */
module.exports.updatePractitioner = function updatePractitioner(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const practitioner = await model.practitioners.updateData(args.id, args.resource);
			resolve(practitioner)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removePractitioner
 * @static
 * @summary Remove Practitioner resolver.
 */
module.exports.removePractitioner = function removePractitioner(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const practitioner = await model.practitioners.removeData(args.id);
			resolve(practitioner)
		} catch (e) {
			reject(e);
		}
	});
};
