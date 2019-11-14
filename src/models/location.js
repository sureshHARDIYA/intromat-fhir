const address = require('./types/address');
const identifier = require('./types/identifier');
const contactPoint = require('./types/contactPoint');
const codeableConcept = require('./types/codeableConcept');
const domainResource = require('./types/domainResource');
const daysOfWeek = require('./types/daysOfWeek');
const coding = require('./types/coding');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Location'],
			},
			identifier: [identifier('Location')],
				status: {
					type: String,
					enum: ['draft', 'active', 'retired', 'unknown'],
				},
			operationalStatus: coding,
			name: String,
			alias: [String],
			description: String,
			mode: {
				type: String,
				enum: ['instance', 'kind'],
			},
			type: [codeableConcept],
			telecom: [contactPoint],
			address: address,
			physicalType: codeableConcept,
			position: {
				longitude: mongoose.Decimal128,
				latitude: mongoose.Decimal128,
				altitude: mongoose.Decimal128,
			},
			managingOrganization:{
				type: mongoose.Schema.ObjectId,
				ref: 'Organization',
			},
			partOf:{
				type: mongoose.Schema.ObjectId,
				ref: 'Location',
			},
			hoursOfOperation: [
				{
					daysOfWeek:[daysOfWeek],
					allday: Boolean,
					openingTime: String,
					closingTime: String,
				},
			],
			availabilityExceptions: String,
			endpoint: [{
				type: mongoose.Schema.ObjectId,
				ref: 'Endpoint',
			}],
			}),
			{
				timestamps:true,
			}

	);

	const permitFields = [
		'identifier',
		'status',
		'operationalStatus',
		'name',
		'alias',
		'description',
		'mode',
		'type',
		'telecom',
		'address',
		'physicalType',
		'position',
		'managingOrganization',
		'partOf',
		'hoursOfOperation',
		'availabilityExceptions',
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
				const location = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				);
				resolve({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: location.map(resource => ({ resource })),
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.getOne = function(params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const location = await this.findOne(params || {});

				if (!location) {
					throw new Error('Location not found');
				}

				resolve(location);
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
				permitParams.resourceType = 'Location';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function(_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const location = await this.findOne({ _id });

				if (!location) {
					throw new Error('Location not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (location[key] = value),
				);
				location.resourceType = 'Location';
				await location.save();

				resolve(location);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function(_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const location = await this.findOne({ _id });

				if (!location) {
					throw new Error('Location not found');
				}

				await location.remove();
				resolve(location);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Location', Schema);

};
