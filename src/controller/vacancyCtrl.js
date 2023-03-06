const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const { BadRequest, NotFound } = require("http-errors");

const get = async (req, res) => {
    const data = await VacancyModel.find({userId: req.user._id, ...req.query});
    res.json({ data });
};

const create = async (req, res) => {
    const { companyName, companyURL, source, sourceURL, position = "", salary, currency = "USD", notes, status = "new", userRank = 1 } = req.body;
    const data = await VacancyModel.create({ userId: req.user._id, companyName, companyURL, source, sourceURL, position, salary, currency, notes, status, userRank, archived: false });

    res.json({
        message: "Vacancy created",
        data
    });
};
const remove = async (req, res) => {
    const { id } = req.params;

    const data = await VacancyModel.findOneAndUpdate({ _id: id, userId: req.user._id }, {archived: true});
    if (!data) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Vacancy removed to archive",
        data
    });
};

const update = async (req, res) => {
    const { id, companyName, companyURL, source, sourceURL, position, salary, status, actions, notes, userRank } = req.body;
    if (!companyName && !companyURL && !source && !sourceURL && !position && !salary && !status && !actions && !notes && !userRank) throw BadRequest("no fields to update");

    const data = await VacancyModel.findOneAndUpdate({ _id: id, userId: req.user._id }, { companyName, companyURL, source, sourceURL, position, salary, status, actions, notes, userRank }, { new: true });
    if (!data) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Vacancy updated",
        data
    });
};
module.exports = { get, create, remove, update };