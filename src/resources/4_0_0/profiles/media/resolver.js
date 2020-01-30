/**
 * @name exports.getMedia
 * @static
 * @summary Media resolver.
 */
module.exports.getMedia = async function getMedia(root, args, context = {}) {
		const { server: { model }, } = context;
		return await model.media.getOne(args);
};

/**
 * @name exports.getMediaList
 * @static
 * @summary Media list resolver.
 */
module.exports.getMediaList = async function getMediaList(root, args, context = {}) {
		const { server: { model },} = context;
		return await model.media.getAll(args);
};

/**
 * @name exports.getMediaInstance
 * @static
 * @summary Media instance resolver.
 */
module.exports.getMediaInstance = async function getMediaInstance(root, args, context = {}) {
			const { server:  { model },} = context;
			return await model.media.getOne(args);
};

/**
 * @name exports.createMedia
 * @static
 * @summary Create Media resolver.
 */
module.exports.createMedia = async function createMedia(root, args, context = {}) {
			const { server: { model }, } = context;
			return await model.media.createData(args.resource);
};

/**
 * @name exports.updateMedia
 * @static
 * @summary Update Media resolver.
 */
module.exports.updateMedia = async function updateMedia(root, args, context = {}) {
		const { server: { model }, } = context;
		return await model.media.updateData(args.id, args.resource);
};

/**
 * @name exports.removeMedia
 * @static
 * @summary Remove Media resolver.
 */
module.exports.removeMedia = async function removeMedia(root, args, context = {}) {
			const { server: { model }, } = context;
			return await model.media.removeData(args.id);
};
