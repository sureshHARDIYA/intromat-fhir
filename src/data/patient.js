const faker = require('faker');
const moment = require('moment');

module.exports = (model, number = 10) => {
  const patients = [];

  for (let i = 0; i < number; i++) {
    console.log('INSERTING PATIENT: ', i + 1);

    patients.push(model.patients.createData({
      resourceType: 'Patient',
      text: {
        status: ['generated', 'extensions', 'additional', 'empty'][faker.random.number() % 4],
        div: faker.lorem.paragraphs(),
      },
      identifier: [{
        use: ['usual', 'official', 'temp', 'secondary', 'old'][faker.random.number() % 5],
        type: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'SSN',
          }],
          text: faker.lorem.sentence(),
        },
        system: 'http://hl7.org/fhir/sid/us-ssn',
        value: faker.finance.account(),
        period: {
          start: moment(faker.date.past()).format('YYYY-MM-DD'),
        },
        assigner: {
          display: faker.fake('{{name.lastName}} {{name.firstName}} {{name.suffix}}')
        }
      }],
      active: faker.random.boolean(),
      name: [...Array(faker.random.number() % 2 + 1).keys()].map(() => ({
        use: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'][faker.random.number() % 7],
        text: faker.fake('{{name.lastName}} {{name.firstName}} {{name.suffix}}'),
        family: faker.fake('{{name.lastName}}'),
        prefix: [faker.fake('{{name.prefix}}')],
        suffix: [faker.fake('{{name.suffix}}')],
      })),
      telecom: [...Array(faker.random.number() % 2 + 1).keys()].map(() => ({
        value: faker.phone.phoneNumberFormat(),
        rank: faker.random.number() % 100 + 1,
        use: ['home', 'work', 'temp', 'old', 'mobile'][faker.random.number() % 7],
        system: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'][faker.random.number() % 7],
        period: {
          start: moment(faker.date.past()).format('YYYY-MM-DD'),
        },
      })),
      gender: ['male', 'female', 'other', 'unknown'][faker.random.number() % 4],
      birthDate: moment(faker.date.past()).add(-10, 'years').format('YYYY-MM-DD'),
      address: [...Array(faker.random.number() % 2 + 1).keys()].map(() => ({
        use: ['home', 'work', 'temp', 'old', 'billing'][faker.random.number() % 5],
        type: ['postal', 'physical', 'both'][faker.random.number() % 5],
        text: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        line: [faker.address.streetName()],
        postalCode: faker.address.zipCode(),
      })),
      maritalStatus: ['A', ' D', 'I', 'L', 'M', 'P', 'S', 'T', 'U', 'W'][faker.random.number() % 10],
      photo: [...Array(faker.random.number() % 2 + 1).keys()].map(() => ({
        data: faker.image.dataUri(),
        title: faker.lorem.sentence(),
        creation: moment(faker.date.past()).format('YYYY-MM-DD')
      })),
      contact: {
        name: {
          use: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'][faker.random.number() % 7],
          text: faker.fake('{{name.lastName}} {{name.firstName}} {{name.suffix}}'),
          family: faker.fake('{{name.lastName}}'),
          prefix: [faker.fake('{{name.prefix}}')],
          suffix: [faker.fake('{{name.suffix}}')],
        },
        telecom: [...Array(faker.random.number() % 2 + 1).keys()].map(() => ({
          value: faker.phone.phoneNumberFormat(),
          rank: faker.random.number() % 100 + 1,
          use: ['home', 'work', 'temp', 'old', 'mobile'][faker.random.number() % 7],
          system: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'][faker.random.number() % 7],
          period: {
            start: moment(faker.date.past()).format('YYYY-MM-DD'),
          },
        })),
        address: {
          use: ['home', 'work', 'temp', 'old', 'billing'][faker.random.number() % 5],
          type: ['postal', 'physical', 'both'][faker.random.number() % 5],
          text: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          line: [faker.address.streetName()],
          postalCode: faker.address.zipCode(),
        },
        gender: ['male', 'female', 'other', 'unknown'][faker.random.number() % 4],
        period: {
          end: moment(faker.date.past()).format('YYYY-MM-DD'),
          start: moment(faker.date.past()).format('YYYY-MM-DD'),
        },
        communication: [...Array(faker.random.number() % 3 + 1).keys()].map(() => ({
          language: faker.random.locale(),
          preferred: faker.random.boolean(),
        }))
      },
    }));
  }

  return Promise.all(patients);
};
