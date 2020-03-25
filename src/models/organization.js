const address = require('./types/address');
const humanName = require('./types/humanName');
const identifier = require('./types/identifier');
const contactPoint = require('./types/contactPoint');
const codeableConcept = require('./types/codeableConcept');
const domainResource = require('./types/domainResource');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Organization'],
			},
			identifier: [identifier('Organization')],
			active: Boolean,
			type: codeableConcept,
			name: String,
			alias: [String],
			telecom: [contactPoint],
			address: [address],
			contact: [
				{
					purpose: codeableConcept,
					name: humanName,
					address: address,
					telecom: contactPoint,
				},
			],
			partOf: {
				type: 'ObjectId',
				ref: 'Organization',
			},
			endpoint: {
				type: 'ObjectId',
				ref: 'Endpoint',
			},
		}),
		{
			timestamps: true,
		},
	);

	const permitFields = [
		'identifier',
		'active',
		'type',
		'name',
		'alias',
		'telecom',
		'address',
		'contact',
		'partOf',
		'endpoint',
	];

	Schema.statics.getAll = function(args) {
		return new Promise(async (resolve, reject) => {
			try {
				const { limit = 100, page = 1 } = args || {};
				const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.countDocuments();
				query.skip = query.limit * currentPage;
				const organizations = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				);
				resolve({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: organizations.map(resource => ({ resource })),
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.getOne = function(params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const organization = await this.findOne(params || {});

				if (!organization) {
					throw new Error('Organization not found');
				}

				resolve(organization);
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
				permitParams.resourceType = 'Organization';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function(_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const organization = await this.findOne({ _id });

				if (!organization) {
					throw new Error('Organization not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (organization[key] = value),
				);
				organization.resourceType = 'Organization';
				await organization.save();

				resolve(organization);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function(_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const organization = await this.findOne({ _id });

				if (!organization) {
					throw new Error('Organization not found');
				}

				await organization.remove();
				resolve(organization);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Organization', Schema);
};
