const { Conflict, BadRequest, NotFound } = require("http-errors");
const { QuickLinksModel } = require("../dbMongo/models/quickLinksModel");

const get = async (req, res) => {
    const {userId} = req.body;
    const links = await QuickLinksModel.find({userId});
    res.json({ links });
};

const create = async ( req, res ) => {
    const { userId, linkName, link } = req.body;

    const newLinkName = await QuickLinksModel.findOne({ userId, linkName });
    if (newLinkName) throw Conflict("link name already exist");

    const newLink = await QuickLinksModel.create({ userId, linkName, link });
    res.json({
        message: "A new link created successfully",
        newLink
    });
};

const remove = async ( req, res ) => {
    const { id } = req.params;
    const { userId } = req.body;

    const quickLink = await QuickLinksModel.findOneAndDelete( {_id: id, userId } );
    if (!result) throw NotFound (`A link with id:${id} not found`);

    res.json({
        message: "Quick Link removed successfully",
        quickLink
    });
};

const update = async ( req, res ) => {
    const { userId, id, linkName, link } = req.body;
    if (!linkName && !link) throw httpErrors(400, "no fields to update");

    const newVacancy = await QuickLinksModel.findOneAndUpdate({_id: id, userId }, { linkName, link }, { new: true });
    res.json({
        message: "Quick Link updated",
        newQuickLink
    });
};

module.exports = { get, create, remove, update };