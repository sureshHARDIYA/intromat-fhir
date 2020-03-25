const gender = require('./types/gender');
const contact = require('./types/contact');
const address = require('./types/address');
const humanName = require('./types/humanName');
const identifier = require('./types/identifier');
const attachment = require('./types/attachment');
const maritalStatus = require('./types/maritalStatus');
const contactPoint = require('./types/contactPoint');
const domainResource = require('./types/domainResource');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Patient'],
			},
			identifier: [identifier('Patient')],
			active: Boolean,
			name: [humanName],
			telecom: contactPoint,
			gender,
			birthDate: Date,
			deceased: {
				deceasedBoolean: Boolean,
				deceasedDateTime: Date,
			},
			maritalStatus,
			address: [address],
			multipleBirth: {
				multipleBirthBoolean: Boolean,
				multipleBirthInteger: Number,
			},
			contact,
			photo: attachment,
			communication: [
				{
					preferred: Boolean,
					communication: String,
				},
			],
			organizations: [
				{
					ref: 'Organization',
					type: mongoose.Schema.ObjectId,
				},
			],
			practitioners: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Practitioner',
				},
			],
			practitionerRoles: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'PractitionerRole',
				},
			],
			link: [
				{
					type: String,
					otherPatient: {
						type: mongoose.Schema.ObjectId,
						ref: 'Patient',
					},
					otherRelatedPerson: {
						type: mongoose.Schema.ObjectId,
						ref: 'RelatedPerson',
					},
				},
			],
			managingOrganization: {
				type: mongoose.Schema.ObjectId,
				ref: 'Organization',
			},
		}),
		{
			timestamps: true,
			toJSON: { getters: true, virtuals: true },
			toObject: { getters: true, virtuals: true }
		},
	);

	const permitFields = [
		'identifier',
		'active',
		'name',
		'telecom',
		'gender',
		'birthDate',
		'deceased',
		'address',
		'contact',
		'photo',
		'link',
		'maritalStatus',
		'multipleBirth',
		'communication',
		'organizations',
		'practitioners',
		'practitionerRoles',
		'generalPractitioner',
		'managingOrganization',
	];

	Schema.set('toJSON', { virtuals: true });

	Schema.virtual('generalPractitioner').get(function() {
		return Object.assign(
			[],
			this.organizations,
			this.practitioners,
			this.practitionerRoles,
		);
	});

	Schema.statics.getAll = function(args) {
		return new Promise(async (resolve, reject) => {
			try {
				const { limit = 100, page = 1 } = args || {};
				const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.count();
				query.skip = query.limit * currentPage;
				const patients = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				)
					.populate('organizations')
					.populate('managingOrganization');

				resolve({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: patients.map(resource => ({ resource })),
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.getOne = function(params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const patient = await this.findOne(params || {});

				if (!patient) {
					throw new Error('Patient not found');
				}

				resolve(patient);
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
				permitParams.resourceType = 'Patient';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function(_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const patient = await this.findOne({ _id });

				if (!patient) {
					throw new Error('Patient not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (patient[key] = value),
				);
				patient.resourceType = 'Patient';
				await patient.save();

				resolve(patient);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function(_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const patient = await this.findOne({ _id });

				if (!patient) {
					throw new Error('Patient not found');
				}

				await patient.remove();
				resolve(patient);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Patient', Schema);
};
