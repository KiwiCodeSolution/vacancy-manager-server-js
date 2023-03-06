const { Schema, model } = require("mongoose");
const User = new Schema({
	password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	emailConfirmed: Boolean,
	token: String,
	profile: Object
},
{
	versionKey: false,
	timestamps: true
});
module.exports = model("User", User);