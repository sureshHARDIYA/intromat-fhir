/**
 * @name exports.getAuditEvent
 * @static
 * @summary AuditEvent resolver.
 */
module.exports.getAuditEvent = function getAuditEvent(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model, app }, version, req, res } = context;
			resolve(await model.auditEvents.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getAuditEventList
 * @static
 * @summary AuditEvent list resolver.
 */
module.exports.getAuditEventList = function getAuditEventList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.auditEvents.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getAuditEventInstance
 * @static
 * @summary AuditEvent instance resolver.
 */
module.exports.getAuditEventInstance = function getAuditEventInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.auditEvents.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createAuditEvent
 * @static
 * @summary Create AuditEvent resolver.
 */
module.exports.createAuditEvent = function createAuditEvent(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const auditEvent = await model.auditEvents.createData(args.resource);
			resolve(auditEvent)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updateAuditEvent
 * @static
 * @summary Update AuditEvent resolver.
 */
module.exports.updateAuditEvent = function updateAuditEvent(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const auditEvent = await model.auditEvents.updateData(args.id, args.resource);
			resolve(auditEvent)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeAuditEvent
 * @static
 * @summary Remove AuditEvent resolver.
 */
module.exports.removeAuditEvent = function removeAuditEvent(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const auditEvent = await model.auditEvents.removeData(args.id);
			resolve(auditEvent)
		} catch (e) {
			reject(e);
		}
	});
};
