const fs = require('fs');
const path = require('path');
require('../environment.js');

const model = require('../models');

// console.log('model:', model);
// console.log(faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
// console.log('faker -> date:', moment(faker.date.past()));

Promise.all(
    fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .map(file => require(path.join(__dirname, file))(model, 100))
  )
  .then(() => process.exit(0))
  .catch(() => process.exit(0));
