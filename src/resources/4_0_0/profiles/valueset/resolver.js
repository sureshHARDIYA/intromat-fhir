/**
 * @name exports.getValueSet
 * @static
 * @summary ValueSet resolver.
 */
module.exports.getValueSet = function getValueSet(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.valuesets.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getValueSetList
 * @static
 * @summary ValueSet list resolver.
 */
module.exports.getValueSetList = function getValueSetList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.valuesets.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getValueSetInstance
 * @static
 * @summary ValueSet instance resolver.
 */
module.exports.getValueSetInstance = function getValueSetInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.valuesets.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createValueSet
 * @static
 * @summary Create ValueSet resolver.
 */
module.exports.createValueSet = function createValueSet(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const valueset = await model.valuesets.createData(args.resource);
			resolve(valueset)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updateValueSet
 * @static
 * @summary Update ValueSet resolver.
 */
module.exports.updateValueSet = function updateValueSet(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const valueset = await model.valuesets.updateData(args.id, args.resource);
			resolve(valueset)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeValueSet
 * @static
 * @summary Remove ValueSet resolver.
 */
module.exports.removeValueSet = function removeValueSet(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const valueset = await model.valuesets.removeData(args.id);
			resolve(valueset)
		} catch (e) {
			reject(e);
		}
	});
};
