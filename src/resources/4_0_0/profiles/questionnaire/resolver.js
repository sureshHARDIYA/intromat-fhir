const service = require('../../../../services/valueset');

/**
 * @name exports.getQuestionnaire
 * @static
 * @summary Questionnaire resolver.
 */
module.exports.getQuestionnaire = function getQuestionnaire(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.questionnaires.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getQuestionnaireList
 * @static
 * @summary Questionnaire list resolver.
 */
module.exports.getQuestionnaireList = function getQuestionnaireList(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.questionnaires.getAll(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.getQuestionnaireInstance
 * @static
 * @summary Questionnaire instance resolver.
 */
module.exports.getQuestionnaireInstance = function getQuestionnaireInstance(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			resolve(await model.questionnaires.getOne(args));
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.createQuestionnaire
 * @static
 * @summary Create Questionnaire resolver.
 */
module.exports.createQuestionnaire = function createQuestionnaire(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const resource = await service.findOrCreate(args.resource, model);
			const questionnaire = await model.questionnaires.createData(resource);
			resolve(questionnaire)
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * @name exports.updateQuestionnaire
 * @static
 * @summary Update Questionnaire resolver.
 */
module.exports.updateQuestionnaire = function updateQuestionnaire(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const resource = service.findOrCreate(args.resource, model);
			const questionnaire = await model.questionnaires.updateData(args.id, resource);
			resolve(questionnaire)
		} catch(e) {
			reject(e);
		}
	});
};

/**
 * @name exports.removeQuestionnaire
 * @static
 * @summary Remove Questionnaire resolver.
 */
module.exports.removeQuestionnaire = function removeQuestionnaire(
	root,
	args,
	context = {},
	info,
) {
	return new Promise(async (resolve, reject) => {
		try {
			const { server: { model }, version, req, res } = context;
			const questionnaire = await model.questionnaires.removeData(args.id);
			resolve(questionnaire)
		} catch (e) {
			reject(e);
		}
	});
};
