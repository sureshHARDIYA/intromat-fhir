const identifier = require('./types/identifier');
const humanName = require('./types/humanName');
const contactPoint = require('./types/contactPoint');
const gender = require('./types/gender');
const address = require('./types/address');
const attachment = require('./types/attachment');
const domainResource = require('./types/domainResource');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Person'],
			},
			identifier: [identifier('Person')],
			name: [humanName],
			telecom: [contactPoint],
			gender,
			birthDate: Date,
			address: [address],
			photo: attachment,
			managingOrganization: {
				type: mongoose.Schema.ObjectId,
				ref: 'Organization',
			},
			active: Boolean,
			link: [
				{
					targetPatient: {
						type: mongoose.Schema.ObjectId,
						ref: 'Patient',
					},
					targetPractitioner: {
						type: mongoose.Schema.ObjectId,
						ref: 'Practitioner',
					},
					targetRelatedPerson: {
						type: mongoose.Schema.ObjectId,
						ref: 'RelatedPerson',
					},
					targetPerson: {
						type: mongoose.Schema.ObjectId,
						ref: 'Person',
					},
				},
				{
					assuranceCode: String,
				}
			]
		})
	);

	const permitFields = [
		'identifier',
		'name',
		'telecom',
		'gender',
		'birthDate',
		'address',
		'photo',
		'managingOrganization',
		'active',
		'link'
	];

	Schema.set('toJSON', { virtuals: true });

	Schema.statics.getAll = function(args) {
		return new Promise( async (resolve, reject) => {
				try {
					const { limit = 100, page = 1 } = args || {};
					const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
					const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
					const total = await this.count();
					query.skip = query.limit * currentPage;

					const people = await this.find(
						{},
						{},
						{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
					);

					resolve({
						total,
						pageSize: limit,
						page: currentPage + 1,
						totalPage: Math.ceil(total / limit),
						entry: people.map(resource => ({ resource })),
					});
				} catch (e){
					reject(e);
				}
			});
	};

	Schema.statics.getOne = function(params = {}){
		return new Promise( async (resolve, reject) => {
				try {
					const person = await this.find(params || {});

					if (!person){
						throw new Error('Person not found');
					}

					resolve(person);
				} catch (e){
					reject(e);
				}
			}
		);};

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
				permitParams.resourceType = 'Person';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function(_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const person = await this.findOne({ _id });

				if (!person) {
					throw new Error('Person not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (person[key] = value),
				);
				person.resourceType = 'Person';
				await person.save();

				resolve(person);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function(_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const person = await this.findOne({ _id });

				if (!person) {
					throw new Error('Person not found');
				}

				await person.remove();
				resolve(person);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Person', Schema);
};
