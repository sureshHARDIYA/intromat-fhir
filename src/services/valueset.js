const axios = require('axios');

module.exports.findOrCreate = async (params, model) => {
  const resource = Object.assign(params, {});

  if (resource && resource.item) {
    for (let i = 0; i < resource.item.length; i++) {
      const current = resource.item[i];

      try {
        if (current.answerValueSet && current.answerValueSet.match(/^http/)) {
          const valueset = await model.valuesets.findOne({ url: current.answerValueSet });

          if (valueset) {
            resource.item[i].answerValueSet = valueset._id;
          } else {
            const { data } = await axios.get(current.answerValueSet);
            const valuesetContent = await model.valuesets.createData(data);
            resource.item[i].answerValueSet = valuesetContent._id;
          }
        }
      } catch (e) {
        console.log('pull data error:', e);
        resource.item[i].answerValueSet = null;
      }
    }
  }

  return Promise.resolve(resource);
};
