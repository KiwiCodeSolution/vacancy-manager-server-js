const UserModel = require("../dbMongo/models/UserModel");

const clearVerificationCode = async (id) => {
  await UserModel.findOneAndUpdate({ _id: id }, { verificationCode: "" });
};
module.exports = clearVerificationCode;
