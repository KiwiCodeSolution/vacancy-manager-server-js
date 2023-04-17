const { Schema, model } = require("mongoose");
const User = new Schema({
	email: { type: String, unique: true, required: true },
	password: String,
	passwordGoogle: String,
	emailConfirmed: Boolean,
	token: String,
	verificationCode: String,
	profile: Object,
	profileGoogle: Object,
	settings: Object
},
{
	versionKey: false,
	timestamps: true
});
module.exports = model("User", User);