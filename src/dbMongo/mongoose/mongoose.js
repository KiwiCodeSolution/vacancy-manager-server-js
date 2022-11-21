const mongoose = require('mongoose');
const config = require('../../config/mongoConfig.json');

mongoose
  .connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`)
  .then(() => {
    console.log('mongodb run');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
module.exports = mongoose;
