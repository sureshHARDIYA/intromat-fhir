/**
 * @name exports.getPatient
 * @static
 * @summary Patient resolver.
 */
module.exports.getPatient = function getPatient(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.patients.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getPatientList
 * @static
 * @summary Patient list resolver.
 */
module.exports.getPatientList = function getPatientList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve({ entry: await model.patients.getAll(args) });
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getPatientInstance
 * @static
 * @summary Patient instance resolver.
 */
module.exports.getPatientInstance = function getPatientInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			console.log('root:', root)
			console.log('args:', args)

			resolve(await model.patients.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createPatient
 * @static
 * @summary Create Patient resolver.
 */
module.exports.createPatient = function createPatient(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const patient = await model.patients.createData(args.resource);
			resolve(patient)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updatePatient
 * @static
 * @summary Update Patient resolver.
 */
module.exports.updatePatient = function updatePatient(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const patient = await model.patients.updateData(args.id, args.resource);
			resolve(patient)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removePatient
 * @static
 * @summary Remove Patient resolver.
 */
module.exports.removePatient = function removePatient(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const patient = await model.patients.removeData(args.id);
			resolve(patient)
		} catch (e) {
			reject(e);
		}
	});
};
