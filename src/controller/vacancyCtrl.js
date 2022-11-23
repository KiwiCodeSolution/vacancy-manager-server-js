const VacancyModel = require('../dbMongo/models/vacancyModel');

const get = async ( req, res ) => {
    const result = await VacancyModel.find(req.query);
    res.json({
        message: `${req.query}`,
        result
    })
}

const create = async ( req, res ) => {
    const {companyName, companyURL, source, sourceURL, position, salary, status = "new", rank = 1} = req.body;
    const result = await VacancyModel.create({ companyName, companyURL, source, sourceURL, position, salary, status, rank });
    res.json({
        message: `Vacancy created`,
        result
    })
}
const remove = async (req, res ) => {
    console.log(req.body);
    res.json({
        message: `Vacancy removed`,
    })
}

const update = async (req, res) => {
    console.log(req.body);
    res.json({
        message: `Vacancy updated`,
    })
}
module.exports = {get, create, remove, update};