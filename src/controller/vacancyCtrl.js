const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const { BadRequest, NotFound } = require("http-errors");

const get = async (req, res) => {
    const result = await VacancyModel.find({userId: req.body.userId, ...req.query});
    res.json({
        qtty: result.length,
        result
    });
};

const create = async (req, res) => {
    const { userId, companyName, companyURL, source, sourceURL, position, salary, status = "new", rank = 1 } = req.body;
    const result = await VacancyModel.create({ userId, companyName, companyURL, source, sourceURL, position, salary, status, rank });
    res.json({
        message: "Vacancy created",
        result
    });
};
const remove = async (req, res) => {
    const { id } = req.params;

    const result = await VacancyModel.findOneAndDelete( { _id: id, userId: req.body.userId } );
    if (!result) throw NotFound (`A vacancy with id:${id} not found`);
    res.json({
        message: "Vacancy removed",
        result
    });
};

const update = async (req, res) => {
    const { userId, id, companyName, companyURL, source, sourceURL, position, salary, status, rank } = req.body;
    if (!companyName && !companyURL && !source && !sourceURL && !position && !salary && !status && !rank) throw httpErrors(400, "no fields to update");

    const newVacancy = await VacancyModel.findOneAndUpdate({ _id: id, userId }, { companyName, companyURL, source, sourceURL, position, salary, status, rank }, { new: true });
    if (!newVacancy) throw NotFound (`A vacancy with id:${id} not found`);
    res.json({
        message: "Vacancy updated",
        newVacancy
    });
};
module.exports = { get, create, remove, update };