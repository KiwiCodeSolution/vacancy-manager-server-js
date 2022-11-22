const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
  date: {type: Date},
  companyName: { type: String },
  CompanyURL: {type: String},
  sourse: {type: String},
  sourseURL: {type: String},
  position: {type: String},
  salary: {type: Number},
  status: {type: String},
  rank: {type: Number}
});

const VacancyModel = ("Vacancy", VacancySchema);
module.exports = VacancyModel;
