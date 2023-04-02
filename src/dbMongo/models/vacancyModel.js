const { Schema, model } = require("mongoose");
const Joi = require("joi");

const VacancySchema = new Schema(
  {
    userId: { type: String, required: true },
    companyName: { type: String, required: true },
    companyURL: String,
    source: String,
    sourceURL: String,
    position: String,
    salary: Number,
    currency: String,
    stage: String,
    actions: [Object],
    notes: [Object],
    userRank: Number,
    archived: Boolean,
    cardColor: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiCreateVacancy = Joi.object({
  companyName: Joi.string().min(3).max(30).required(),
  companyURL: Joi.string().allow(""), // validate for URL ?
  source: Joi.string().allow("").max(20),
  sourceURL: Joi.string(),
  position: Joi.string().allow("").max(30),
  salary: Joi.number().min(0).max(999999),
  currency: Joi.string().min(0).max(5),
  stage: Joi.string().allow("").max(20),
  actions: Joi.array(),
  notes: Joi.array()
    .items({ date: Joi.number(), text: Joi.string().max(500) })
    .max(20),
  userRank: Joi.number().min(1).max(5),
  archived: Joi.boolean(),
  cardColor: Joi.string().allow(""),
});

const joiUpdateVacancy = Joi.object({
  _id: Joi.string().required(),
  companyName: Joi.string().min(3).max(30),
  companyURL: Joi.string().allow(""), // validate for URL ?
  source: Joi.string().allow("").max(20),
  sourceURL: Joi.string().allow(""),
  position: Joi.string().allow("").max(30),
  salary: Joi.number().min(0).max(999999),
  currency: Joi.string().min(0).max(5),
  stage: Joi.string().allow("").max(20),
  actions: Joi.array().items({
    date: Joi.number(),
    name: Joi.string().max(20),
    deadline: Joi.number(),
    fulfilled: Joi.boolean(),
  }),
  notes: Joi.array()
    .items({ date: Joi.number(), text: Joi.string().max(500) })
    .max(20),
  userRank: Joi.number().min(1).max(5),
  archived: Joi.boolean(),
  cardColor: Joi.string().allow(""),
});

const VacancyModel = model("Vacancies", VacancySchema);
module.exports = { VacancyModel, joiCreateVacancy, joiUpdateVacancy };
