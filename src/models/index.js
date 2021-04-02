const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const uristring =
	process.env.MONGODB_URI || 'mongodb://localhost/intromat-fhir';

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(
	uristring,
	err =>
		console.log(
			err
				? `ERROR connecting to: ${uristring}. ${err}`
				: `Succeeded connected to: ${uristring}`,
		),
);

const db = {};

fs.readdirSync(__dirname)
	.filter(
		file =>
			file.indexOf('.') !== 0 &&
			file !== 'index.js' &&
			file !== 'migrations' &&
			file !== 'types' &&
			file !== 'seeds.js',
	)
	.forEach(file => {
		const model = require(path.join(__dirname, file))(mongoose);
		db[model.collection.collectionName] = model;
	});

module.exports = db;
