/**
 * @name exports.getPerson
 * @static
 * @summary Person resolver.
 */
module.exports.getPerson = function getPerson(root, args, context = {}, info) {

	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.people.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getPersonList
 * @static
 * @summary Person list resolver.
 */
module.exports.getPersonList = function getPersonList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.people.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getPersonInstance
 * @static
 * @summary Person instance resolver.
 */
module.exports.getPersonInstance = function getPersonInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.people.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createPerson
 * @static
 * @summary Create Person resolver.
 */
module.exports.createPerson = function createPerson(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const person = await model.people.createData(args.resource);
			resolve(person)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updatePerson
 * @static
 * @summary Update Person resolver.
 */
module.exports.updatePerson = function updatePerson(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const person = await model.people.updateData(args.id, args.resource);
			resolve(person)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removePerson
 * @static
 * @summary Remove Person resolver.
 */
module.exports.removePerson = function removePerson(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const person = await model.people.removeData(args.id);
			resolve(person)
		} catch (e) {
			reject(e);
		}
	});
};
