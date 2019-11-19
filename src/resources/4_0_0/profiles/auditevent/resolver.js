/**
 * @name exports.getAuditEvent
 * @static
 * @summary AuditEvent resolver.
 */
module.exports.getAuditEvent = async function (_, args, context ={}) {
	return await context.server.model.auditEvents.getOne(args);
};

/**
 * @name exports.getAuditEventList
 * @static
 * @summary AuditEvent list resolver.
 */
module.exports.getAuditEventList = async function (_, args, context={}) {
	return await context.server.model.auditEvents.getAll(args);
};

/**
 * @name exports.getAuditEventInstance
 * @static
 * @summary AuditEvent instance resolver.
 */
module.exports.getAuditEventInstance = async function (_, args, context ={}) {
	return await context.server.model.auditEvents.getOne(args);
};

/**
 * @name exports.createAuditEvent
 * @static
 * @summary Create AuditEvent resolver.
 */
module.exports.createAuditEvent = async function (_, args, context = {}) {
	return await context.server.model.auditEvents.createData(args.resource)
};

/**
 * @name exports.updateAuditEvent
 * @static
 * @summary Update AuditEvent resolver.
 */
module.exports.updateAuditEvent = async function (_, args, context = {}) {
	return await context.server.model.auditEvents.updateData(args.id, args.resource)
};

/**
 * @name exports.removeAuditEvent
 * @static
 * @summary Remove AuditEvent resolver.
 */
module.exports.removeAuditEvent = async function (_, args, context = {}) {
	return await context.server.model.auditEvents.removeData(args.id)
};
