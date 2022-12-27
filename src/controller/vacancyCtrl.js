const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const { NotFound } = require("http-errors");

const get = async (req, res) => {
    const data = await VacancyModel.find({userId: req.user._id, ...req.query});
    res.json({ data });
};

const create = async (req, res) => {
    const { companyName, companyURL, source, sourceURL, position = "", salary, notes = "", status = "new", rank = 1 } = req.body;
    const data = await VacancyModel.create({ userId: req.user._id, companyName, companyURL, source, sourceURL, position, salary, notes, status, rank });
    res.json({
        message: "Vacancy created",
        data
    });
};
const remove = async (req, res) => {
    const { id } = req.params;

    const data = await VacancyModel.findOneAndDelete( { _id: id, userId: req.user._id } );
    if (!data) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Vacancy removed",
        data
    });
};

const update = async (req, res) => {
    const { id, companyName, companyURL, source, sourceURL, position, salary, notes, status, rank } = req.body;
    if (!companyName && !companyURL && !source && !sourceURL && !position && !salary && !notes && !status && !rank) throw httpErrors(400, "no fields to update");

    const data = await VacancyModel.findOneAndUpdate({ _id: id, userId: req.user._id }, { companyName, companyURL, source, sourceURL, position, salary, status, rank }, { new: true });
    if (!data) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Vacancy updated",
        data
    });
};
module.exports = { get, create, remove, update };