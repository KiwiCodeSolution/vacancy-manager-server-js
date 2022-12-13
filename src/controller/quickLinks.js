const httpErrors = require("http-errors");
const { QuickLinksModel } = require("../dbMongo/models/quickLinksModel");

const get = async (_, res) => {
    const links = await QuickLinksModel.find();
    res.json({ links });
};

const create = async ( req, res ) => {
    const { linkName, link } = req.body;

    const newLinkName = await QuickLinksModel.findOne({ linkName });
    if (newLinkName) throw httpErrors(409, "link name already exist");

    const newLink = await QuickLinksModel.create({ linkName, link });
    res.json({
        message: "A new link created successfully",
        newLink
    });
};

const remove = async ( req, res ) => {
    const { id } = req.params;
    if (!id) throw httpErrors (400, "id in params is required");

    const result = await QuickLinksModel.findByIdAndDelete( id );
    if (!result) throw httpErrors (404, `A link with id:${id} not found`);

    res.json({
        message: "Vacancy removed successfully",
    });
};

const update = async ( req, res ) => {

    const { id, linkName, link } = req.body;
    if (!linkName && !link) throw httpErrors(400, "no fields to update");

    const newVacancy = await QuickLinksModel.findByIdAndUpdate(id, { linkName, link }, { new: true });
    res.json({
        message: "Vacancy updated",
        newVacancy
    });
};

module.exports = { get, create, remove, update };