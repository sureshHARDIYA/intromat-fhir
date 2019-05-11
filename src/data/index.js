const fs = require('fs');
const path = require('path');
const faker = require('faker');

require('../environment.js');

const model = require('../models');

// console.log('model:', model);
// console.log(faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
// console.log('faker -> date:', moment(faker.date.past()));

Promise.all(
    fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && !['index.js'].includes(file))
    .map(file => require(path.join(__dirname, file))(model, 100))
  )
  .then(async () => {
    console.log('UPDATING LINK PATIENT -> ORGANIZTION');

    try {
      const patientIds = await model.patients.find({}, ['id']);
      const organizationIds = await model.organizations.find({}, ['id']);
      const length = organizationIds.length;

      for (let i = 0; i < patientIds.length; i++) {
        await patientIds[i].updateOne({
          managingOrganization: organizationIds[faker.random.number() % length],
          organizations: [...Array(faker.random.number() % 2 + 1).keys()].map(() => organizationIds[faker.random.number() % length]),
        });
      }

      return Promise.resolve(true);
    } catch (e) {
      console.log('ERROR:', e);
      return Promise.reject(true);
    }
  })
  .then(() => process.exit(0))
  .catch(() => process.exit(0));
