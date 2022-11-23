const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyURL: {type: String},
  sourse: {type: String},
  sourseURL: {type: String},
  position: {type: String},
  salary: {type: Number},
  status: {type: String},
  rank: {type: Number}
}, {
  versionKey: false,
  timestamps: true
});

const VacancyModel = ("Vacancy", VacancySchema);
module.exports = VacancyModel;
