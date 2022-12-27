const { Conflict, BadRequest, NotFound } = require("http-errors");
const { QuickLinksModel } = require("../dbMongo/models/quickLinksModel");

const get = async (req, res) => {
    const data = await QuickLinksModel.find({userId: req.user._id});
    res.json({ data });
};

const create = async ( req, res ) => {
    const { linkName, link } = req.body;

    const newLinkName = await QuickLinksModel.findOne({ userId: req.user._id, linkName });
    if (newLinkName) throw Conflict("link name already exist");

    const data = await QuickLinksModel.create({ userId, linkName, link });
    res.json({
        message: "A new link created successfully",
        data
    });
};

const remove = async ( req, res ) => {
    const { id } = req.params;

    const data = await QuickLinksModel.findOneAndDelete( {_id: id, userId: req.user._id } );
    if (!data) throw NotFound (`A link with id:${id} not found`);

    res.json({
        message: "Quick Link removed successfully",
        data
    });
};

const update = async ( req, res ) => {
    const { id, linkName, link } = req.body;
    if (!linkName && !link) throw httpErrors(400, "no fields to update");

    const data = await QuickLinksModel.findOneAndUpdate({_id: id, userId: req.user._id }, { linkName, link }, { new: true });
    if (!data) throw NotFound (`A vacancy with id:${id} not found`);

    res.json({
        message: "Quick Link updated",
        data
    });
};

module.exports = { get, create, remove, update };