const { Schema, model } = require("mongoose");
const User = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	token: String,
	profile: Object
},
{
	versionKey: false,
	timestamps: true
});
module.exports = model("User", User);