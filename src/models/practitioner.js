const gender = require('./types/gender');
const address = require('./types/address');
const identifier = require('./types/identifier');
const humanName = require('./types/humanName');
const attachment = require('./types/attachment');
const contactPoint = require('./types/contactPoint');
const domainResource = require('./types/domainResource');
const codeableConcept = require('./types/codeableConcept');
const period = require('./types/period');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Practitioner']
			},
			identifier: [identifier('Practitioner')],
			active: Boolean,
			name: [humanName],
			telecom: [contactPoint],
			address: [address],
			gender,
			birthDate: Date,
			photo: [attachment],
			communication: [codeableConcept],
			qualification: [
				{
					identifier: [identifier('Organization')], // should this be Organization? No documentations that specifies
					code: codeableConcept,
					period: period,
					issuer: {
						ref: 'Organization',
						type: 'ObjectId' //mongoose.Schema.ObjectId
					}

				}
			]
		}),
		{
			timestamps: true
		}
	);

	const permitFields = [
		'identifier',
		'active',
		'name',
		'telecom',
		'address',
		'gender',
		'birthDate',
		'photo',
		'qualification',
		'communication',
		'organization'
	];

	Schema.statics.getAll = async function (args) {
		try {
			const {limit = 100, page = 1} = args || {};
			const query = {limit: Math.abs(parseInt(limit, 10) || 100)};
			const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
			const total = await this.countDocuments();
			query.skip = query.limit * currentPage;
			const practitioners = await this.find(
				{},
				{},
				{sort: {createdAt: 'desc'}, limit: query.limit, skip: query.skip},
			);
			return ({
				total,
				pageSize: limit,
				page: currentPage + 1,
				totalPage: Math.ceil(total / limit),
				entry: practitioners.map(resource => ({resource})),
			});
		} catch (e) {
			console.log('Practitioner error', e);
		}
	};

	Schema.statics.getOne = async function (params = {}) {
		try {
			const practitioner = await this.findOne(params || {});

			if (!practitioner) {
				throw new Error('Patient not found');
			}

			return (practitioner);
		} catch (e) {
			console.log('Practitioner error', e);
		}
	};

	Schema.statics.createData = async function (params = {}) {
		try {
			const permitParams = permitFields.reduce(
				(obj, key) =>
					[undefined, null].includes(params[key])
						? obj
						: Object.assign(obj, {[key]: params[key]}),
				{},
			);
			permitParams.resourceType = 'Practitioner';
			return (await this.create(permitParams));
		} catch (e) {
			console.log('Practitioner error', e);
		}
	};

	Schema.statics.updateData = async function (_id, params = {}) {
		try {
			const practitioner = await this.findOne({_id});

			if (!practitioner) {
				throw new Error('Practitioner not found');
			}

			Object.entries(params || {}).forEach(
				([key, value]) => (practitioner[key] = value),
			);
			practitioner.resourceType = 'Practitioner';
			await practitioner.save();

			return (practitioner);
		} catch (e) {
			console.log('Practitioner error', e);
		}
	};

	Schema.statics.removeData = async function (_id) {
		try {
			const practitioner = await this.findOne({_id});

			if (!practitioner) {
				throw new Error('Practitioner not found');
			}

			await practitioner.remove();
			return (practitioner);
		} catch (e) {
			console.log('Practitioner error', e);
		}
	};

	return mongoose.model('Practitioner', Schema);
};

