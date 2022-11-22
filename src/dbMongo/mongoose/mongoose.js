const mongoose = require("mongoose");
// const config = require('../../config/mongoConfig.json');
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  // .connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`)
  .then(() => {
    console.log("mongodb run");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
module.exports = mongoose;
