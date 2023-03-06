const Joi = require("joi");
const { Schema, model } = require("mongoose");

const quickLinksSchema = new Schema({
    userId: { type: String, required: true },
    linkName: {type: String, required: [true, "link name is required"] },
    link: {type: String}
}, {
    versionKey: false,
    timestamps: true
});

const joiCreateQuickLink = Joi.object({
    linkName: Joi.string().required(),
    link: Joi.string()
});

const joiUpdateQuickLink = Joi.object({
    id: Joi.string().required(),
    linkName: Joi.string(),
    link: Joi.string()
});


const QuickLinksModel = model("quickLinks", quickLinksSchema);

module.exports = { QuickLinksModel, joiUpdateQuickLink, joiCreateQuickLink };