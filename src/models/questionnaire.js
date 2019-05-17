const identifier = require('./types/identifier');
const contactDetail = require('./types/contactDetail');
const codeableConcept = require('./types/codeableConcept');
const period = require('./types/period');
const coding = require('./types/coding');
const questionnaireItem = require('./types/questionnaireItem');
const domainResource = require('./types/domainResource');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Questionnaire'],
			},
			url: String,
			identifier: [identifier('Questionnaire')],
			version: String,
			name: String,
			title: String,
			derivedFrom: [
				{
					type: 'ObjectId',
					ref: 'Questionnaire',
				},
			],
			status: {
				type: String,
				enum: ['draft', 'active', 'retired', 'unknown'],
			},
			experimental: Boolean,
			subjectType: [codeableConcept],
			date: Date,
			publisher: String,
			contact: [contactDetail],
			description: String,
			jurisdiction: [codeableConcept],
			purpose: String,
			copyright: String,
			approvalDate: Date,
			lastReviewDate: Date,
			effectivePeriod: [period],
			code: [coding],
			item: [questionnaireItem],
		}),
		{
			timestamps: true,
		},
	);

	const permitFields = [
		'resourceType',
		'url',
		'identifier',
		'version',
		'title',
		'name',
		'derivedFrom',
		'status',
		'experimental',
		'subjectType',
		'date',
		'publisher',
		'contact',
		'description',
		'purpose',
		'copyright',
		'approvalDate',
		'lastReviewDate',
		'effectivePeriod',
		'code',
		'item',
		'meta',
		'language',
		'implicitRules',
		'text',
		'contained',
	];

	Schema.statics.getAll = function(args) {
		return new Promise(async (resolve, reject) => {
			try {
				const { limit = 100, page = 1 } = args || {};
				const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.countDocuments();
				query.skip = query.limit * currentPage;
				const questionnaires = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				);
				resolve({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: questionnaires.map(resource => ({ resource })),
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.getOne = function(params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const questionnaire = await this.findOne(params || {});

				if (!questionnaire) {
					throw new Error('Questionnaire not found');
				}

				resolve(questionnaire);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.createData = function(params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const permitParams = permitFields.reduce(
					(obj, key) =>
						[undefined, null].includes(params[key])
							? obj
							: Object.assign(obj, { [key]: params[key] }),
					{},
				);
				permitParams.resourceType = 'Questionnaire';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function(_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const questionnaire = await this.findOne({ _id });

				if (!questionnaire) {
					throw new Error('Questionnaire not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (questionnaire[key] = value),
				);

				questionnaire.resourceType = 'Questionnaire';
				await questionnaire.save();

				resolve(questionnaire);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function(_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const questionnaire = await this.findOne({ _id });

				if (!questionnaire) {
					throw new Error('Questionnaire not found');
				}

				await questionnaire.remove();
				resolve(questionnaire);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Questionnaire', Schema);
};
