const faker = require('faker');
const moment = require('moment');

// https://www.hl7.org/fhir/questionnaire-example.json.html

module.exports = async (model, number = 10) => {
  const questionnaires = [];

  for (let i = 0; i < number; i++) {
    console.log('INSERTING QUESTIONANNAIRE: ', i + 1);

    // http://hl7.org/fhir/ValueSet/yesnodontknow
    const answerValueSet = await model.valuesets.createData({
      resourceType: 'ValueSet',
      title: ['v2', faker.lorem.words()].join(' '),
      version: '2.9',
      name: ['v2.0136', faker.lorem.words()].join(' '),
      description: faker.lorem.sentence(),
      url: 'http://terminology.hl7.org/ValueSet/v2-0136',
      status: ['draft', 'active', 'retired', 'unknown'][faker.random.number() % 4],
    });

    questionnaires.push(model.questionnaires.createData({
      resourceType: 'Questionnaire',
      text: {
        status: ['generated', 'extensions', 'additional', 'empty'][faker.random.number() % 4],
        div: faker.lorem.paragraphs(),
      },
      url: 'http://hl7.org/fhir/Questionnaire/3141',
      title: faker.lorem.sentence(),
      status: ['draft', 'active', 'retired', 'unknown'][faker.random.number() % 4],
      subjectType: [
        'Patient'
      ],
      purpose: faker.lorem.word(),
      date: moment(faker.date.past()).format('YYYY-MM-DD'),
      item: [...Array(faker.random.number() % 2 + 1).keys()].map(() => ({
        linkId: faker.random.number(),
        code: [
          {
            'system': 'http://example.org/system/code/sections',
            'code': 'COMORBIDITY'
          }
        ],
        type: ['group', 'display', 'question', 'boolean', 'decimal', 'integer', 'date', 'dateTime', 'time', 'string', 'text', 'url', 'choice', 'open-choice', 'attachment', 'reference', 'quantity'][faker.random.number() % 10],
        answerValueSet: answerValueSet.id,
      })),
      publisher: faker.name.findName(),
    }));
  }

  return Promise.all(questionnaires);
};
