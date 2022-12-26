const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const { NotFound } = require("http-errors");

const get = async (req, res) => {
    const vacancies = await VacancyModel.find({userId: req.body.userId, ...req.query});
    res.json({
        qtty: result.length,
        vacancies
    });
};

const create = async (req, res) => {
    const { userId, companyName, companyURL, source, sourceURL, position = "", salary, notes = "", status = "new", rank = 1 } = req.body;
    const vacancy = await VacancyModel.create({ userId, companyName, companyURL, source, sourceURL, position, salary, notes, status, rank });
    res.json({
        message: "Vacancy created",
        vacancy
    });
};
const remove = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const vacancy = await VacancyModel.findOneAndDelete( { _id: id, userId } );
    if (!result) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Vacancy removed",
        vacancy
    });
};

const update = async (req, res) => {
    const { userId, id, companyName, companyURL, source, sourceURL, position, salary, notes, status, rank } = req.body;
    if (!companyName && !companyURL && !source && !sourceURL && !position && !salary && !notes && !status && !rank) throw httpErrors(400, "no fields to update");

    const newVacancy = await VacancyModel.findOneAndUpdate({ _id: id, userId }, { companyName, companyURL, source, sourceURL, position, salary, status, rank }, { new: true });
    if (!newVacancy) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Vacancy updated",
        newVacancy
    });
};
module.exports = { get, create, remove, update };