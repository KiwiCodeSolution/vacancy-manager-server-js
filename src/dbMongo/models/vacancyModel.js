const { Schema, model } = require("mongoose");
const Joi = require("joi");

const VacancySchema = new Schema({
  userId: { type: String, required: true },
  companyName: { type: String, required: true },
  companyURL: String,
  source: String,
  sourceURL: String,
  position: String,
  salary: Number,
  currency: String,
  status: String,
  actions: [Object],
  notes: [Object],
  userRank: Number,
  archived: Boolean
}, {
  versionKey: false,
  timestamps: true
});

const joiCreateVacancy = Joi.object({
  companyName: Joi.string().min(3).max(30).required(),
  companyURL: Joi.string(), // validate for URL ?
  source: Joi.string().min(3).max(20),
  sourceURL: Joi.string(),
  position: Joi.string().min(3).max(30),
  salary: Joi.number().min(0).max(999999),
  currency: Joi.string().max(5),
  status: Joi.string().max(20),
  actions: Joi.array().items({date: Joi.number(), name: Joi.string().max(20), deadline: Joi.number()}),
  notes: Joi.array().items({date: Joi.number(), text: Joi.string().max(500)}).max(20),
  userRank: Joi.number().min(1).max(5),
  archived: Joi.boolean(),
});

const joiUpdateVacancy = Joi.object({
  id: Joi.string().required(),
  companyName: Joi.string().min(3).max(30),
  companyURL: Joi.string(), // validate for URL ?
  source: Joi.string().min(3).max(20),
  sourceURL: Joi.string(),
  position: Joi.string().min(3).max(30),
  salary: Joi.number().min(0).max(999999),
  currency: Joi.string().max(5),
  status: Joi.string().max(20),
  actions: Joi.array().items({date: Joi.number(), name: Joi.string().max(20), deadline: Joi.number()}),
  notes: Joi.array().items({date: Joi.number(), text: Joi.string().max(500)}).max(20),
  userRank: Joi.number().min(1).max(5),
  archived: Joi.boolean(),
});

const VacancyModel = model("Vacancies", VacancySchema);
module.exports = { VacancyModel, joiCreateVacancy, joiUpdateVacancy };
