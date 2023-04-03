const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const { BadRequest, NotFound } = require("http-errors");

const get = async (req, res) => {
  const data = await VacancyModel.find({ userId: req.user._id, ...req.query });
  res.json({ data });
};

const create = async (req, res) => {
  const {
    companyName,
    companyURL,
    source,
    sourceURL,
    position = "",
    salary,
    currency = "USD",
    notes,
    stage = "new",
    userRank = 1,
    cardColor = "grey",
  } = req.body;
  const data = await VacancyModel.create({
    userId: req.user._id,
    companyName,
    companyURL,
    source,
    sourceURL,
    position,
    salary,
    currency,
    notes,
    stage,
    userRank,
    cardColor,
    archived: false,
  });

  res.json({
    message: "A new vacancy created successfully",
    data,
  });
};

const update = async (req, res) => {
  const {
    _id,
    companyName,
    companyURL,
    source,
    sourceURL,
    position,
    salary,
    currency,
    status,
    actions,
    notes,
    userRank,
    cardColor,
    archived,
  } = req.body;
  if (
    !companyName &&
    !companyURL &&
    !source &&
    !sourceURL &&
    !position &&
    !salary &&
    !currency &&
    !status &&
    !actions &&
    !notes &&
    !userRank &&
    !cardColor &&
    !(archived === true || archived === false)
  )
    throw BadRequest("no fields to update");

  const data = await VacancyModel.findOneAndUpdate(
    { _id, userId: req.user._id },
    {
      companyName,
      companyURL,
      source,
      sourceURL,
      position,
      salary,
      currency,
      status,
      actions,
      notes,
      userRank,
      cardColor,
      archived,
    },
    { new: true }
  );
  if (!data) throw NotFound(`A vacancy with id:${_id} not found`);

  res.json({
    message: "Vacancy updated successfully",
    data,
  });
};

const remove = async (req, res) => {
  const { id } = req.params;

  const data = await VacancyModel.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });
  if (!data) throw NotFound(`A vacancy with id:${id} not found`);

  res.json({
    message: "Vacancy removed successfully",
    data,
  });
};

module.exports = { get, create, remove, update };
