const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
  name: { type: String },
});

const VacancyModel = ("Vacancy", VacancySchema);
module.exports = VacancyModel;
