/**
 * @name exports.getOrganization
 * @static
 * @summary Organization resolver.
 */
module.exports.getOrganization = function getOrganization(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: {model, app}, version, req, res } =  context;
			resolve(await model.organizations.getOne(args));
		} catch(e){
			reject(e);
		}
	});
};

/**
 * @name exports.getOrganizationList
 * @static
 * @summary Organization list resolver.
 */
module.exports.getOrganizationList = function getOrganizationList(
	root,
	args,
	context = {},
	info,
) {
	let { server, version, req, res } = context;
	return {};
};

/**
 * @name exports.getOrganizationInstance
 * @static
 * @summary Organization instance resolver.
 */
module.exports.getOrganizationInstance = function getOrganizationInstance(
	root,
	args,
	context = {},
	info,
) {
	let { server, version, req, res } = context;
	return {};
};

/**
 * @name exports.createOrganization
 * @static
 * @summary Create Organization resolver.
 */
module.exports.createOrganization = function createOrganization(
	root,
	args,
	context = {},
	info,
) {
	 return new Promise(async (resolve, reject) => {
		 try {
 			const { server: { model }, version, req, res } = context;
 			const organization = await model.organizations.createData(args.resource);
 			resolve(organization)
 		} catch (e) {
 			reject(e);
 		}
	});
};

/**
 * @name exports.updateOrganization
 * @static
 * @summary Update Organization resolver.
 */
module.exports.updateOrganization = function updateOrganization(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const organization = await model.organizations.updateData(args.id, args.resource);
			resolve(organization)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeOrganization
 * @static
 * @summary Remove Organization resolver.
 */
module.exports.removeOrganization = function removeOrganization(
	root,
	args,
	context = {},
	info,
) {
	let { server, version, req, res } = context;
	return {};
};
