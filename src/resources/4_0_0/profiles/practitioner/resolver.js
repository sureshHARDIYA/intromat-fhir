/**
 * @name exports.getPractitioner
 * @static
 * @summary Practitioner resolver.
 */
module.exports.getPractitioner = async function getPractitioner(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model, app }, version, req, res } = context;
			return (await model.practitioners.getOne(args));
		} catch (e) {
			console.log("Practitioner error", e);
		}
};

/**
 * @name exports.getPractitionerList
 * @static
 * @summary Practitioner list resolver.
 */
module.exports.getPractitionerList = async function getPractitionerList(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			return (await model.practitioners.getAll(args));
		} catch (e) {
			console.log("Practitioner error", e);
		}
};

/**
 * @name exports.getPractitionerInstance
 * @static
 * @summary Practitioner instance resolver.
 */
module.exports.getPractitionerInstance = async function getPractitionerInstance(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			return (await model.practitioners.getOne(args));
		} catch (e) {
			console.log("Practitioner error", e);
		}
};

/**
 * @name exports.createPractitioner
 * @static
 * @summary Create Practitioner resolver.
 */
module.exports.createPractitioner = async function createPractitioner(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			const practitioner = await model.practitioners.createData(args.resource);
			return (practitioner)
		} catch (e) {
			console.log("Practitioner error", e);
		}
};

/**
 * @name exports.updatePractitioner
 * @static
 * @summary Update Practitioner resolver.
 */
module.exports.updatePractitioner = async function updatePractitioner(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			const practitioner = await model.practitioners.updateData(args.id, args.resource);
			return (practitioner)
		} catch(e) {
			console.log("Practitioner error", e);
		}
};

/**
 * @name exports.removePractitioner
 * @static
 * @summary Remove Practitioner resolver.
 */
module.exports.removePractitioner = async function removePractitioner(
	root,
	args,
	context = {},
	info,
) {
		try {
			const { server: { model }, version, req, res } = context;
			const practitioner = await model.practitioners.removeData(args.id);
			return (practitioner)
		} catch (e) {
			console.log("Practitioner error", e);
		}
};
