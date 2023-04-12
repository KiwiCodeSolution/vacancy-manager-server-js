const UserModel = require("../dbMongo/models/UserModel");

const clearVerificationCode = async (id) => {
  console.log("clear verify code from user id:", id);
  UserModel.findByIdAndUpdate( id, { verificationCode: "" });
};
module.exports = clearVerificationCode;
